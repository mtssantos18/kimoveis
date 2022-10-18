import { Router } from "express";
import { loginUserController } from "../controllers/session.controller";

const sessionRoutes = Router();

sessionRoutes.post("", loginUserController);

export default sessionRoutes;
