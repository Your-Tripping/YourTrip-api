import AppDataSource from "../data-source";
import { User } from "../entities/user.entity";
import { AppError } from "../error/errors";
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

export const getUsersService = async (): Promise<IUser[]> => {
  const userRepo = AppDataSource.getRepository(User);
  const users = await userRepo.find();

  const validatedUsers: Array<IUser> = users.map(
    ({
      id,
      name,
      email,
      isAdm,
      isActive,
      imageUrl,
      bio,
      createdAt,
      updatedAt,
    }) => {
      const userWithoutPassword: IUser = {
        id,
        name,
        email,
        imageUrl,
        bio,
        isAdm,
        isActive,
        createdAt,
        updatedAt,
      };

      return userWithoutPassword;
    }
  );

  return validatedUsers;
};

export const deleteUserService = async (userData: User) => {
  const userRepo = AppDataSource.getRepository(User);

  const deletedUser = userRepo.create({
    ...userData,
    isActive: false,
  });

  await userRepo.save(deletedUser);

  return;
};
