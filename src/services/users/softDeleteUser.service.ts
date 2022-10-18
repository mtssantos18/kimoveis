import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/AppError";

const softDeleteUserService = async (userId: string) => {
  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOneBy({ id: userId });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  if (user.isActive === false) {
    throw new AppError("This user is not active", 400);
  }

  await userRepository.update(user.id, { isActive: false });

  return true;
};

export default softDeleteUserService;
