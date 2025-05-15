import { Response, Request } from "express"
import { handleError, isValidObjectId } from '../utils/auth.utils'
import PurchaseItem from '../models/purchaseItem.models'
import { IPurchaseItem } from "../types/inventory"

// Get all purchaseItems
export const getPurchaseItem = async (_req: Request, res: Response): Promise<void> => {
    try {
        //Use lean() for better performance when you don't want
        // need full mongoose documents
        const PurchaseItems = await PurchaseItem.find().lean()
        res.status(200).json({
            message: 'Cannot find purchaseItem',
            purchaseItem: PurchaseItems
        })
    } catch (error) {
        handleError(res, error)
    }
}

//Get purchaseItem by ID
export const getCurrentPurchaseItem = async (req: Request, res: Response): Promise<void> => {
    try {
        const {id} = req.params

        if (!id) {
            res.status(400).json({ message: 'Purchase Item Id is required' });
            return;
        }

        const purchaseItem = await PurchaseItem.findById(id).lean();
        if (!purchaseItem) {
            res.status(404).json({ message: 'Purchase Item not found' });
            return;
        }

        res.status(200).json(purchaseItem);
    } catch (error) {
        handleError(res, error);
    }
}

// create new purchaseItem
export const createPurchaseItem = async ( req: Request, res: Response): Promise<void> => {
    try {
        const { purchase, product, quantity, price } = req.body
        
        const newPurchaseItem = await PurchaseItem.create({ purchase, product, quantity, price})
        res.status(201).json({
            message: 'Purchase Item created successfully.',
            purchaseItem: newPurchaseItem
        })
    } catch (error){
        handleError(res, error)
    }
}

//Update purchaseItem
export const updatePurchaseItem = async ( req: Request, res: Response): Promise<void> => {
    try {
        const {id} = req.params
        const { purchase, product, quantity, price } = req.body
        if (!isValidObjectId(id, res)) return
        //Ensure at least one update field is provided
        if (!purchase && !product && !quantity && !price ) {
            res.status(400).json({ message: 'No update fields provided'})
            return
        }
        //Build update object dynamically
        const updateData: Partial<IPurchaseItem> = {}
        if (purchase) updateData.purchase = purchase
        if (product) updateData.product = product
        if (quantity) updateData.quantity = quantity
        if (price) updateData.price = price
    
       
        const updatedPurchaseItem = await PurchaseItem.findByIdAndUpdate(id, updateData,{
            new: true,
            runValidators: true,
        })
        .lean()
        if (!updatedPurchaseItem) {
            res.status(404).json ({ message: 'Purchase Item not found'})
            return
        }
        res.status(200).json(updatedPurchaseItem)
    } catch (error) {
        handleError(res, error)
    }
}

//Delete purchaseItem
export const deletePurchaseItem = async ( req: Request, res: Response): Promise<void> => {
    try {
        const {id} = req.params
        if (!isValidObjectId(id, res)) return
        const deletePurchaseItem = await PurchaseItem.findByIdAndDelete(id).lean()
        if (!deletePurchaseItem) {
            res.status(404).json({ message: 'Purchase Item not found'})
            return
        }
        res.status(200).json({ message: 'Purchase Item deleted successfully'})
    } catch (error) {
        handleError(res, error)
    }
}
