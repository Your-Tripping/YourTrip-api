import { IUserLogin } from "../../interfaces/users";

import { compare } from "bcryptjs";
import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { AppError } from "../../error/errors";

import jwt from "jsonwebtoken";
import "dotenv/config";

export const userLoginService = async ({
  email,
  password,
}: IUserLogin): Promise<{ token: string }> => {
  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOneBy({
    email: email,
  });

  const passwordCheck = await compare(password, user?.password as string);

  if (!user?.isActive) {
    throw new AppError("User inactive!", 400);
  }

  if (!user || !passwordCheck) {
    throw new AppError("Invalid User or password!", 403);
  }

  const token = jwt.sign(
    {
      isAdm: user.isAdm,
    },
    process.env.SECRET_KEY as string,
    {
      subject: user.id,
      expiresIn: "24h",
    }
  );

  return { token: token };
};
