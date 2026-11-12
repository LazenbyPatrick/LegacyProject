const { register } = require("../controllers/authController");
const User = require("../models/user");

jest.mock("../models/user");

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
});