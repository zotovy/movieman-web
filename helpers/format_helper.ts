export default class FormatHelper {

    static getRatingColor(rating: number): string {
        if (rating < 4) return "#EE4C31";
        if (rating < 7) return "#F4942F";
        return "#66D35A";
    }

}
