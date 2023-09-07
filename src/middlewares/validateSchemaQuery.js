export function validateSchemaQuery(schema) {
    return (req, res, next) => {

        const validation = schema.validate(req.query, { abortEarly: false });

        if (validation.error) {
            const errors = validation.error.details.map(detail => detail.message);
            return res.status(422).send("O formato esperado de data é: dd-mm-aaaa");
        }

        next();

    }
}