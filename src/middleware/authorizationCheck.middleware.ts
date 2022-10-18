import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import "dotenv/config";

export const authorizationCheckMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({
      message: "Invalid token",
    });
  }

  token = token.split(" ")[1];

  jwt.verify(
    token,
    process.env.SECRET_KEY as string,
    (error: any, decoded: any) => {
      if (error) {
        return res.status(401).json({
          message: "Invalid token",
        });
      }

      req.user = {
        id: decoded.sub,
        isAdm: decoded.isAdm,
      };

      next();
    }
  );
};
