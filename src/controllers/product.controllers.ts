import { Response, Request } from "express"
import { handleError, isValidObjectId } from '../utils/auth.utils'
import Product from '../models/product.models'
import { IProduct } from "../types/inventory"

// Get all Products
export const getProducts = async (_req: Request, res: Response): Promise<void> => {
    try {
        //Use lean() for better performance when you don't want
        // need full mongoose documents
        const Products = await Product.find().lean()
        res.status(200).json({
            message: 'Cannot find product',
            product: Products
        })
    } catch (error) {
        handleError(res, error)
    }
}

//Get Product by ID
export const getCurrentProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        const {id} = req.params;

        if (!id) {
            res.status(400).json({ message: 'Product ID is required' });
            return;
        }

        const product = await Product.findById(id).lean();
        if (!product) {
            res.status(404).json({ message: 'Product not found' });
            return;
        }

        res.status(200).json(product);
    } catch (error) {
        handleError(res, error);
    }
}

// create new product
export const createProduct = async ( req: Request, res: Response): Promise<void> => {
    try {
        const { name, description, sku, price, quantity } = req.body
         const existingSku = await Product.findOne({ sku }).lean()
                if ( existingSku) {
                    res.status(409).json({ message: 'Email already exists'})
                    return
                }
        const newProduct = await Product.create({ name, description, sku, price, quantity })
        res.status(201).json({
            message: 'Product created successfully.',
            product: newProduct
        })
    } catch (error){
        handleError(res, error)
    }
}

//Update Product
export const updateProduct = async ( req: Request, res: Response): Promise<void> => {
    try {
        const {id} = req.params;
        const { name, description, sku, price, quantity } = req.body
        if (!isValidObjectId(id, res)) return
        //Ensure at least one update field is provided
        if (!name && !description&& !sku && !price && !quantity) {
            res.status(400).json({ message: 'No update fields provided'})
            return
        }
        //Build update object dynamically
        const updateData: Partial<IProduct> = {}
        if (name) updateData.name = name
        if (description) updateData.description = description
        if (sku) updateData.sku = sku
        if (price) updateData.price = price
        if (quantity) updateData.quantity = quantity
       
        const updatedProduct = await Product.findByIdAndUpdate(id, updateData,{
            new: true,
            runValidators: true,
        })
        .lean()
        if (!updatedProduct) {
            res.status(404).json ({ message: 'Product not found'})
            return
        }
        res.status(200).json(updatedProduct)
    } catch (error) {
        handleError(res, error)
    }
}

//Delete Product
export const deleteProduct = async ( req: Request, res: Response): Promise<void> => {
    try {
        const {id} = req.params;
        if (!isValidObjectId(id, res)) return
        const deleteProduct = await Product.findByIdAndDelete(id).lean()
        if (!deleteProduct) {
            res.status(404).json({ message: 'Product not found'})
            return
        }
        res.status(200).json({ message: 'Product deleted successfully'})
    } catch (error) {
        handleError(res, error)
    }
}
