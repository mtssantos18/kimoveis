import { Router } from "express";
import {
  createCategoryController,
  listCategoriesController,
  listPropertiesFromCategoryController,
} from "../controllers/categories.controller";
import { authorizationCheckMiddleware } from "../middleware/authorizationCheck.middleware";
import { verifyIsAdmMiddleware } from "../middleware/verifyIsAdm.middleware";

const categoriesRoutes = Router();

categoriesRoutes.post(
  "",
  authorizationCheckMiddleware,
  verifyIsAdmMiddleware,
  createCategoryController
);
categoriesRoutes.get("", listCategoriesController);
categoriesRoutes.get("/:id/properties", listPropertiesFromCategoryController);

export default categoriesRoutes;
