import * as yup from "yup";
import { SchemaOf } from "yup";
import { IPostRequest, IPostResponse } from "../interfaces/postsInterface";
import { IPlaceRequest } from "../interfaces/places";

const date = new Date().toLocaleDateString();

const getDate = (date: string) => {
  return date.split("/").reverse().join("-");
};

const postSerializer: SchemaOf<IPostRequest> = yup.object().shape({
  title: yup.string().required(),
  country: yup.string().required(),
  location: yup.string().required(),
  places: yup.array(
    yup.object().shape({
      title: yup.string().required(),
      imageUrl: yup.string().required(),
      description: yup.string().required(),
    })
  ),
});

const placeSerializer: SchemaOf<IPlaceRequest> = yup.object().shape({
  title: yup.string().required(),
  imageUrl: yup.string().required(),
  description: yup.string().required(),
});

const postResponseSerializer: SchemaOf<IPostResponse> = yup.object().shape({
  title: yup.string().required(),
  country: yup.string().required(),
  location: yup.string().required(),
  createdAt: yup.date().max(getDate(date)).required(),
  updatedAt: yup.date().max(getDate(date)).required(),
  user: yup.string().required(),
});

export { postSerializer, postResponseSerializer, placeSerializer };
