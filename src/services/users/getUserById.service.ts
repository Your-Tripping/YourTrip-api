import { User } from "../../entities/user.entity";
import { userSerializer } from "../../serializers/user.serializers";

export const getUserByIdService = async (userData: User) => {
  const validatedUser = await userSerializer.validate(userData, {
    stripUnknown: true,
    abortEarly: false,
  });

  return validatedUser;
};
