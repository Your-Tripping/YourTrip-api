import { DataSource } from "typeorm";
import AppDataSource from "../../../data-source";
import request from "supertest"
import app from "../../../app";
import {mockedUser, mockedAdmin, mockedAdminLogin, mockedComment} from "../../mocks"


describe("/follow/:id", () => {
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

    test("POST /follow/:id -  Must be able to follow someone",async () => {
        const adminLoginResponse = await request(app).post("/login").send(mockedAdminLogin);
        const posts = await request(app).get('/users')
        const response = await request(app).post(`/follow/${posts.body[0].id}`).set("Authorization", `Bearer ${adminLoginResponse.body.token}`)
        
        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(200)
     
    })

    test("POST /follow/:id -  should not be able to follow someone with invalid id",async () => {
        const adminLoginResponse = await request(app).post("/login").send(mockedAdminLogin);
        const response = await request(app).post(`/follow/b855d86b-d4c9-41cd-ab98-d7fa734c6ce4`).set("Authorization", `Bearer ${adminLoginResponse.body.token}`)
        
        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(404)
     
    })

    test("POST /follow/:id -  should not be able to follow someone without authentication",async () => {
        const posts = await request(app).get('/users')
        const response = await request(app).post(`/follow/${posts.body[0].id}`)
        
        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(401)
     
    })

    test("DELETE /follow/:id  -  Must be able to unfollow someone",async () => {
        const adminLoginResponse = await request(app).post("/login").send(mockedAdminLogin);
        const posts = await request(app).get('/users')
        const response = await request(app).delete(`/follow/${posts.body[0].id}`).set("Authorization", `Bearer ${adminLoginResponse.body.token}`)
        
        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(200)
             
    })

    
})