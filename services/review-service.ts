import client from "@/utils/api/client";
import ApiRoutes from "@/utils/api/routes";

export default class ReviewService {

    static async writeComment(reviewId: number, comment: ReviewComment): Promise<void> {
        await client.post(ApiRoutes.writeComment(reviewId), comment);
    }
}
