import { Router } from "express";
import {
  listSchedulesFromOnePropertyController,
  scheduleNewAppointmentController,
} from "../controllers/schedules.controllers";
import { authorizationCheckMiddleware } from "../middleware/authorizationCheck.middleware";
import { verifyIsAdmMiddleware } from "../middleware/verifyIsAdm.middleware";

const schedulesRoutes = Router();

schedulesRoutes.post(
  "",
  authorizationCheckMiddleware,
  scheduleNewAppointmentController
);
schedulesRoutes.get(
  "/properties/:id",
  authorizationCheckMiddleware,
  verifyIsAdmMiddleware,
  listSchedulesFromOnePropertyController
);

export default schedulesRoutes;
