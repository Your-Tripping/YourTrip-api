import AppDataSource from "../data-source";
import { User } from "../entities/user.entity";

export const deleteUserService = async (userData: User) => {
  const userRepo = AppDataSource.getRepository(User);

  const deletedUser = userRepo.create({
    ...userData,
    isActive: false,
  });

  await userRepo.save(deletedUser);

  return;
};
