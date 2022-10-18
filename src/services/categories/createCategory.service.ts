import AppDataSource from "../../data-source";
import { Category } from "../../entities/categories.entity";
import { AppError } from "../../errors/AppError";
import { ICategoryRequest } from "../../interfaces/categories";

const createCategoryService = async ({
  name,
}: ICategoryRequest): Promise<Category> => {
  const categoryRepository = AppDataSource.getRepository(Category);

  const category = await categoryRepository.findOneBy({ name });

  if (category) {
    throw new AppError("Category already exists", 400);
  }

  const newCategory = categoryRepository.create({
    name,
  });

  await categoryRepository.save(newCategory);

  return newCategory;
};

export default createCategoryService;
