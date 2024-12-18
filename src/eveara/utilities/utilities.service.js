import axios from "axios";
import evearaService from "../eveara.service.js";

class UtilitiesService {
    async getGenres() {
        const accessData = await evearaService.getAccessToken();
        try {
            const { data } = await axios.get("https://staging.eveara.com/api/v2.0/genres", {
                headers: {
                    Authorization: accessData.token_type + " " + accessData.access_token,
                },
            });

            return data;
        } catch (err) {
            return err.response.data;
        }
    }

    async getLanguages() {
        const accessData = await evearaService.getAccessToken();
        try {
            const { data } = await axios.get("https://staging.eveara.com/api/v2.0/languages", {
                headers: {
                    Authorization: accessData.token_type + " " + accessData.access_token,
                },
            });

            return data;
        } catch (err) {
            return err.response.data;
        }
    }

    async getAvailabilities() {
        const accessData = await evearaService.getAccessToken();
        try {
            const { data } = await axios.get("https://staging.eveara.com/api/v2.0/availabilities", {
                headers: {
                    Authorization: accessData.token_type + " " + accessData.access_token,
                },
            });

            return data;
        } catch (err) {
            return err.response.data;
        }
    }

    async getCountries() {
        const accessData = await evearaService.getAccessToken();
        try {
            const { data } = await axios.get("https://staging.eveara.com/api/v2.0/countries", {
                headers: {
                    Authorization: accessData.token_type + " " + accessData.access_token,
                },
            });

            return data;
        } catch (err) {
            return err.response.data;
        }
    }

    async getRoles() {
        const accessData = await evearaService.getAccessToken();
        try {
            const { data } = await axios.get("https://staging.eveara.com/api/v2.0/roles", {
                headers: {
                    Authorization: accessData.token_type + " " + accessData.access_token,
                },
            });

            return data;
        } catch (err) {
            return err.response.data;
        }
    }
}

export default new UtilitiesService();
