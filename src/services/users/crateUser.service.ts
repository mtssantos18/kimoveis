import { hash } from "bcryptjs";
import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/AppError";
import { IUserRequest } from "../../interfaces/users";

const createUserService = async ({
  email,
  isActive,
  isAdm,
  name,
  password,
}: IUserRequest): Promise<User> => {
  const userRepository = AppDataSource.getRepository(User);

  const checkEmail = await userRepository.findOneBy({ email: email });

  if (checkEmail) {
    throw new AppError("Email already registered", 400);
  }

  const hashedPassword = await hash(password, 10);

  const newUser = userRepository.create({
    name,
    email,
    isAdm,
    isActive,
    password: hashedPassword,
  });

  await userRepository.save(newUser);

  return newUser;
};

export default createUserService;
