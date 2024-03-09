const messages = {
    error: {
        all: {
            INVALID_ID: 'Invalid ID, must be a string of 24 hex characters.',
            DELETE_ERROR: "Error while deleting: ",
            UPDATE_ERROR: "Error while updating: ",
            GET_ERROR: "Error while getting data: ",
            CREATE_ERROR: "Error while creating: ",
            NOT_FOUND: "Document with given ID not found.",
            EMAIL_REQUIRED: "Email is required.",
            MISSING_FIELDS: "Missing required fields.",
            INTERNAL_SERVER_ERROR: "Internal Server Error: Our servers encountered an unexpected issue while processing your request. Please try again in a few minutes. If the problem persists, contact support for assistance."
        },
        product: {
            INVALID_ROLE_ADD: "The user role is not allowed to add products.",
            INVALID_USER_DELETE: "The user does not have permission to delete this product.",
            DUPLICATED_CODE: "A product with that code already exists.",
            
        },
        cart: {
            OWN_PRODUCT_ERROR: "You cannot add your own products to the cart.",
            QUANTITY_REQUIRED: "Quantity is required and must be a integer.",
            PRODUCT_NOT_FOUND: "Product with given ID not found in cart.",
            PRODUCT_DELETE_ERROR: "Error deleting product from cart: ",
            GET_SUBTOTAL_ERROR: "Error getting cart subtotal: ",
            PURCHASE_ERROR: "Error purchasing cart: ",
            VALIDATE_STOCK_ERROR: "Error validating product stock: "
        },
        token: {
            USER_NOT_FOUND: "Email isn't associated with a registered user.",
            REPEATED_PASSWORD: "The password provided is invalid. Please choose a password that is different from your previous one.",
            INVALID_TOKEN: "Invalid token or expired.",
            COULDNT_RESET_PASSWORD: "Error while trying to reset password: "
        },
        user: {
            INVALID_AGE: "Invalid age range.",
            PASSWORD_MATCH_ERROR: "Password does not match.",
            REGISTER_ERROR: "User couldnt be registered",
            ADMIN_ROLE_CHANGE: "Admin role can't be changed."
        }
    },
    success: {
        token: {
            RESET_PASSWORD_SENT: "Reset password e-mail sent.",
            PASSWORD_RESTORED: "Pasword has been restored successfully."
        },
        user: {
            LOGOUT_SUCCESS: "User logged out successfuly"
        }
    }
};

export default messages;