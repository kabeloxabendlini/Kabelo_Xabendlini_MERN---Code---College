// Import ObjectId from MongoDB to work with document IDs
import { ObjectId } from "mongodb";

// This variable will hold the movies collection reference
let movies;

// Data Access Object (DAO) for the movies collection
// Responsible ONLY for database interactions
export default class MoviesDAO {

  // Injects the database connection once when the server starts
  static async injectDB(conn) {

    // Prevent re-initializing the collection if it already exists
    if (movies) return;

    try {
      // Select the database and collection using environment variables
      movies = await conn
        .db(process.env.MOVIEREVIEWS_NS)
        .collection("movies");

    } catch (e) {
      // Log connection errors
      console.error(`unable to connect in MoviesDAO: ${e}`);
    }
  }

  // Retrieves a list of movies with optional filters and pagination
  static async getMovies({
    filters = null,
    page = 0,
    moviesPerPage = 20,
  } = {}) {

    // MongoDB query object
    let query = {};

    // Apply search filters if provided
    if (filters) {
      // Text search by movie title
      if ("title" in filters) {
        query = { $text: { $search: filters.title } };

      // Filter movies by rating
      } else if ("rated" in filters) {
        query = { rated: { $eq: filters.rated } };
      }
    }

    try {
      // Create a cursor for paginated results
      const cursor = movies
        .find(query)
        .limit(moviesPerPage)
        .skip(moviesPerPage * page);

      // Convert cursor results into an array
      const moviesList = await cursor.toArray();

      // Get total number of matching movies (for pagination)
      const totalNumMovies = await movies.countDocuments(query);

      return { moviesList, totalNumMovies };

    } catch (e) {
      // Handle database query errors
      console.error(`Unable to issue find command: ${e}`);
      return { moviesList: [], totalNumMovies: 0 };
    }
  }

  // Returns a list of all distinct movie ratings
  static async getRatings() {
    try {
      // Retrieve unique values from the "rated" field
      return await movies.distinct("rated");

    } catch (e) {
      // Handle errors when fetching ratings
      console.error(`unable to get ratings: ${e}`);
      return [];
    }
  }

  // Retrieves a single movie by ID along with its associated reviews
  static async getMovieById(id) {
    try {
      return await movies
        .aggregate([
          // Match the movie document by its ObjectId
          {
            $match: {
              _id: new ObjectId(id),
            },
          },
          // Join the reviews collection with the movies collection
          {
            $lookup: {
              from: "reviews",            // Collection to join
              localField: "_id",           // Movies collection field
              foreignField: "movie_id",    // Reviews collection field
              as: "reviews",               // Output array field
            },
          },
        ])
        .next(); // Retrieve the first matching document

    } catch (e) {
      // Handle errors during aggregation
      console.error(`something went wrong in getMovieById: ${e}`);
      throw e;
    }
  }
}
