module.exports.getUrlCurrent = (req) => {
    if (req) {
        return req.originalUrl.split('/')[1];
    } else {
        return null
    }
}