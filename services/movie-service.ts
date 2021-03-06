import client from "@/utils/api/client";
import ApiRoutes from "@/utils/api/routes";

export default class MovieService {

    static async fetchPopularMovies(): Promise<Movie[]> {
        const response = await client.get(ApiRoutes.getPopularMovies);
        return response.data.movies;
    }

    static async fetchMoviesByGenre(genre: string): Promise<Movie[]> {
        const response = await client.get(ApiRoutes.getMoviesByGenre(genre));
        return response.data.movies;
    }

    static async fetchMovie(id: number | string): Promise<Movie | null> {
        const response = await client.get(ApiRoutes.getMovie(id));
        const data = response.data;

        // return null if not found
        if (response.status === 404) {
            return null;
        }

        // Change profile image from 500px --> high quality image
        if (data?.poster?.includes("w500")) {
            data.poster = data.poster.replace("w500", "original");
        }

        return data;
    }

    static async writeReview(id: number | string, content: string, author: number, rating: number): Promise<void> {
        await client.post(ApiRoutes.writeReview(id), {
            movie: id,
            author,
            content,
            rating,
        });
    }

    static async fetchReview(id: number | string): Promise<Review | null> {
        const res = await client.get(ApiRoutes.getReview(id));
        return res.data ?? null;
    }

    static async searchMovie(q: string): Promise<Movie[]> {
        const res = await client.get(ApiRoutes.searchMovie(q));
        return res.data.movies ?? [];
    }
}
