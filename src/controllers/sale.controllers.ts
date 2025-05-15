import { Response, Request } from "express"
import { handleError, isValidObjectId } from '../utils/auth.utils'
import Sale from '../models/sale.models'
import { ISale } from "../types/inventory"

// Get all sales
export const getSale = async (_req: Request, res: Response): Promise<void> => {
    try {
        //Use lean() for better performance when you don't want
        // need full mongoose documents
        const sales = await Sale.find().lean()
        res.status(200).json({
            message: 'Cannot find sale',
            sale: sales
        })
    } catch (error) {
        handleError(res, error)
    }
}

//Get sale by ID
export const getCurrentSale = async (req: Request, res: Response): Promise<void> => {
    try {
        const {id} = req.params

        if (!id) {
            res.status(400).json({ message: 'Sale Id is required' });
            return;
        }

        const sale = await Sale.findById(id).lean();
        if (!sale) {
            res.status(404).json({ message: 'Sale not found' });
            return;
        }

        res.status(200).json(sale);
    } catch (error) {
        handleError(res, error);
    }
}

// create new sale
export const createSale = async ( req: Request, res: Response): Promise<void> => {
    try {
        const { customer, date, totalAmount, status } = req.body
         
        const newsale = await Sale.create({ customer, date, totalAmount, status })
        res.status(201).json({
            message: 'Sale created successfully.',
            sale: newsale
        })
    } catch (error){
        handleError(res, error)
    }
}

//Update sale
export const updateSale = async ( req: Request, res: Response): Promise<void> => {
    try {
        const {id} = req.params;
        const { customer, date, totalAmount, status } = req.body
        if (!isValidObjectId(id, res)) return
        //Ensure at least one update field is provided
        if (!customer && !date && !totalAmount && !status ) {
            res.status(400).json({ message: 'No update fields provided'})
            return
        }
        //Build update object dynamically
        const updateData: Partial<ISale> = {}
        if (customer) updateData.customer = customer
        if (date) updateData.date = date
        if (totalAmount) updateData.totalAmount = totalAmount
        if (status) updateData.status = status
    
       
        const updatedSale = await Sale.findByIdAndUpdate(id, updateData,{
            new: true,
            runValidators: true,
        })
        .lean()
        if (!updatedSale) {
            res.status(404).json ({ message: 'Sale not found'})
            return
        }
        res.status(200).json(updatedSale)
    } catch (error) {
        handleError(res, error)
    }
}

//Delete sale
export const deleteSale = async ( req: Request, res: Response): Promise<void> => {
    try {
        const {id} = req.params;
        if (!isValidObjectId(id, res)) return
        const deletesale = await Sale.findByIdAndDelete(id).lean()
        if (!deletesale) {
            res.status(404).json({ message: 'Sale not found'})
            return
        }
        res.status(200).json({ message: 'Sale deleted successfully'})
    } catch (error) {
        handleError(res, error)
    }
}
