import express from "express";
import "express-async-errors";
import "reflect-metadata";
import { handleErrorMiddleware } from "./middleware/handleError.middleware";
import usersRoutes from "./routes/users.routes";
import sessionRoutes from "./routes/session.routes";
import categoriesRoutes from "./routes/categories.routes";
import propertiesRoutes from "./routes/properties.routes";
import schedulesRoutes from "./routes/schedules.routes";

const app = express();
app.use(express.json());

app.use("/users", usersRoutes);
app.use("/login", sessionRoutes);
app.use("/categories", categoriesRoutes);
app.use("/properties", propertiesRoutes);
app.use("/schedules", schedulesRoutes);

app.use(handleErrorMiddleware);

export default app;
