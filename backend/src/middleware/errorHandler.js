/**
 * Global error handler middleware.
 * Tangkap semua error yang di-throw pakai next(error).
 */
const errorHandler = (err, req, res, next) => {
    console.error(`[ERROR] ${err.message}`, err.stack);

    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        error: err.message || 'Internal Server Error',
    });
};

export default errorHandler;
