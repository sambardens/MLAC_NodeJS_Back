import {Router} from "express";
import customersShopRouter from "./shop/customers-shop.router.js";
import customersLandingRouter from "./landing/customers-landing.router.js";
import paymentRouter from "./payment/payment.router.js";
import ordersRouter from "./orders/orders.router.js";

const customersRouter = new Router()

customersRouter.use('/shops', customersShopRouter)
customersRouter.use('/landing/page', customersLandingRouter)
customersRouter.use('/payment', paymentRouter)
customersRouter.use('/orders', ordersRouter)

export default customersRouter