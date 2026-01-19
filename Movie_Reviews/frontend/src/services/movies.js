import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api/v1/movies",
});

class MovieDataService {
  getAll() {
    return api.get("/");
  }

  get(id) {
    return api.get(`/${id}`);
  }

  getRatings() {
    return api.get("/ratings");
  }

  find(query, by) {
    return api.get(`?${by}=${query}`);
  }

  createReview(data) {
    return api.post(`/${data.movie_id}/reviews`, data);
  }

  updateReview(data) {
    return api.put(`/${data.movie_id}/reviews`, data);
  }

  deleteReview(reviewId, userId) {
    return api.delete("/reviews", {
      data: { review_id: reviewId, user_id: userId },
    });
  }
}

// ✅ Name the instance
const movieDataService = new MovieDataService();

// ✅ Export the named instance
export default movieDataService;
