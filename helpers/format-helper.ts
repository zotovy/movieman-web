export default class FormatHelper {

    static getNumEnding(num: number, ending: [string, string, string]): string {
        const last2 = num % 100;
        if (last2 >= 11 && last2 <= 19) return ending[2];

        const last = num % 10;
        switch (last) {
            case (1):
                return ending[0];
            case (2):
            case (3):
            case (4):
                return ending[1];
            default:
                return ending[2]
        }
    }

    static limitText = (text: string, limit: number): string => {
        if (text.length > limit) return text.substr(0, limit) + "...";
        return text;
    }
}
