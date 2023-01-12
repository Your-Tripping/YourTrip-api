import * as yup from "yup";
import { SchemaOf } from "yup";
import { IUserRequest, IUser, IUserUpdate } from "../interfaces/users";

const date = new Date().toLocaleDateString()

const getDate = (date: string) => {
    return date.split("/").reverse().join("-")
}

export const createUserSerializer: SchemaOf<IUserRequest> = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  bio: yup.string().required(),
  imageUrl: yup.string().notRequired(),  
  password: yup.string().required()
})

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

export const userUpdateSerializer: SchemaOf<IUserUpdate> = yup.object().shape({
  email: yup.string().email().notRequired(),
  name: yup.string().notRequired(),
  password: yup.string().notRequired(),
  bio: yup.string().notRequired(),
});

export const userWithoutPasswordSerializer: SchemaOf<IUser> = yup.object().shape({
  id: yup.string().required(),
  name: yup.string().required(),
  email: yup.string().email().required(),
  bio: yup.string().required(),
  createdAt: yup.date().max(getDate(date)).required(),
  updatedAt: yup.date().max(getDate(date)).required(),
  isActive: yup.boolean().required(),
  imageUrl: yup.string().notRequired(),
  isAdm: yup.boolean().required()
});
