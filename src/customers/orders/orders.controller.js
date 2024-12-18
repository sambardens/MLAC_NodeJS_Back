import ordersService from "./orders.service.js";

class OrdersController {

    async getOrders(req, res, next) {
        try {
            const {user} = req
            const orders = await ordersService.getOrders(user.id)
            return res.json({success: true, orders})
        } catch(e) {
            next(e)
        }
    }
}

export default new OrdersController()