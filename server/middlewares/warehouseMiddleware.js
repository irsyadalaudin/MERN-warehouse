const warehouseMiddleware = (req, res, next) => {
    const originalStatus = res.status

    res.status = function (statusCode) {
        if (statusCode === 200) {
            console.log(`Request to ${req.path} was successful with status ${statusCode}`)
        }
        return originalStatus.call(this, statusCode)
    }
    next()
}

export default warehouseMiddleware