import AppDataSource from "../data-source";
import { User } from "../entities/user.entity";
import { AppError } from "../error/errors";
import { IUser, IUserRequest } from "../interfaces/users";
import { createUserSerializer } from "../serializers/user.serializers";

export const createUserService = async (
  userData: IUserRequest
) => {
  const userRepo = AppDataSource.getRepository(User);

  const validatedUser = await createUserSerializer
    .validate(userData, {
      stripUnknown: true,
      abortEarly: true,
    })
    .catch((err) => {
      throw new AppError(err.errors[0], 400);
    });

  const newUser = userRepo.create({
    ...userData,
    updatedAt: new Date(),
    createdAt: new Date(),
    isAdm: false,
  });

  const user: Partial<Pick<User, "password">> & Omit<User, "password"> =
    await userRepo.save(newUser);

  delete user.password;

  return user;
};
