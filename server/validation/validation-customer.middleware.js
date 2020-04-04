const validattionMiddleware = (schema) => async (req, res, next) => {
    try {
        await schema.validateAsync(req.body);
        next();
    } catch (err) {
        return res.status(400).send({ message: err.message });
    }
};

module.exports = validattionMiddleware;
