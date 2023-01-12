import * as yup from "yup";
import { SchemaOf } from "yup";
import { IPostRequest, IPostResponse } from "../interfaces/postsInterface";
import { IPlaceRequest } from "../interfaces/places";

const postSerializer: SchemaOf<IPostRequest, IPlaceRequest> = yup
  .object()
  .shape({
    title: yup.string().required(),
    country: yup.string().required(),
    location: yup.string().required(),
    places: yup.object().shape({
      title: yup.string().notRequired(),
      imageUrl: yup.string().notRequired(),
      description: yup.string().notRequired(),
    }),
  });

const postResponseSerializer: SchemaOf<IPostResponse> = yup.object().shape({
  title: yup.string().required(),
  country: yup.string().required(),
  location: yup.string().required(),
  createdAt: yup.date().required(),
  updatedAt: yup.date().notRequired(),
  user: yup.string().required(),
});

export { postSerializer, postResponseSerializer };
