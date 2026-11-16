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
describe("GET /pets/:id", () => {
    test("should return a pet by its ID", async () => {
        const mockPet = {
            _id: "507f1f77bcf86cd799439011",
            name: "Buddy",
            type: "Dog",
            age: 3,
        };
        Pet.findById.mockResolvedValue(mockPet);

        const response = await request(app).get(`/pets/${mockPet._id}`);

        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockPet);
    });

    test("should return 404 when the pet does not exist", async () => {
        const petId = "507f1f77bcf86cd799439011";

        Pet.findById.mockResolvedValue(null);

        const response = await request(app).get(`/pets/${petId}`);

        expect(response.status).toBe(404);
        expect(response.body).toEqual({ error: "Pet not found" });
    });
    test("should return 500 when fetching a pet fails", async () => {
        const petId = "507f1f77bcf86cd799439011";

        Pet.findById.mockRejectedValue(new Error("Database connection failed"));

        const response = await request(app).get(`/pets/${petId}`);

        expect(response.status).toBe(500);
        expect(response.body).toEqual({
            error: "Failed to fetch pet details"
        });
    });
});