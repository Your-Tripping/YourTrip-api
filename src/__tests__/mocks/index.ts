import { IUserLogin,IUserRequest } from "../../interfaces/users";
import { IPostRequest } from "../../interfaces/postsInterface";

export const mockedUser : IUserRequest = {
    name: "Joana",
    email: "joana@mail.com",
    bio: "bio teste",
    isAdm: false,
    password: "123456"
}

export const mockedAdmin : IUserRequest = {
    name: "Felipe",
    email: "felipe@mail.com",
    isAdm: true,
    bio: "bio teste",
    password: "123456"
}

export const mockedUserLogin : IUserLogin = {
    email: "joana@mail.com",
    password: "123456"
}

export const mockedAdminLogin : IUserLogin = {
    email: "felipe@mail.com",
    password: "123456"
}


export const mockedPost : IPostRequest = {
    title: "Viajem para o rio",
    country: "Brasil",
    location:"Rio de Janeiro RJ",
    places: [{
        title: "Corcovado",
        imageUrl: "corcovado.png",
        description: "Lugar maravilhoso" 
    }]
}

export const mockedUpdatePost : IPostRequest = {
    title: "Viajem para o Sul",
    country: "Brasil",
    location:"Florianópolis SC",
    places: [{
        title: "Corcovado",
        imageUrl: "corcovado.png",
        description: "Lugar maravilhoso" 
    }]
    
}
