import AppDataSource from "../../data-source";
import { Property } from "../../entities/properties.entity";
import { ScheduleUsersProperties } from "../../entities/schedules_users_properties.entity";
import { AppError } from "../../errors/AppError";

const listSchedulesFromOnePropertyService = async (propertyId: string) => {
  const propertyRepository = AppDataSource.getRepository(Property);
  const scheduleRepository = AppDataSource.getRepository(
    ScheduleUsersProperties
  );

  const property = await propertyRepository.findOneBy({ id: propertyId });

  if (!property) {
    throw new AppError("Property not found", 404);
  }

  const schedules = scheduleRepository.find({
    where: { property: { id: propertyId } },
    relations: { user: true },
  });

  return schedules;
};

export default listSchedulesFromOnePropertyService;
