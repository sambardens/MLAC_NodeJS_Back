import withdrawService from "./withdrawals.service.js";

class WithdrawalsController {

    async createWithdraw(req, res, next) {
        try {
            const {user} = req
            const {amount} = req.body
            const withdraw = await withdrawService.createWithdraw(user.id, amount)
            return res.json({success: true, withdraw})
        } catch(e) {
            next(e)
        }
    }

    async getWithdrawals(req, res, next) {
        try {
            const {user} = req
            const withdraws = await withdrawService.getWithdrawals(user)
            return res.json({success: true, withdraws})
        } catch(e) {
            next(e)
        }
    }

    async getWithdraw(req, res, next) {
        try {
            const {user} = req
            const withdraw = await withdrawService.getWithdraw({userId: user.id})
            return res.json({success: true, withdraw})
        } catch(e) {
            next(e)
        }
    }

    async getAllWithdrawsAsAdmin(req, res, next) {
        try {

            const withdraws = await withdrawService.getAllWithdrawsAsAdmin()
            return res.json({success: true, withdraws})
        } catch(e) {
            next(e)
        }
    }

    async updateWithdrawal(req, res, next) {
        try {
            const {withdrawalId} = req.params
            const {isReviewed, isApproved} = req.body
            const withdraws = await withdrawService.updateWithdrawal({id: withdrawalId}, isReviewed, isApproved)
            return res.json({success: true, withdraws})
        } catch(e) {
            next(e)
        }
    }
}

export default new WithdrawalsController()