import { Router } from "express";
import {
  createUserController,
  listUsersController,
  softDeleteUserController,
} from "../controllers/users.controllers";
import { authorizationCheckMiddleware } from "../middleware/authorizationCheck.middleware";
import { verifyIsAdmMiddleware } from "../middleware/verifyIsAdm.middleware";

const usersRoutes = Router();

usersRoutes.post("", createUserController);
usersRoutes.get(
  "",
  authorizationCheckMiddleware,
  verifyIsAdmMiddleware,
  listUsersController
);
usersRoutes.delete(
  "/:id",
  authorizationCheckMiddleware,
  verifyIsAdmMiddleware,
  softDeleteUserController
);

export default usersRoutes;
