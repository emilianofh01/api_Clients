module.exports = (err, req, res, next) => {
    let response = {
        success: false,
        errors: {
            code: err.code || 500,
            message: err.message || "Internal Server Error"
        }
    }

    if(Array.isArray(err)) {
        response.errors = err
    }

    if(err.message === "Not Found") {
        response.errors.code = 400;
        response.errors.message = err.message;
    }

    res.status(response.errors.code || response.errors[0].code || 500).send(response);
}