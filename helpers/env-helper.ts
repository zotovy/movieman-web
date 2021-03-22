export default class EnvHelper {

    static validateEnv(): void {
        const incorrect = [];

        if (!EnvHelper.serverUrl) incorrect.push("serverUrl");

        if (incorrect.length > 0) {
            throw `Env config is incorrect! Incorrect fields: ${incorrect.join(", ")}`;
        }
    }

    static serverUrl = process.env.SERVER_URL as string;

}
