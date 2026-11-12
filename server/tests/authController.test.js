const { register, login } = require("../controllers/authController");
const User = require("../models/user");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");

jest.mock("../models/user");
jest.mock("bcrypt");
jest.mock("jsonwebtoken");

describe("Authentication Controller", () => {
    test("should register a user successfully", async () => {
        const req = {
            body: {
                email: "test@example.com",
                password: "password123",
                role: "adopter"
            },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        User.mockImplementation(() => ({
            save: jest.fn().mockResolvedValue(undefined),
        }));
        await register(req, res);

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({
            message: "User registered successfully",
        });
    });
    test("should retrun 400 when registration fails", async () => {
        const req = {
            body: {
                email: "test@example.com",
                password: "password123",
                role: "adopter"
            },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        User.mockImplementation(() => ({
            save: jest.fn().mockRejectedValue(new Error("Database error")),
        }));
        await register(req, res);
        expect(res.status).toHaveBeenCalledWith(400);

    });
    test("should reject login when user does not exist", async () => {
        const req = {
            body: {
                email: "test@example.com",
                password: "password123"
            },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        User.findOne.mockResolvedValue(null);
        await login(req, res);
        expect(res.status).toHaveBeenCalledWith(401);

    });

    test("should reject login when password is incorrect", async () => {
        const req = {
            body: {
                email: "test@example.com",
                password: "password123"
            },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        User.findOne.mockResolvedValue({
            _id: "12345",
            email: "test@example.com",
            password: "hashedPassword123",
            role: "adopter"
        });
        bcrypt.compare.mockResolvedValue(false);
        await login(req, res);
        expect(res.status).toHaveBeenCalledWith(401);
    });

    test("should login succesfully and return a JWT token", async () => {
        const req = {
            body: {
                email: "test@example.com",
                password: "password123"
            },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        User.findOne.mockResolvedValue({
            _id: "12345",
            email: "test@example.com",
            password: "hashedPassword123",
            role: "adopter"
        });
        bcrypt.compare.mockResolvedValue(true);
        jwt.sign.mockReturnValue("fake-jwt-token");
        await login(req, res)
        expect(res.json).toHaveBeenCalledWith({
                token: "fake-jwt-token",
                role: "adopter"
        });
    });
});