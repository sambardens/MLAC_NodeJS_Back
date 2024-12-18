import MailingService from "./mailing.service.js";

class MailingController {
  async subscribe(req, res) {
    try {
      const { userId, bapId } = req.body;
      const account = await MailingService.subscribe(userId, bapId);

      return res.json(account);
    } catch (e) {
      return e;
    }
  }

  async getMailingList(req, res) {
    try {
      const { bapId } = req.params;
      const mailingList = await MailingService.getMailingList(bapId);

      return res.json(mailingList);
    } catch (e) {
      return e;
    }
  }

  async getUserSubscribes(req, res) {
    try {
      const { userId } = req.params;
      const bapIds = await MailingService.getUserSubscribes(userId);

      return res.json({ bapIds });
    } catch (e) {
      return e;
    }
  }

  async deleteUsersFromMailList(req, res) {
    try {
      const { userIds, bapId } = req.body;
      const message = await MailingService.deleteUsersFromMailList(
        userIds,
        bapId
      );

      return res.json({ message });
    } catch (e) {
      return e;
    }
  }
}

export default new MailingController();
