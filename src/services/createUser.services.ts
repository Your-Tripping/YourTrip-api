import AppDataSource from "../data-source";
import { User } from "../entities/user.entity";
import { IUser, IUserRequest } from "../interfaces/users";
import { userSerializer } from "../serializers/user.serializers";

export const createUserService = async (
  userData: IUserRequest
): Promise<IUser> => {
  const userRepo = AppDataSource.getRepository(User);
  const newUser = userRepo.create(userData);

  await userRepo.save(newUser);

  const validatedUser = await userSerializer.validate(newUser, {
    stripUnknown: true,
    abortEarly: true,
  });

  return validatedUser;
};
