import { User } from "../../entities/user.entity";
import { IUserUpdate } from "../../interfaces/users";
import AppDataSource from "../../data-source";
import { userSerializer } from "../../serializers/user.serializers";

export const updateUserService = async (
  user: User,
  updateData: IUserUpdate
) => {
  const userRepo = AppDataSource.getRepository(User);

  const updatedUser = userRepo.create({
    ...user,
    ...updateData,
  });

  await userRepo.save(updatedUser);

  const validatedUser = await userSerializer.validate(updatedUser, {
    stripUnknown: true,
    abortEarly: false,
  });

  return validatedUser;
};
