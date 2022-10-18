import { NextFunction, Request, Response } from "express";

export const verifyIsAdmMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { user } = req;

  if (!user.isAdm) {
    return res.status(403).json({
      message: "User must be Admin",
    });
  }

  next();
};
