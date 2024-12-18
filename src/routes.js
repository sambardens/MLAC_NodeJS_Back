import { Router } from "express";
import authRouter from "./auth/auth.router.js";
import bapsRouter from "./baps/baps.router.js";
import usersRouter from "./users/users.router.js";
import mailsRouter from "./mails/mails.router.js";
import brandsRouter from "./brands/brands.router.js";
import spotifyRouter from "./spotify/spotify.router.js";
import socialsRouter from "./socials/socials.router.js";
import releaseRouter from "./release/release.router.js";
import tracksRouter from "./tracks/tracks.router.js";
import featureArtistsRouter from "./feature-artists/feature-artists.router.js";
import notificationsRouter from "./notifications/notifications.router.js";
import splitsRouter from "./splits/splits.router.js";
import creditsRouter from "./credits/credits.router.js";
import genresRouter from "./genres/genres.router.js";
import contractsRouter from "./contracts/contracts.router.js";
import landingRouter from "./landing/landing.router.js";
import shopsRouter from "./shops/shops.router.js";
import customersRouter from "./customers/customers.router.js";
import incomesRouter from "./incomes/incomes.router.js";
import withdrawalsRouter from "./withdrawals/withdrawals.router.js";
import evearaRouter from "./eveara/eveara.router.js";
import analyticsRouter from "./analytics/analytics.router.js";
import mailingRouter from "./mailing/mailing.router.js";

const routes = Router();

routes.use("/analytics", analyticsRouter);
routes.use("/auth", authRouter);
routes.use("/baps", bapsRouter);
routes.use("/users", usersRouter);
routes.use("/mails", mailsRouter);
routes.use("/brands", brandsRouter);
routes.use("/spotify", spotifyRouter);
routes.use("/socials", socialsRouter);
routes.use("/release", releaseRouter);
routes.use("/tracks", tracksRouter);
routes.use("/artists", featureArtistsRouter);
routes.use("/notifications", notificationsRouter);
routes.use("/splits", splitsRouter);
routes.use("/credits", creditsRouter);
routes.use("/genres", genresRouter);
routes.use("/contracts", contractsRouter);
routes.use("/landing", landingRouter);
routes.use("/shops", shopsRouter);
routes.use("/customers", customersRouter);
routes.use("/incomes", incomesRouter);
routes.use("/withdrawals", withdrawalsRouter);
routes.use("/eveara", evearaRouter);
routes.use("/mailing", mailingRouter);

export default routes;

/**
 * @api {get} /:name Get Image
 * @apiName Get Image
 * @apiGroup API Image
 * @apiParam {string} name `name with type of image -> .jpg`
 */
