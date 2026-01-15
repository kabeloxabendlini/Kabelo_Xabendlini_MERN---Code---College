import MoviesDAO from "../dao/moviesDAO.js";

export default class MoviesController {

    static async apiGetMovies(req, res, next) {
        try {
            const moviesPerPage = req.query.moviesPerPage
                ? parseInt(req.query.moviesPerPage, 10)
                : 20;

            const page = req.query.page
                ? parseInt(req.query.page, 10)
                : 0;

            let filters = {};
            if (req.query.rated) {
                filters.rated = req.query.rated;
            } else if (req.query.title) {
                filters.title = req.query.title;
            }

            const { moviesList, totalNumMovies } =
                await MoviesDAO.getMovies({
                    filters,
                    page,
                    moviesPerPage,
                });

            res.json({
                movies: moviesList,
                page,
                filters,
                entries_per_page: moviesPerPage,
                total_results: totalNumMovies,
            });

        } catch (e) {
            console.error(`apiGetMovies error: ${e}`);
            res.status(500).json({ error: "Internal server error" });
        }
    }
}
