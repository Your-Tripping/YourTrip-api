import * as yup from "yup";
import { SchemaOf } from "yup";
import { IUser } from "../interfaces/users";

export const userSerializer: SchemaOf<IUser> = yup.object().shape({
  id: yup.string().required(),
  name: yup.string().required(),
  email: yup.string().email().required(),
  bio: yup.string().required(),
  imageUrl: yup.string().notRequired().nullable(),
  isAdm: yup.boolean().required(),
  isActive: yup.boolean().required(),
  createdAt: yup.date().required(),
  updatedAt: yup.date().required(),
});
