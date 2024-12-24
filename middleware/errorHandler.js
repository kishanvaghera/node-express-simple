const errorHandler = (err, req, res, next) => {
    if (err.status) {
        return res.status(err.status).json({
            success: false,
            message: err.message
        });
    }

    return res.status(500).json({
        success: false,
        message: err.message
    });
}

export default errorHandler;