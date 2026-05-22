const errorMiddleware = (err, req, res, next) => {
    console.error(JSON.stringify(err, null, 4));


    let statusCode = err.statusCode || 500;
    let message = err.message || "Internal Server Error";
    let errors = null;

    if (err.name === "JsonWebTokenError") {
        statusCode = 401;
        message = "Invalid token";
    }

    if (err.name === "TokenExpiredError") {
        statusCode = 401;
        message = "Token expired";
    }

    if (err.name === "ZodError") {
        statusCode = 400;
        message = err.errors || "Validation error";

        errors = err.errors.map((error) => ({
            field: error.path.join("."),
            message: error.message || "Invalid value",
        }));
    }

    return res.status(statusCode).json({
        success: false,
        message,
        errors,
    });
};

export default errorMiddleware;
