import { IPlaceRequest } from "../places"

export interface IPostRequest {
    title: string
    country: string
    location: string
    places: IPlaceRequest
}

export interface IPostResponse {
    title: string
    country: string
    location: string
    createdAt: Date
    updatedAt: Date
    user: string
}