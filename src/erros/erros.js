function notFound(resource = "Item") {
    return {
        type: "notFound", 
        message: `${resource} não foi encontrado(a)!`
    }
}

function conflict(resource) {
    return {
        type: "conflict", 
        message: `${resource ? resource : "Item"} já existe!`
    }
}

function conflictForBeingEqual(resource) {
    return {
        type: "conflict", 
        message: `${resource} devem ser diferentes!`
    }
}

function  InternalServerError() {
    return {
        type: "InternalServerError", 
        message: "Desculpe, houve um erro!"
    }
}

function  UnprocessableEntityforDate() {
    return {
        type: "UnprocessableEntityforDate", 
        message: "A data do voo deve ser maior que a data atual!"
    }
}

function  UnprocessableEntity() {
    return {
        type: "UnprocessableEntity", 
        message: "Unprocessable Entity!"
    }
}

function  BadRequest() {
    return {
        type: "BadRequest", 
        message: "Bad Request!"
    }
}

export const errors = {notFound, conflict, InternalServerError, conflictForBeingEqual, UnprocessableEntityforDate, BadRequest, UnprocessableEntity};