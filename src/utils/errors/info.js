export const generateUserErrorInfo = (user) => {
    return `
        One or more properties are incomplete or invalid.
        Mandatory Properties List
        
        first_name: Must be a string (${user?.first_name})
        last_name: Must be a string (${user?.last_name})
        email: Must be a string (${user?.email})
        password: Must be a string
        confirmPassword: Must be a string
        age: Must be a number between 18 and 65 (${user?.age})
    `
}

export const generateProductErrorInfo = (product) => {
    return `
        One or more properties are incomplete or invalid.
        Mandatory Properties List
        
        title: Must be a string (${product?.name})
        price: Must be a number (${product?.price})
        stock: Must be a number (${product?.stock})
        thumbnail: Must be a string (${product?.thumbnail})
        code: Must be a string (${product?.code})
        description: Must be a string (${product?.description})
    `
}

export const generateOrderErrorInfo = (order) => {
    return `
        One or more properties are incomplete or invalid.
        Mandatory Properties List
        
        userEmail: Must be a string (${order?.email})
        cid: Must be a string (${order?.cid})
    `
}