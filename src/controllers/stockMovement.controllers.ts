import { Response, Request } from "express"
import { handleError, isValidObjectId } from '../utils/auth.utils'
import StockMovement from '../models/stockMovement.models'
import { IStockMovement } from "../types/inventory"

// Get all StockMovements
export const getStockMovement = async (_req: Request, res: Response): Promise<void> => {
    try {
        //Use lean() for better performance when you don't want
        // need full mongoose documents
        const StockMovements = await StockMovement.find().lean()
        res.status(200).json({
            message: 'Cannot find Stock Movement',
            StockMovement: StockMovements
        })
    } catch (error) {
        handleError(res, error)
    }
}

//Get StockMovement by ID
export const getCurrentStockMovement = async (req: Request, res: Response): Promise<void> => {
    try {
        const {id} = req.params;

        if (!id) {
            res.status(400).json({ message: 'Stock Movement Id is required' });
            return;
        }

        const stockMovement = await StockMovement.findById(id).lean();
        if (!StockMovement) {
            res.status(404).json({ message: 'Stock Movement not found' });
            return;
        }

        res.status(200).json(stockMovement);
    } catch (error) {
        handleError(res, error);
    }
}

// create new StockMovement
export const createStockMovement = async ( req: Request, res: Response): Promise<void> => {
    try {
        const { product, source, destination, quantity, date } = req.body
         
        const newStockMovement = await StockMovement.create({ product, source, destination, quantity, date  })
        res.status(201).json({
            message: 'Stock Movement created successfully.',
            StockMovement: newStockMovement
        })
    } catch (error){
        handleError(res, error)
    }
}

//Update StockMovement
export const updateStockMovement = async ( req: Request, res: Response): Promise<void> => {
    try {
        const {id} = req.params;
        const { product, source, destination, quantity, date  } = req.body
        if (!isValidObjectId(id, res)) return
        //Ensure at least one update field is provided
        if ( !product && !source && !destination && !quantity && !date  ) {
            res.status(400).json({ message: 'No update fields provided'})
            return
        }
        //Build update object dynamically
        const updateData: Partial<IStockMovement> = {}
        if (product) updateData.product = product
        if (source) updateData.source = source
        if (destination) updateData.destination = destination
        if (quantity) updateData.quantity = quantity
        if (date) updateData.date = date

    
       
        const updatedStockMovement = await StockMovement.findByIdAndUpdate(id, updateData,{
            new: true,
            runValidators: true,
        })
        .lean()
        if (!updatedStockMovement) {
            res.status(404).json ({ message: 'Stock Movement not found'})
            return
        }
        res.status(200).json(updatedStockMovement)
    } catch (error) {
        handleError(res, error)
    }
}

//Delete StockMovement
export const deleteStockMovement = async ( req: Request, res: Response): Promise<void> => {
    try {
        const {id} = req.params;
        if (!isValidObjectId(id, res)) return
        const deleteStockMovement = await StockMovement.findByIdAndDelete(id).lean()
        if (!deleteStockMovement) {
            res.status(404).json({ message: 'Stock Movement not found'})
            return
        }
        res.status(200).json({ message: 'Stock Movement deleted successfully'})
    } catch (error) {
        handleError(res, error)
    }
}
