import request from 'supertest'
import app from './index'

describe.skip("Server", () => {
    beforeEach(() => {
        jest.resetModules() // Most important - it clears the cache
        process.env = {...process.env, port: "8080"}
    });
    afterAll(async () => {
        await new Promise<void>(resolve => setTimeout(() => resolve(), 500)); // avoid jest open handle error
    });
    describe("Get index", () => {
            // @ts-ignore
            test("should respond with a 200 status code", async () => {
                await request(app).get('/').then(response => expect(response.statusCode).toBe(200))
            })
        }
    )
})


