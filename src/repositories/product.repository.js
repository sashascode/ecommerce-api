import { logger } from "../utils/logger.js";
import config from "../config/config.js";
import messages from "../resources/messages.js";

export class ProductNotFoundError extends Error {
    constructor(message) {
        super(message);
        this.name = "ProductNotFoundError";
    }
}

export class FileError extends Error {
    constructor(message) {
        super(message);
        this.name = "FileError";
    }
}

export default class ProductRepository {
    constructor(dao) {
        this.dao = dao;
    }

    #isUniqueCode = async (code) => {
        const product = await this.dao.getProductByCode(code);
        return product.length === 0;
    }

    addProduct = async ({title, description, price, thumbnail, code, stock, status, category, owner }) => {
        try {
            if(!title || !description || !price || !category || !code || !stock || !category || !thumbnail) {
                throw new Error("You must fill all the required fields.");
            }
    
            const uniqueCode = await this.#isUniqueCode(code);
    
            if(!uniqueCode) {
                throw new Error(messages.error.products.DUPLICATED_CODE);
            }
    
            const product = {
                title,
                description,
                price,
                thumbnail,
                code, 
                stock,
                status: status !== undefined ? status : true,
                category,
                owner
            };
  
            const res = await this.dao.createProduct(product);
            return res._id;
        }
        catch(error) {
            logger.debug(error)
            throw new Error(messages.error.products.CREATE_ERROR + error.message);
        }   
    }

    getProductById = async (id) => {
        const product = await this.dao.getProductById(id);

        if (!product) {
            throw new ProductNotFoundError(messages.error.products.NOT_FOUND);
        }
        
        return product;
    };

    getProducts = async (limit = 10, page = 1, sort, query = {}) => {
        try {
            const options = { limit, page, lean: true };
            const baseUrl = config.baseUrl;

            if (sort == 'asc') {
                options.sort = { price: 1 };
            } else if (sort == 'desc') {
                options.sort = { price: -1 };
            }

            if (query && Object.keys(query).length !== 0) {
                query = JSON.parse(query.toLowerCase());
            }
            
            const data = await this.dao.getProducts(query, options);
            
            const response = {
                productList: data.docs,
                totalPages: data.totalPages,
                page: data.page,
                prevPage: data.prevPage,
                nextPage: data.nextPage,
                hasPrevPage: data.hasPrevPage,
                hasNextPage: data.hasNextPage,
                prevLink: data.hasPrevPage ? `${baseUrl}api/product?limit=${limit}&page=${data.prevPage}` : null,
                nextLink: data.hasNextPage ? `${baseUrl}api/product?limit=${limit}&page=${data.nextPage}` : null
            }
            
            return response;
        }
        catch(error) {
            throw new FileError(messages.error.products.GET_ERROR + error.message);
        };
    };

    updateProduct = async (id, obj) => {
        try {
            const res = await this.dao.updateProduct(id, obj);
            return res._id;
        }
        catch (err) {
            throw new Error(messages.error.products.UPDATE_ERROR + err.message);
        }
    }

    deleteProduct = async (id) => {
        try {
            const res = await this.dao.deleteProduct(id);
            return res._id;
        }
        catch (err) {
            throw new Error(messages.error.products.DELETE_ERROR + err.message);
        }
        
    };   

    updateProductStock = async (id, quantity) => {
        try {
            const res = await this.dao.updateProductStock(id, quantity);
            return res._id;
        }
        catch (err) {
            logger.error(messages.error.products.UPDATE_ERROR + err.message);
            throw new Error(messages.error.products.UPDATE_ERROR + err.message);
        }
    }

    getProductOwner = async (id) => {
        try {
            const owner = await this.dao.getProductOwner(id);
            return owner;
        }
        catch (err) {
            logger.error(messages.error.products.GET_ERROR + err.message);
            throw new Error(messages.error.products.GET_ERROR + err.message);
        }
    }
}