const joi = require('joi');
function camalize(str) {
    return str.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());
}

const errorObject = errors => {
    const errorsObject = {};
    errors.map(error => {
        let { path, type } = error;
        type = camalize(
            type
                .split(' ')
                .join('_')
                .replace('.', ' '),
        );

        if (Array.isArray(path)) {
            path = path.join('_');
        }

        if (!errorsObject.hasOwnProperty(path)) {
            errorsObject[path] = {
                type,
                path,
            };
        }
    });
    return errorsObject;
};

module.exports = schema => (req, res, next) => {
    const { error } = joi.validate(req.body, schema(joi), {
        abortEarly: false,
        allowUnknown: true,
    });

    if (error) {
        return res.status(422).json({ error: errorObject(error.details) });
    }
    next();
};
