import { Response, Request } from "express"
import { handleError, isValidObjectId } from '../utils/auth.utils'
import SaleItem from '../models/saleItem.models'
import { ISaleItem } from "../types/inventory"

// Get all Sale Items
export const getSaleItem = async (_req: Request, res: Response): Promise<void> => {
    try {
        //Use lean() for better performance when you don't want
        // need full mongoose documents
        const SaleItems = await SaleItem.find().lean()
        res.status(200).json({
            message: 'Cannot find Sale Item',
            saleItem: SaleItems
        })
    } catch (error) {
        handleError(res, error)
    }
}

//Get Sale Item by ID
export const getCurrentSaleItem = async (req: Request, res: Response): Promise<void> => {
    try {
        const {id} = req.params;

        if (!id) {
            res.status(400).json({ message: 'Sale Item Id is required' });
            return;
        }

        const saleItem = await SaleItem.findById(id).lean();
        if (!saleItem) {
            res.status(404).json({ message: 'Sale Item not found' });
            return;
        }

        res.status(200).json(saleItem);
    } catch (error) {
        handleError(res, error);
    }
}

// create new saleItem
export const createSaleItem = async ( req: Request, res: Response): Promise<void> => {
    try {
        const { sale, product, quantity, price } = req.body

        const newsaleItem = await SaleItem.create({ sale, product, quantity, price })
        res.status(201).json({
            message: 'Sale Item created successfully.',
            saleItem: newsaleItem
        })
    } catch (error){
        handleError(res, error)
    }
}

//Update saleItem
export const updateSaleItem = async ( req: Request, res: Response): Promise<void> => {
    try {
        const {id} = req.params;
        const { sale, product, quantity, price } = req.body
        if (!isValidObjectId(id, res)) return
        //Ensure at least one update field is provided
        if (!sale && !product && !quantity && !price ) {
            res.status(400).json({ message: 'No update fields provided'})
            return
        }
        //Build update object dynamically
        const updateData: Partial<ISaleItem> = {}
        if (sale) updateData.sale = sale
        if (product) updateData.product = product
        if (quantity) updateData.quantity = quantity
        if (price) updateData.price = price
    
       
        const updatedsaleItem = await SaleItem.findByIdAndUpdate(id, updateData,{
            new: true,
            runValidators: true,
        })
        .lean()
        if (!updatedsaleItem) {
            res.status(404).json ({ message: 'Sale Item not found'})
            return
        }
        res.status(200).json(updatedsaleItem)
    } catch (error) {
        handleError(res, error)
    }
}

//Delete saleItem
export const deleteSaleItem = async ( req: Request, res: Response): Promise<void> => {
    try {
        const {id} = req.params;
        if (!isValidObjectId(id, res)) return
        const deletesaleItem = await SaleItem.findByIdAndDelete(id).lean()
        if (!deletesaleItem) {
            res.status(404).json({ message: 'Sale Item not found'})
            return
        }
        res.status(200).json({ message: 'Sale Item deleted successfully'})
    } catch (error) {
        handleError(res, error)
    }
}
