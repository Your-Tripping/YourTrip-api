import * as yup from "yup";
import { SchemaOf } from "yup";
import { IPlaceRequest } from "../interfaces/places";

const placeSerializer: SchemaOf<IPlaceRequest> = yup.object().shape({
  title: yup.string().required(),
  imageUrl: yup.string().required(),
  description: yup.string().required(),
});

export { placeSerializer };
