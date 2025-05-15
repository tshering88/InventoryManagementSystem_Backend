import { Response, Request } from "express"
import { handleError, isValidObjectId } from '../utils/auth.utils'
import Purchase from '../models/purchase.models'
import { IPurchase } from "../types/inventory"

// Get all purchases
export const getPurchases = async (_req: Request, res: Response): Promise<void> => {
    try {
        //Use lean() for better performance when you don't want
        // need full mongoose documents
        const Purchases = await Purchase.find().lean()
        res.status(200).json({
            message: 'Cannot find purchase',
            purchase: Purchases
        })
    } catch (error) {
        handleError(res, error)
    }
}

//Get purchase by ID
export const getCurrentPurchase = async (req: Request, res: Response): Promise<void> => {
    try {
        const {id} = req.params;
        console.log(id)

        if (!id) { 
            res.status(400).json({ message: 'Purchase ID is required' });
            return;
        }

        const purchase = await Purchase.findById(id).lean();
        if (!purchase) {
            res.status(404).json({ message: 'Purchase not found' });
            return;
        }

        res.status(200).json(purchase);
    } catch (error) {
        handleError(res, error);
    }
}

// create new purchase
export const createPurchase = async ( req: Request, res: Response): Promise<void> => {
    try {
        const { supplier, date, totalAmount, status } = req.body
        
        const newPurchase = await Purchase.create({ supplier, date, totalAmount, status })
        res.status(201).json({
            message: 'Purchase created successfully.',
            purchase: newPurchase
        })
    } catch (error){
        handleError(res, error)
    }
}

//Update purchase
export const updatePurchase = async ( req: Request, res: Response): Promise<void> => {
    try {
        const {id} = req.params;
        console.log(id)
        const { supplier, date, totalAmount, status} = req.body
        if (!isValidObjectId(id, res)) return
        //Ensure at least one update field is provided
        if (!supplier && !date && !totalAmount && !status ) {
            res.status(400).json({ message: 'No update fields provided'})
            return
        }
        //Build update object dynamically
        const updateData: Partial<IPurchase> = {}
        if (supplier) updateData.supplier = supplier
        if (date) updateData.date = date
        if (totalAmount) updateData.totalAmount = totalAmount
        if (status) updateData.status = status
    
       
        const updatedPurchase = await Purchase.findByIdAndUpdate(id, updateData,{
            new: true,
            runValidators: true,
        })
        .lean()
        if (!updatedPurchase) {
            res.status(404).json ({ message: 'Purchase not found'})
            return
        }
        res.status(200).json(updatedPurchase)
    } catch (error) {
        handleError(res, error)
    }
}

//Delete purchase
export const deletePurchase = async ( req: Request, res: Response): Promise<void> => {
    try {
        const {id} = req.params
        if (!isValidObjectId(id, res)) return
        const deletePurchase = await Purchase.findByIdAndDelete(id).lean()
        if (!deletePurchase) {
            res.status(404).json({ message: 'Purchase not found'})
            return
        }
        res.status(200).json({ message: 'Purchase deleted successfully'})
    } catch (error) {
        handleError(res, error)
    }
}
