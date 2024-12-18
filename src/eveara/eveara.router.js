import { Router } from "express";
import labelsRouter from "./labels/labels.router.js";
import participantsRouter from "./participants/participants.router.js";
import artistsRouter from "./artists/artists.router.js";
import tracksRouter from "./eveara-tracks/eveara-tracks.router.js";
import albumsRouter from "./albums/albums.router.js";
import subscriptionsRouter from "./subscriptions/subscriptions.router.js";
import evearaUsersRouter from "./users/eveara-users.router.js";
import outletsRouter from "./outlets/outlets.router.js";
import reportsRouter from "./reports/reports.router.js";
import payoutRouter from "./payout/payout.router.js";
import simulateRouter from "./simulate/simulate.router.js";
import utilitiesRouter from "./utilities/utilities.router.js";

const evearaRouter = new Router();

evearaRouter.use("/users", evearaUsersRouter);
evearaRouter.use("/labels", labelsRouter);
evearaRouter.use("/participants", participantsRouter);
evearaRouter.use("/artists", artistsRouter);
evearaRouter.use("/tracks", tracksRouter);
evearaRouter.use("/albums", albumsRouter);
evearaRouter.use("/subscriptions", subscriptionsRouter);
evearaRouter.use("/outlets", outletsRouter);
evearaRouter.use("/reports", reportsRouter);
evearaRouter.use("/payout", payoutRouter);
evearaRouter.use("/simulate", simulateRouter);
evearaRouter.use("/utilities", utilitiesRouter);

export default evearaRouter;
