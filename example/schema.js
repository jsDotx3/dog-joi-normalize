/**
 * Example for Schema validation.
 */
exports.create = (Joi) => Joi.object().keys({
    name: Joi.string().required().min(4).max(10),
});