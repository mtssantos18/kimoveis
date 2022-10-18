import { compare } from "bcryptjs";
import jwt from "jsonwebtoken";
import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/AppError";
import { IUserLogin } from "../../interfaces/users/index";
import "dotenv/config";

const loginUserService = async ({
  email,
  password,
}: IUserLogin): Promise<string> => {
  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOneBy({ email });

  if (!user) {
    throw new AppError("Invalid email or password", 403);
  }

  if (!user.isActive) {
    throw new AppError("Inactive user", 403);
  }

  const checkPassword = await compare(password, user.password);

  if (!checkPassword) {
    throw new AppError("Invalid email or password", 403);
  }

  const token = jwt.sign(
    {
      isAdm: user.isAdm,
    },
    process.env.SECRET_KEY as string,
    {
      subject: user.id,
      expiresIn: "10h",
    }
  );

  return token;
};

export default loginUserService;
