import ReviewsDAO from "../dao/reviewsDAO.js";

export default class ReviewsController {
  static async apiPostReview(req, res) {
    try {
      const { movie_id, review, name, user_id } = req.body;

      const userInfo = {
        name,
        _id: user_id,
      };

      const date = new Date();

      await ReviewsDAO.addReview(movie_id, userInfo, review, date);

      res.json({ status: "success" });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  static async apiUpdateReview(req, res) {
    try {
      const { review_id, user_id, review } = req.body;
      const date = new Date();

      const response = await ReviewsDAO.updateReview(
        review_id,
        user_id,
        review,
        date
      );

      if (response.error) {
        return res.status(400).json(response);
      }

      if (response.modifiedCount === 0) {
        throw new Error(
          "Unable to update review. User may not be original poster."
        );
      }

      res.json({ status: "success" });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  static async apiDeleteReview(req, res) {
    try {
      const { review_id, user_id } = req.body;

      await ReviewsDAO.deleteReview(review_id, user_id);

      res.json({ status: "success" });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }
}
// Example axios calls for testing purposes:
// axios.post("https://localhost:5000/api/v1/movies/review", data)
// axios.delete("https://localhost:5000/api/v1/movies/review", { data: data })  
        // axios.put("https://localhost:5000/api/v1/movies/review", data)