// Import the Movies Data Access Object (DAO)
// This layer is responsible for talking directly to the database
import MoviesDAO from "../dao/moviesDAO.js";

// Controller class that handles HTTP requests related to movies
export default class MoviesController {

  // GET /api/v1/movies
  // Fetches a list of movies with optional filters and pagination
  static async apiGetMovies(req, res) {

    // Number of movies per page (default: 20)
    const moviesPerPage = parseInt(req.query.moviesPerPage) || 20;

    // Current page number (default: page 0)
    const page = parseInt(req.query.page) || 0;

    // Object to hold query filters
    let filters = {};

    // Filter movies by rating if provided in the query string
    if (req.query.rated) {
      filters.rated = req.query.rated;

    // Otherwise, filter movies by title if provided
    } else if (req.query.title) {
      filters.title = req.query.title;
    }

    // Call the DAO to retrieve movies from the database
    // Returns both the movie list and total number of matching movies
    const { moviesList, totalNumMovies } =
      await MoviesDAO.getMovies({
        filters,
        page,
        moviesPerPage,
      });

    // Send the response back to the client in JSON format
    res.json({
      movies: moviesList,
      page,
      filters,
      entries_per_page: moviesPerPage,
      total_results: totalNumMovies,
    });
  }

  // GET /api/v1/movies/ratings
  // Returns a list of all available movie ratings
  static async apiGetRatings(req, res) {

    // Fetch distinct ratings from the database
    const ratings = await MoviesDAO.getRatings();

    // Return ratings as JSON
    res.json(ratings);
  }

  // GET /api/v1/movies/:id
  // Fetch a single movie using its unique ID
  static async apiGetMovieById(req, res) {
    try {
      // Retrieve the movie by ID from the database
      const movie = await MoviesDAO.getMovieById(req.params.id);

      // If the movie does not exist, return a 404 error
      if (!movie) {
        res.status(404).json({ error: "Not found" });
        return;
      }

      // If movie exists, return it
      res.json(movie);

    } catch (e) {
      // Handle unexpected server or database errors
      res.status(500).json({ error: e.message });
    }
  }
}
