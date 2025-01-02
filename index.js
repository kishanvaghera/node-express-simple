import express from "express";
import cors from "cors";
import postRoute from "./routes/post.route.js";
import errorHandler from "./middleware/errorHandler.js";
import notFound from "./middleware/notFound.js";
import { rateLimit } from 'express-rate-limit'
import helmet from "helmet";
import compression from "compression";

const app = express();

//@middleware use
const limiter = rateLimit({
    windowMs: 1 * 60 * 1000,
    limit: 100,
    standardHeaders: 'draft-8',
    legacyHeaders: false,
})

app.use(cors({
    origin: "*"
}))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(limiter);
app.use(helmet());
app.use(compression())

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

