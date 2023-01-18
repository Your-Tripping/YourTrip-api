import { DataSource } from "typeorm";
import AppDataSource from "../../../data-source";
import request from "supertest"
import app from "../../../app";
import {mockedUser, mockedAdmin, mockedAdminLogin, mockedUserLogin, mockedPost, mockedUpdatePost} from "../../mocks"


describe("/posts", () => {
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

    test("POST /posts -  Must be able to create post",async () => {
        const adminLoginResponse = await request(app).post("/login").send(mockedAdminLogin);
        const response = await request(app).post('/posts').set("Authorization", `Bearer ${adminLoginResponse.body.token}`).send(mockedPost)

        expect(response.body).toHaveProperty("id")
        expect(response.body).toHaveProperty("createdAt")
        expect(response.body).toHaveProperty("updatedAt")
        expect(response.body).toHaveProperty("title")
        expect(response.body).toHaveProperty("country")
        expect(response.body).toHaveProperty("location")
        expect(response.body).toHaveProperty("places")
        expect(response.status).toBe(201)
     
    })

    test("POST /posts -  should not be able to create post without authentication",async () => {
        const response = await request(app).post('/posts').send(mockedPost)

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(401)
             
    })

    test("GET /posts -  Must be able to list all posts", async () => {
      
        const response = await request(app).get('/posts')
        expect(response.body).toHaveLength(1)
        expect(response.status).toBe(200)
     
    })

    /* test("GET /posts/:id -  Must be able to list users'post", async () => {
        await request(app).post('/users').send(mockedAdmin)

        const adminLoginResponse = await request(app).post("/login").send(mockedAdminLogin);
        const UserToBeListed= await request(app).get('/users').set("Authorization", `Bearer ${adminLoginResponse.body.token}`)
    
        const response = await request(app).get(`/posts/${UserToBeListed.body[1].id}`)
        expect(response.body).toHaveLength(1)
        expect(response.status).toBe(200)
     
    }) */

    test("UPDATE /posts - Must be able to update posts", async () => {
        const posts = await request(app).get('/posts')
        const adminLoginResponse = await request(app).post("/login").send(mockedAdminLogin)
        const response = await request(app).patch(`/posts/${posts.body[0].id}`).set("Authorization", `Bearer ${adminLoginResponse.body.token}`).send(mockedUpdatePost)
        
        expect(response.status).toBe(201)
        expect(response.body).toHaveProperty("id")
        expect(response.body).toHaveProperty("createdAt")
        expect(response.body).toHaveProperty("updatedAt")
        expect(response.body).toHaveProperty("title")
        expect(response.body).toHaveProperty("country")
        expect(response.body).toHaveProperty("location")
        expect(response.body).toHaveProperty("places")
    })

    test("UPDATE /posts - Should not be able to update posts without authentication", async () => {
        const posts = await request(app).get('/posts')
        const response = await request(app).patch(`/posts/${posts.body[0].id}`).send(mockedUpdatePost)
        expect(response.status).toBe(401)
        expect(response.body).toHaveProperty("message")
    })

    test("UPDATE /posts - Should not be able to update other user's post without adm permission", async () => {
        const loginResponse = await request(app).post("/login").send(mockedUserLogin)
        const posts = await request(app).get('/posts')
        const response = await request(app).patch(`/posts/${posts.body[0].id}`).set("Authorization", `Bearer ${loginResponse.body.token}`)
        expect(response.status).toBe(403)
        expect(response.body).toHaveProperty("message")
    })

    test("UPDATE /posts - Should not be able to update posts with invalid ID", async () => {
        const adminLoginResponse = await request(app).post("/login").send(mockedAdminLogin)
        const response = await request(app).patch("/posts/b855d86b-d4c9-41cd-ab98-d7fa734c6ce4").set("Authorization", `Bearer ${adminLoginResponse.body.token}`).send(mockedUpdatePost)
        expect(response.status).toBe(404)
        expect(response.body).toHaveProperty("message")
    })

    test("DELETE /posts - Must be able to delete posts", async () => {
        const posts = await request(app).get('/posts')
        const adminLoginResponse = await request(app).post("/login").send(mockedAdminLogin);
        const response = await request(app).delete(`/posts/${posts.body[0].id}`).set("Authorization", `Bearer ${adminLoginResponse.body.token}`)
        expect(response.status).toBe(204)
    
    })

    test("DELETE /posts - Should not be able to delete posts with invalid ID", async () => {
        const adminLoginResponse = await request(app).post("/login").send(mockedAdminLogin);
        const response = await request(app).delete('/posts/b855d86b-d4c9-41cd-ab98-d7fa734c6ce4').set("Authorization", `Bearer ${adminLoginResponse.body.token}`)
        expect(response.status).toBe(404)
        expect(response.body).toHaveProperty("message")
    })

    test("DELETE /posts - Should not be able to delete posts without authentication", async () => {
        const response = await request(app).delete('/posts/b855d86b-d4c9-41cd-ab98-d7fa734c6ce4')
        expect(response.status).toBe(401)
        expect(response.body).toHaveProperty("message")
    })

    /* test("DELETE /posts - Should not be able to delete other user's post without adm permission", async () => {
        const posts = await request(app).get('/posts')
        const loginResponse = await request(app).post("/login").send(mockedUserLogin)
        const response = await request(app).delete(`/posts/${posts.body[0].id}`).set("Authorization", `Bearer ${loginResponse.body.token}`)
        expect(response.status).toBe(401)
        expect(response.body).toHaveProperty("message")
    }) */

})