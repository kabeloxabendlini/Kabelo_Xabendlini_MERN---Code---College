import MoviesDAO from "../dao/moviesDAO.js";

export default class MoviesController {
  static async apiGetMovies(req, res) {
    const moviesPerPage = parseInt(req.query.moviesPerPage) || 20;
    const page = parseInt(req.query.page) || 0;

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
  }

  static async apiGetRatings(req, res) {
    const ratings = await MoviesDAO.getRatings();
    res.json(ratings);
  }

  static async apiGetMovieById(req, res) {
    try {
      const movie = await MoviesDAO.getMovieById(req.params.id);
      if (!movie) {
        res.status(404).json({ error: "Not found" });
        return;
      }
      res.json(movie);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }
}
