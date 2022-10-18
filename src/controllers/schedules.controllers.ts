import { Request, Response } from "express";
import listSchedulesFromOnePropertyService from "../services/schedules/listSchedulesFromOneProperty.service";
import scheduleNewAppointmentService from "../services/schedules/scheduleNewAppointment.service";

export const scheduleNewAppointmentController = async (
  req: Request,
  res: Response
) => {
  const userId = req.user.id;

  const { date, hour, propertyId } = req.body;

  const newSchedule = await scheduleNewAppointmentService({
    date,
    hour,
    propertyId,
    userId,
  });

  return res.status(201).json({
    message: "New Appointment scheduled",
    newSchedule,
  });
};

export const listSchedulesFromOnePropertyController = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;

  const propertySchedules = await listSchedulesFromOnePropertyService(id);

  return res.status(200).json({ schedules: propertySchedules });
};
