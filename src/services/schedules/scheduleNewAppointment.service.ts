import AppDataSource from "../../data-source";
import { Property } from "../../entities/properties.entity";
import { ScheduleUsersProperties } from "../../entities/schedules_users_properties.entity";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/AppError";
import { IScheduleRequest } from "../../interfaces/schedules";

const scheduleNewAppointmentService = async ({
  date,
  hour,
  propertyId,
  userId,
}: IScheduleRequest) => {
  const userRepository = AppDataSource.getRepository(User);

  const propertyRepository = AppDataSource.getRepository(Property);

  const scheduleRepository = AppDataSource.getRepository(
    ScheduleUsersProperties
  );

  const user = await userRepository.findOneByOrFail({ id: userId });

  const property = await propertyRepository.findOneBy({ id: propertyId });

  if (!property) {
    throw new AppError("Property not found", 404);
  }

  const checkSchedule = await scheduleRepository.find({
    where: { date, hour },
  });

  if (checkSchedule.length !== 0) {
    throw new AppError(
      "We already have an appointment for this time of the day you chose",
      400
    );
  }

  const checkDate = new Date(`${date} ${hour}`);

  if (checkDate.getDay() === 0 || checkDate.getDay() === 6) {
    throw new AppError("Must be a weekday", 400);
  }

  const minHour = new Date(`${date} 08:00`);

  const maxHour = new Date(`${date} 18:00`);

  if (checkDate < minHour || checkDate > maxHour) {
    throw new AppError(
      "We work during business hours, which is from 08:00 to 18:00",
      400
    );
  }

  const newAppointment = scheduleRepository.create({
    date,
    hour,
    property,
    user,
  });

  await scheduleRepository.save(newAppointment);

  return newAppointment;
};

export default scheduleNewAppointmentService;
