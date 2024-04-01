const ErrorHandler = (err, req, res, next) => {
    const errStatus = err.statusCode || 500;
    const errMsg = err.message || 'Something went wrong';

    return res.status(errStatus).json({
        status: 'error',
        error: errMsg
    });
}

export default ErrorHandler;