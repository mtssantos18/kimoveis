import AppDataSource from "../../data-source";
import { Address } from "../../entities/addresses.entity";
import { Category } from "../../entities/categories.entity";
import { Property } from "../../entities/properties.entity";
import { AppError } from "../../errors/AppError";
import { IAddressRequest, IPropertyRequest } from "../../interfaces/properties";

const createPropertyService = async ({
  address,
  categoryId,
  size,
  value,
}: IPropertyRequest) => {
  const propertyRepository = AppDataSource.getRepository(Property);
  const addressRepository = AppDataSource.getRepository(Address);
  const categoryRepository = AppDataSource.getRepository(Category);

  const category = await categoryRepository.findOneBy({ id: categoryId });

  if (!category) {
    throw new AppError("Category not found", 404);
  }

  const checkAddress = await addressRepository.findOneBy({
    district: address.district,
  });

  if (checkAddress) {
    throw new AppError("Address already exists", 400);
  }

  if (address.zipCode.length > 8) {
    throw new AppError("ZipCode must have 8 characters", 400);
  }

  if (address.state.length > 2) {
    throw new AppError("State must have 2 characters", 400);
  }

  const newAddressObj: IAddressRequest = {
    district: address.district,
    zipCode: address.zipCode,
    number: address.number,
    city: address.city,
    state: address.state,
  };

  const newAddress = addressRepository.create(newAddressObj);

  await addressRepository.save(newAddress);

  const newProperty = propertyRepository.create({
    address: newAddress,
    category,
    size,
    value,
  });

  await propertyRepository.save(newProperty);

  return newProperty;
};

export default createPropertyService;
