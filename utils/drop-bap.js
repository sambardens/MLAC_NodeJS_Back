import cron from "node-cron";
import bapsService from "../src/baps/baps.service.js";
import { Op, QueryTypes } from "sequelize";
import { getSixtyDaysAgo, getThirtyDaysAgo } from "./global.variables.js";
import tokensService from "../src/tokens/tokens.service.js";
import scheme from "../database/scheme.js";
import mailsService from "../src/mails/mails.service.js";

const dropBap = cron.schedule("* * * * *", async () => {
    const deletionBaps = await bapsService.getAllDeletionBaps({
        createdAt: {
            [Op.lt]: getThirtyDaysAgo() + "Z",
        },
        isRemove: false,
        bapId: {
            [Op.not]: null,
        },
    });

    for (const deletionBap of deletionBaps) {
        await bapsService.removeBap({ id: deletionBap.bapId }).then(async () => {
            deletionBap.isRemove = true;
            await deletionBap.save();
        });
    }
});

const createDeletionBap = cron.schedule("* * * * *", async () => {
    const applyDeletionBaps = await scheme.query(
        `
        SELECT *, apply_deletion_baps.id as id, apply_deletion_baps.isTimeout as isTimeout
        FROM apply_deletion_baps
        LEFT JOIN future_creator_baps ON future_creator_baps.applyDeletionBapId = apply_deletion_baps.id
        LEFT JOIN baps ON apply_deletion_baps.bapId = baps.id
        LEFT JOIN users ON baps.creatorId = users.id
        WHERE apply_deletion_baps.createdAt < '${getSixtyDaysAgo()}' && isNewUser = false 
            && apply_deletion_baps.isTimeout = false
    `,
        {
            raw: true,
            type: QueryTypes.SELECT,
        }
    );

    for (const applyDeletionBap of applyDeletionBaps) {
        await scheme.query(`
            UPDATE apply_deletion_baps SET isTimeout = true WHERE id = ${applyDeletionBap.id}
        `);

        const saveDataOfBapToken = tokensService.generateSaveDataOfBapToken({
            applyDeletionBapId: applyDeletionBap.applyDeletionBapId,
            bapId: applyDeletionBap.bapId,
            creatorId: applyDeletionBap.creatorId,
        });
        await bapsService
            .createDeletionBap({
                bapId: applyDeletionBap.bapId,
                saveDataOfBapToken,
                creatorId: applyDeletionBap.creatorId,
                applyDeletionBapId: applyDeletionBap.applyDeletionBapId,
            })
            .catch((e) => console.log(e));

        const recipient = mailsService.initRecipientData([applyDeletionBap.email], [{ name: applyDeletionBap.firstName }]);
        await mailsService.sendMail(4666978, recipient, { bapName: applyDeletionBap.name, saveDataOfBapToken });
    }
});

createDeletionBap.start();
dropBap.start();

export { dropBap, createDeletionBap };
