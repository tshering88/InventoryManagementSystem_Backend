import { Response, Request } from "express"
import { handleError, isValidObjectId } from '../utils/auth.utils'
import Stock from '../models/stock.models'
import { IStock } from "../types/inventory"

// Get all Stocks
export const getStock = async (_req: Request, res: Response): Promise<void> => {
    try {
        //Use lean() for better performance when you don't want
        // need full mongoose documents
        const Stocks = await Stock.find().lean()
        res.status(200).json({
            message: 'Cannot find Stock',
            Stock: Stocks
        })
    } catch (error) {
        handleError(res, error)
    }
}

//Get Stock by ID
export const getCurrentStock = async (req: Request, res: Response): Promise<void> => {
    try {
        const {id} = req.params;

        if (!id) {
            res.status(400).json({ message: 'Stock Id is required' });
            return;
        }

        const stock = await Stock.findById(id).lean();
        if (!Stock) {
            res.status(404).json({ message: 'Stock not found' });
            return;
        }

        res.status(200).json(stock);
    } catch (error) {
        handleError(res, error);
    }
}

// create new Stock
export const createStock = async ( req: Request, res: Response): Promise<void> => {
    try {
        const { product, warehouse, quantity } = req.body
         
        const newStock = await Stock.create({ product, warehouse, quantity  })
        res.status(201).json({
            message: 'Stock created successfully.',
            Stock: newStock
        })
    } catch (error){
        handleError(res, error)
    }
}

//Update Stock
export const updateStock = async ( req: Request, res: Response): Promise<void> => {
    try {
        const {id} = req.params;
        const { product, warehouse, quantity  } = req.body
        if (!isValidObjectId(id, res)) return
        //Ensure at least one update field is provided
        if (!product && !warehouse && !quantity  ) {
            res.status(400).json({ message: 'No update fields provided'})
            return
        }
        //Build update object dynamically
        const updateData: Partial<IStock> = {}
        if (product) updateData.product = product
        if (warehouse) updateData.warehouse = warehouse
        if (quantity) updateData.quantity = quantity

    
       
        const updatedStock = await Stock.findByIdAndUpdate(id, updateData,{
            new: true,
            runValidators: true,
        })
        .lean()
        if (!updatedStock) {
            res.status(404).json ({ message: 'Stock not found'})
            return
        }
        res.status(200).json(updatedStock)
    } catch (error) {
        handleError(res, error)
    }
}

//Delete Stock
export const deleteStock = async ( req: Request, res: Response): Promise<void> => {
    try {
        const {id} = req.params;
        if (!isValidObjectId(id, res)) return
        const deleteStock = await Stock.findByIdAndDelete(id).lean()
        if (!deleteStock) {
            res.status(404).json({ message: 'Stock not found'})
            return
        }
        res.status(200).json({ message: 'Stock deleted successfully'})
    } catch (error) {
        handleError(res, error)
    }
}
