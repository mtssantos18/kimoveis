import { Request, Response } from "express";
import { IPropertyRequest } from "../interfaces/properties";
import createPropertyService from "../services/properties/createProperty.service";
import listPropertiesService from "../services/properties/listProperties.service";

export const createPropertyController = async (req: Request, res: Response) => {
  const { address, categoryId, size, value }: IPropertyRequest = req.body;

  const newProperty = await createPropertyService({
    address,
    categoryId,
    size,
    value,
  });

  return res.status(201).json(newProperty);
};

export const listPropertiesController = async (req: Request, res: Response) => {
  const properties = await listPropertiesService();

  return res.status(200).json(properties);
};
