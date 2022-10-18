import { Request, Response } from "express";
import createCategoryService from "../services/categories/createCategory.service";
import listCategoriesService from "../services/categories/listCategories.service";
import listPropertiesFromCategoryService from "../services/categories/listPropertiesFromCategory.service";

export const createCategoryController = async (req: Request, res: Response) => {
  const { name } = req.body;

  const newCategory = await createCategoryService({ name });

  return res.status(201).json(newCategory);
};

export const listCategoriesController = async (req: Request, res: Response) => {
  const categories = await listCategoriesService();

  return res.status(200).json(categories);
};

export const listPropertiesFromCategoryController = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;

  const properties = await listPropertiesFromCategoryService(id);

  return res.status(200).json(properties);
};
