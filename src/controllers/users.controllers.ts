import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import { IUserRequest } from "../interfaces/users";
import createUserService from "../services/users/crateUser.service";
import listUsersService from "../services/users/listUsers.service";
import softDeleteUserService from "../services/users/softDeleteUser.service";

export const createUserController = async (req: Request, res: Response) => {
  const { email, isActive, isAdm, name, password }: IUserRequest = req.body;

  const newUser = await createUserService({
    email,
    isActive,
    isAdm,
    name,
    password,
  });

  return res.status(201).json(instanceToPlain(newUser));
};

export const listUsersController = async (req: Request, res: Response) => {
  const users = await listUsersService();

  return res.status(200).json(instanceToPlain(users));
};

export const softDeleteUserController = async (req: Request, res: Response) => {
  const { id } = req.params;

  const softDeletedUser = await softDeleteUserService(id);

  return res.status(204).json(softDeletedUser);
};
