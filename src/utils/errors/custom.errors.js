import messages from "../../resources/messages.js"
import EErrors from "./enums.js"
import { generateUserErrorInfo, generateProductErrorInfo, generateOrderErrorInfo } from "./info.js"

export default class CustomError {

    static createError({ name = 'Error', cause, message, code, statusCode }) {
        const error = new Error(message, { cause });
        error.name = name;
        error.code = code;
        error.statusCode = statusCode;

        throw error;
    }

    static createUser(user) {
        CustomError.createError({
            name: 'User creation error',
            cause: generateUserErrorInfo(user),
            message: 'Error trying to create user',
            code: EErrors.INVALID_TYPES_ERROR,
            statusCode: 400
        })
    }

    static createProduct(product) {
        CustomError.createError({
            name: 'Product creation error',
            cause: generateProductErrorInfo(product),
            message: 'Error trying to create product',
            code: EErrors.INVALID_TYPES_ERROR,
            statusCode: 400
        })
    }

    static login() {
        CustomError.createError({
            name: 'Login error',
            cause: 'Invalid email or password',
            message: 'Error trying to login',
            code: EErrors.INVALID_CREDENTIALS,
            statusCode: 400
        })
    }

    static createOrder(data) {
        CustomError.createError({
            name: 'Ticket creation error',
            cause: 'Invalid ticket data',
            message: generateOrderErrorInfo(data),
            code: EErrors.INVALID_TYPES_ERROR,
            statusCode: 400
        })
    }

    static deleteProduct() {
        CustomError.createError({
            name: 'Product deletion error',
            cause: 'Invalid product id',
            message: 'Error trying to delete product',
            code: EErrors.INVALID_TYPES_ERROR,
            statusCode: 400
        })
    }

    static passwordsDontMatch() {
        CustomError.createError({
            name: 'Passwords dont match',
            cause: 'Passwords dont match',
            message: 'Error trying to register user',
            code: EErrors.PASSWORDS_DONT_MATCH,
            statusCode: 400
        })
    }

    static documentNotFound(message = messages.error.all.NOT_FOUND) {
        CustomError.createError({
            name: 'Not found',
            cause: 'Not found',
            message: message,
            code: EErrors.NOT_FOUND,
            statusCode: 400
        })
    }

    static duplicatedProductCode() {
        CustomError.createError({
            name: 'Code duplicated',
            cause: 'The code must be unique',
            message: messages.error.product.DUPLICATED_CODE,
            code: EErrors.DUPLICATED_CODE,
            statusCode: 400
        })
    }

}