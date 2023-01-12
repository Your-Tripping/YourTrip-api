import * as yup from "yup";
import { SchemaOf } from "yup";
import { IUserRequest, IUser, IUserUpdate } from "../interfaces/users";

const userSerializer: SchemaOf<IUserRequest> = yup.object().shape({
  name: yup.string().max(40).required(),
  email: yup.string().email().required(),
  password: yup.string().required(),
  isAdm: yup.boolean().required(),
  bio: yup.string().required(),
});

const userUpdateSerializer: SchemaOf<IUserUpdate> = yup.object().shape({
  email: yup.string().email().notRequired(),
  name: yup.string().notRequired(),
  password: yup.string().notRequired(),
  bio: yup.string().notRequired(),
});

const userWithoutPasswordSerializer: SchemaOf<IUser> = yup.object().shape({
  id: yup.string().notRequired(),
  name: yup.string().notRequired(),
  email: yup.string().email().notRequired(),
  isAdm: yup.boolean().notRequired(),
  createdAt: yup.date().notRequired(),
  updatedAt: yup.date().notRequired(),
  bio: yup.string().notRequired(),
});

export { userSerializer, userUpdateSerializer, userWithoutPasswordSerializer };
