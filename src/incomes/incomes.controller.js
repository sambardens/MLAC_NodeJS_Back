import incomesService from "./incomes.service.js";

class IncomesController {

    async getIncomes(req, res, next) {
        try {
            const {user} = req
            const {bapId, releaseId} = req.query
            const incomes = await incomesService.getIncomes({bapId, releaseId, userId: user.id})
            return res.json({success: true, ...incomes})
        } catch (e) {
            next(e)
        }
    }

    async getIncomeById(req, res, next) {
        try {
            const {incomeId} = req.params
            const {user} = req
            const income = await incomesService.getIncomesByIdCheckUser(incomeId, user)
            return res.json({success: true, income})
        } catch (e) {
            next(e)
        }
    }

    async uniqueFields(req, res, next) {
        try {
            const income = await incomesService.uniqueFields()
            return res.json({success: true, income})
        } catch (e) {
            next(e)
        }
    }

    async getTransactions(req, res, next) {
        try {
            const {orderBy, sortOrder, date, buyer, releaseType, performer, mainGenre, subGenres} = req.query
            const income = await incomesService.getTransactions({date, buyer, releaseType, performersTwoInclude: performer, mainGenre, subGenres}, orderBy, sortOrder)
            return res.json({success: true, income})
        } catch (e) {
            next(e)
        }
    }

    async getTransactionById(req, res, next) {
        try {
            const {transactionId} = req.params
            const income = await incomesService.getIncomesById(transactionId)
            return res.json({success: true, income})
        } catch (e) {
            next(e)
        }
    }
}
export default new IncomesController()