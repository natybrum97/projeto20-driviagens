import httpStatus from "http-status";

export default function errorHandler(error, req, res, next) {
    console.log(error);

    if (error.type === "conflict") {
        return res.status(httpStatus.CONFLICT).send(error.message);
    }

    if (error.type === "notFound") {
        return res.status(httpStatus.NOT_FOUND).send(error.message);
    }

    if (error.type === "incompleteData") {
        return res.status(httpStatus.UNPROCESSABLE_ENTITY).send(error.message);
    }

    if (err.type === "invalidId") {
        return res.status(httpStatus.UNPROCESSABLE_ENTITY).send(err.message)
    }

    if (err.type === "InternalServerError") {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err.message)
    }

    if (err.type === "UnprocessableEntityforDate") {
        return res.status(httpStatus.UNPROCESSABLE_ENTITY).send(err.message)
    }

    if (err.type === "UnprocessableEntity") {
        return res.status(httpStatus.UNPROCESSABLE_ENTITY).send(err.message)
    }

    if (err.type === "BadRequest") {
        return res.status(httpStatus.BAD_REQUEST).send(err.message)
    }

    res.status(httpStatus.INTERNAL_SERVER_ERROR).send("Desculpe, houve um erro! 😢");
}