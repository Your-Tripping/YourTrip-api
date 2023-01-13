import AppDataSource from "../data-source";
import { User } from "../entities/user.entity";
import { IUser } from "../interfaces/users";

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
