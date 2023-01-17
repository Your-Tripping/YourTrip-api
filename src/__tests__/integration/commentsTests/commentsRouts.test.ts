import { DataSource } from "typeorm";
import AppDataSource from "../../../data-source";
import request from "supertest"
import app from "../../../app";
import {mockedUser, mockedAdmin, mockedAdminLogin, mockedComment, mockedPost, mockedUpdateComment, mockedUserLogin} from "../../mocks"


describe("/comment/:id", () => {
    let connection: DataSource

    beforeAll(async() => {
        await AppDataSource.initialize().then((res) => {
            connection = res
        }).catch((err) => {
            console.error("Error during Data Source initialization", err)
        })

        await request(app).post('/users').send(mockedUser)
        await request(app).post('/users').send(mockedAdmin)
    })

    afterAll(async() => {
        await connection.destroy()
    })

    test("POST /comment/:id -  Must be able to create comment",async () => {
        const adminLoginResponse = await request(app).post("/login").send(mockedAdminLogin);
        const createPost = await request(app).post('/posts').set("Authorization", `Bearer ${adminLoginResponse.body.token}`).send(mockedPost)
        const posts = await request(app).get('/posts')
        const response = await request(app).post(`/comment/${posts.body[0].id}`).set("Authorization", `Bearer ${adminLoginResponse.body.token}`).send(mockedComment)
        
        expect(response.body).toHaveProperty("content")
        expect(response.body).toHaveProperty("createdAt")
        expect(response.body).toHaveProperty("updatedAt")
        expect(response.status).toBe(201)
     
    })

    test("POST /comment/:id -  should not be able to create comment without authentication",async () => {
        const response = await request(app).post('/posts').send(mockedComment)

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(401)
             
    })

    test("UPDATE /comment/:id-  Must be able to update comment",async () => {
        const adminLoginResponse = await request(app).post("/login").send(mockedAdminLogin);
        const posts = await request(app).get('/posts')
        const response = await request(app).patch(`/posts/${posts.body[0].id}`).set("Authorization", `Bearer ${adminLoginResponse.body.token}`).send(mockedUpdateComment)

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(201)

        expect(response.body).toHaveProperty("content")
        expect(response.body).toHaveProperty("createdAt")
        expect(response.body).toHaveProperty("updatedAt")
             
    })

    test("UPDATE /comment/:id -  should not be able to update comment without authentication",async () => {
        const posts = await request(app).get('/posts')
        const response = await request(app).patch(`/posts/${posts.body[0].id}`).send(mockedUpdateComment)

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(401)
             
    })

    test("UPDATE /comment/:id -  should not be able to update other's comment", async () => {
        const loginResponse = await request(app).post("/login").send(mockedUserLogin);
        const posts = await request(app).get('/posts')
        const response = await request(app).patch(`/posts/${posts.body[0].id}`).set("Authorization", `Bearer ${loginResponse.body.token}`).send(mockedUpdateComment)

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(401)
             
    })

    test("UPDATE /comment/:id-  should not be able to update comment with invalid id",async () => {
        const adminLoginResponse = await request(app).post("/login").send(mockedAdminLogin);
        const response = await request(app).patch(`/posts/b855d86b-d4c9-41cd-ab98-d7fa734c6ce4`).set("Authorization", `Bearer ${adminLoginResponse.body.token}`).send(mockedUpdateComment)

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(404)
             
    })

})