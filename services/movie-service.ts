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

    static async fetchMovie(id: number | string): Promise<Movie> {
        const response = await client.get(ApiRoutes.getMovie(id));
        const data = response.data;
        if (data?.poster?.includes("w500")) {
            data.poster = data.poster.replace("w500", "original");
        }
        return data;
    }
}
