const request = require("supertest");
const app = require("../app");


jest.mock("../models/Pet");
const Pet = require("../models/Pet");

describe("GET /pets", () => {
    test("should return all pets successfully", async () => {
        const mockPets = [
            { name: "Buddy", type: "Dog", age: 3 },
            { name: "Luci", type: "Cat", age: 2 },
        ];
        Pet.find.mockResolvedValue(mockPets);
        const response = await request(app).get("/pets");
        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockPets);
    });
    test("should return 500 when the database fails", async () => {
        Pet.find.mockRejectedValue(new Error("Database connection failed"));
        const response = await request(app).get("/pets");
        expect(response.status).toBe(500);
        expect(response.body.error).toBe("Database connection failed");
    })
});