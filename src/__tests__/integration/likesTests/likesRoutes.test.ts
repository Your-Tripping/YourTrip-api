/* import { DataSource } from "typeorm";
import AppDataSource from "../../../data-source";
import request from "supertest"
import app from "../../../app";
import {mockedUser, mockedAdmin, mockedAdminLogin, mockedComment, mockedPost} from "../../mocks"


describe("/like/:id", () => {
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

    test("POST /like/:id -  Must be able to like some post",async () => {
        const adminLoginResponse = await request(app).post("/login").send(mockedAdminLogin);
        const createPost = await request(app).post('/posts').set("Authorization", `Bearer ${adminLoginResponse.body.token}`).send(mockedPost)
        const posts = await request(app).get('/posts')
        const response = await request(app).post(`/like/${posts.body[0].id}`).set("Authorization", `Bearer ${adminLoginResponse.body.token}`)
        
        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(200)
     
    })

    test("POST /like/:id -  should not be able to like some post twice",async () => {
        const adminLoginResponse = await request(app).post("/login").send(mockedAdminLogin);
        const posts = await request(app).get('/posts')
        const response = await request(app).post(`/like/${posts.body[0].id}`).set("Authorization", `Bearer ${adminLoginResponse.body.token}`)
        
        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(401)
     
    })

    test("POST /like/:id -  should not be able to like some post with invalid id",async () => {
        const adminLoginResponse = await request(app).post("/login").send(mockedAdminLogin);
        const response = await request(app).post(`/like/b855d86b-d4c9-41cd-ab98-d7fa734c6ce4`).set("Authorization", `Bearer ${adminLoginResponse.body.token}`)
        
        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(404)
     
    })

    test("POST /like/:id -  should not be able to like some post without authentication",async () => {
        const posts = await request(app).get('/posts')
        const response = await request(app).post(`/follow/${posts.body[0].id}`)
        
        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(401)
     
    })

    test("DELETE /like/:id  -  Must be able to unlike some post",async () => {
        const adminLoginResponse = await request(app).post("/login").send(mockedAdminLogin);
        const posts = await request(app).get('/posts')
        const response = await request(app).delete(`/follow/${posts.body[0].id}`).set("Authorization", `Bearer ${adminLoginResponse.body.token}`)
        
        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(200)
             
    })

    
}) */