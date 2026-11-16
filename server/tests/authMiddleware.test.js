const jwt = require("jsonwebtoken");
const authMiddleware = require("../middleware/authMiddleware");


describe("Authentication Middleware", () => {

    let req;
    let res;
    let next;

    beforeEach(() => {
        req = {
            headers: {}
        };

        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        next = jest.fn();
    });

    test("should reject requests without a token", () => {
        authMiddleware(req, res, next);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({
            error: "Access denied, no token provided"
        });
        expect(next).not.toHaveBeenCalled();
    });

    test("should reject requests with an invalid token", () => {
        req.headers.authorization = "Bearer invalid-token";

        authMiddleware(req, res, next);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({
            error: "Invalid token"
        });
        expect(next).not.toHaveBeenCalled();
    });

    test("should allow requests with a valid token", () => {
        const token = jwt.sign(
            { id: "123", role: "shelter" },
            "test-secret"
        );

        process.env.JWT_SECRET = "test-secret";

        req.headers.authorization = `Bearer ${token}`;

        authMiddleware(req, res, next);

        expect(next).toHaveBeenCalledTimes(1);
        expect(req.user.id).toBe("123");
        expect(req.user.role).toBe("shelter");
        expect(res.status).not.toHaveBeenCalled();
    });
});