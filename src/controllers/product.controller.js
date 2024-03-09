import { ProductService } from '../repositories/index.js';
import CustomError from '../utils/errors/custom.errors.js';
import { logger } from '../utils/logger.js';
import { isValid24HexString } from '../utils.js';
import messages from '../resources/messages.js';

export const getProducts = async (req, res) => {
    const { limit, page, sort, query } = req.query;
    const products = await ProductService.getProducts(limit, page, sort, query);
    
    return res.sendSuccess(products);
};

export const getProductById = async (req, res, next) => {
    const pid = req.params.pid;
   
    if (!isValid24HexString(pid)) return res.sendBadRequest(messages.error.all.INVALID_ID);
    
    try {
        const product = await ProductService.getProductById(pid);
        return res.sendSuccess(product);
    }
    catch(error) {
        next(error);
    }
    
};

export const addProduct = async (req, res, next) => {
    const data = req.body;

    try {
        if(!data.title || !data.price || !data.stock || !data.thumbnail || !data.code || !data.description || !data.category) {
            CustomError.createProduct(data);
        }

        const user = req.user;
        
        if(!user) {
            throw new Error("User is null or undefined.");
        }
        
        if(user.role !== "ADMIN_ROLE" && user.role !== "PREMIUM_ROLE") {
            throw new Error(messages.error.product.INVALID_ROLE_ADD);
        }

        data.owner = user?.role === "ADMIN_ROLE" ? 'admin' : user.email;
  
        const addProductRes = await ProductService.addProduct(data);
        return res.sendSuccess(addProductRes);
    }
    catch(error) {
        next(error);
    }
};

export const updateProduct = async (req, res, next) => {
    const pid = req.params.pid;
    const data = req.body;

    try {
        const updateProductRes = await ProductService.updateProduct(pid, data);
        return res.sendSuccess(updateProductRes);
    }
    catch(error) {
        next(error);
    }
   
};

export const deleteProduct = async (req, res, next) => {
    const pid = req.params.pid;
    
    try {
        if(!pid) {
            CustomError.deleteProduct();
        }

        const pOwner = await ProductService.getProductOwner(pid);

        if(pOwner.owner !== req.user.email && req.user.role !== "ADMIN_ROLE") {
            throw new Error(messages.error.product.INVALID_USER_DELETE); 
        }

        const deleteProductRes = await ProductService.deleteProduct(pid);
        return res.sendSuccess(deleteProductRes);
    }
    catch(error) {
        next(error);
    }
};