import paymentService from "./payment.service.js";

class PaymentController {

    async payment(req, res, next) {
        try {
            const {purchaseLocationTypeId, purchaseLocationId} = req.query
            const {trackIds, paymentEmail, tips, invoiceId} = req.body
            const {user} = req
            console.log('payment:\n', user, paymentEmail, +purchaseLocationId, +purchaseLocationTypeId, trackIds, +tips, invoiceId)
            const payment = await paymentService.payment(
                user, paymentEmail, +purchaseLocationId, +purchaseLocationTypeId, trackIds, +tips, invoiceId
            )

            return res.json({success: true, payment})
        } catch(e) {
            next(e)
        }
    }
}

export default new PaymentController()