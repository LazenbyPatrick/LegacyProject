const request = require("supertest");
const app = require("../app");
const jwt = require("jsonwebtoken");


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
describe("POST /pets", () => {

    const originalSecret = process.env.JWT_SECRET;

    beforeAll(() => {
        process.env.JWT_SECRET = "test-secret";
    });

    afterAll(() => {
        if (originalSecret === undefined) {
            delete process.env.JWT_SECRET;
        } else {
            process.env.JWT_SECRET = originalSecret;
        }
    });



    test("should create a new pet successfully", async () => {
        const mockPet = {
            name: "Buddy",
            type: "Dog",
            age: 3
        };
        const token = jwt.sign(
            { id: "123", role: "shelter" },
            "test-secret"
        );
        Pet.mockImplementation((data) => ({
            ...data,
            save: jest.fn().mockResolvedValue(undefined)
        }));

        const response = await request(app)
            .post("/pets")
            .set("Authorization", `Bearer ${token}`)
            .send(mockPet);

        expect(response.status).toBe(201);

        expect(response.body).toEqual({
            ...mockPet,
            shelter: "123"
        });

    });

    test("should reject requests without authentication", async () => {
        const response = await request(app)
            .post("/pets")
            .send({
                name: "Buddy",
                type: "Dog",
                age: 3
            });

        expect(response.status).toBe(401);
        expect(response.body).toEqual({
            error: "Access denied, no token provided"
        });
    });

    test("should return 400 when saving a pet fails", async () => {
        Pet.mockImplementation((data) => ({
            ...data,
            save: jest.fn().mockRejectedValue(
                new Error("Database save failed")
            )
        }));
        const token = jwt.sign(
            { id: "123", role: "shelter" },
            "test-secret"
        );

        const response = await request(app)
            .post("/pets")
            .set("Authorization", `Bearer ${token}`)
            .send({
                name: "Buddy",
                type: "Dog",
                age: 3
            });

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            error: "Database save failed"
        });
    });

    test("should reject adopters from creating pets", async () => {
        const token = jwt.sign(
            { id: "123", role: "adopter" },
            "test-secret"
        );

        const response = await request(app)
            .post("/pets")
            .set("Authorization", `Bearer ${token}`)
            .send({
                name: "Buddy",
                type: "Dog",
                age: 3
            });

        expect(response.status).toBe(403);
        expect(response.body).toEqual({
            error: "Only shelters can add pets"
        });
    });
});