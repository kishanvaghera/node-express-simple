import express from "express";
import cors from "cors";
import postRoute from "./routes/post.route.js";
import errorHandler from "./middleware/errorHandler.js";
import notFound from "./middleware/notFound.js";

const app = express();

//@middleware use
app.use(cors({
    origin: "*"
}))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//@api routes
app.use("/", postRoute);

//@error handler
app.use(notFound);
app.use(errorHandler);

//@server start
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log("Nodejs Server Started.");
});

