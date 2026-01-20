import app from "./server.js";
import mongodb from "mongodb";
import dotenv from "dotenv";
import MoviesDAO from "./dao/moviesDAO.js";
import ReviewsDAO from './dao/reviewsDAO.js'

dotenv.config();

const MongoClient = mongodb.MongoClient;
const port = process.env.PORT || 8000;

async function main() {
    try {
        const client = new MongoClient(process.env.MOVIEREVIEWS_DB_URI);
        await client.connect();
        await MoviesDAO.injectDB(client);
        await ReviewsDAO.injectDB(client);

        app.listen(port, () => {
            console.log(`Server running on http://localhost:${port}`);
        });

    } catch (e) {
        console.error(e);
        process.exit(1);
    }
}

main();

