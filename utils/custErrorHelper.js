const CustErroHelper = (next, message, statusCode) => {
    const errorMsg = new Error(message);
    errorMsg.status = statusCode;
    return next(errorMsg);
}

export default CustErroHelper;