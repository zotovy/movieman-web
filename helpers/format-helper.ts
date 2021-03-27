export default class FormatHelper {

    static getRatingColor(rating: number): string {
        if (rating === 0) return "#6B6F8C";
        if (rating < 4) return "#EE4C31";
        if (rating < 7) return "#F4942F";
        return "#66D35A";
    }

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
}
