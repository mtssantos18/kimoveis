import { Router } from "express";
import {
  createPropertyController,
  listPropertiesController,
} from "../controllers/properties.controllers";
import { authorizationCheckMiddleware } from "../middleware/authorizationCheck.middleware";
import { verifyIsAdmMiddleware } from "../middleware/verifyIsAdm.middleware";

const propertiesRoutes = Router();

propertiesRoutes.post(
  "",
  authorizationCheckMiddleware,
  verifyIsAdmMiddleware,
  createPropertyController
);
propertiesRoutes.get("", listPropertiesController);

export default propertiesRoutes;
