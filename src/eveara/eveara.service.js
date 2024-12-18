import axios from "axios";

class EvearaService {
    async getAccessToken() {
        const client_id = "D0B9DDBBD64022FB08DB50D46C95D727";
        const client_secret = "Ej9NZP9ci+Q+38TyNxGicOQp4aN46QgxhlyBZ7Bj6+BtqSCrJOZrcR+qxFg0nHEXLSA=";
        const { data } = await axios.post("https://staging.eveara.com/api/v2.0/oauth/gettoken", {
            grant_type: "client_credentials",
            client_id: client_id,
            client_secret: client_secret,
        });
        return data;
    }
}

export default new EvearaService();
