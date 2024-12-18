import cron from 'node-cron'
import {Op, QueryTypes} from 'sequelize';
import scheme from "../database/scheme.js";
import mailsService from "../src/mails/mails.service.js";
import {getThirtyDaysAgo} from "./global.variables.js";


const futureCreatorBap = cron.schedule('* * * * *', async () => {
    const futureCreators = await scheme.query(`
        SELECT *, future_creator_baps.id as id 
        FROM future_creator_baps
        LEFT JOIN apply_deletion_baps ON future_creator_baps.applyDeletionBapId = apply_deletion_baps.id
        WHERE future_creator_baps.createdAt < '${getThirtyDaysAgo()}' && isApproved = false
            && future_creator_baps.isTimeout = false
    `, {
        raw: true,
        type: QueryTypes.SELECT
    })

    for (const futureCreator of futureCreators) {
        await scheme.query(`
            UPDATE future_creator_baps SET isTimeout = true WHERE id = ${futureCreator.id}
        `)

        const emails = []
        const names = []

        const members = await scheme.query(
        `SELECT *, baps.name as bapName, baps.creatorId as creatorId
           FROM members_baps
           LEFT JOIN users ON users.id = members_baps.userId
           LEFT JOIN baps ON baps.id = members_baps.bapId
           WHERE bapId = ${futureCreator.bapId}`, {
            raw: true, type: QueryTypes.SELECT
        })

        for (const member of members) {
            emails.push(member.email)
            names.push(member.firstName)
        }
        const initNames = []
        for (const name of names) {
            initNames.push({'name': name})
        }
        await mailsService.sendSaveBap(emails, initNames, members[0].bapName, members[0].bapId, members[0].creatorId)
    }
});

futureCreatorBap.start()

export default futureCreatorBap