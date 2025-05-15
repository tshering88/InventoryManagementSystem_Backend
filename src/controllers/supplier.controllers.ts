import { Response, Request } from "express"
import { handleError, isValidObjectId } from '../utils/auth.utils'
import Supplier from '../models/supplier.models'
import { ISupplier } from "../types/inventory"

// Get all Suppliers
export const getSuppliers = async (_req: Request, res: Response): Promise<void> => {
    try {
        //Use lean() for better performance when you don't want
        // need full mongoose documents
        const Suppliers = await Supplier.find().lean()
        res.status(200).json({
            message: 'Cannot find Supplier',
            Supplier: Suppliers
        })
    } catch (error) {
        handleError(res, error)
    }
}

//Get Supplier by ID
export const getCurrentSupplier = async (req: Request, res: Response): Promise<void> => {
    try {
        const {id} = req.params;

        if (!id) {
            res.status(400).json({ message: 'Supplier ID is required' });
            return;
        }

        const supplier = await Supplier.findById(id).lean();
        if (!supplier) {
            res.status(404).json({ message: 'Supplier not found' });
            return;
        }

        res.status(200).json(supplier);
    } catch (error) {
        handleError(res, error);
    }
}

// create new Supplier
export const createSupplier = async ( req: Request, res: Response): Promise<void> => {
    try {
        const { name, contactInfo, address } = req.body

        const newSupplier = await Supplier.create({ name, contactInfo, address })
        res.status(201).json({
            message: 'Supplier created successfully.',
            Supplier: newSupplier
        })
    } catch (error){
        handleError(res, error)
    }
}

//Update Supplier
export const updateSupplier = async ( req: Request, res: Response): Promise<void> => {
    try {
        const {id} = req.params;
        const { name, contactInfo, address } = req.body
        if (!isValidObjectId(id, res)) return
        //Ensure at least one update field is provided
        if (!name && !contactInfo && !address) {
            res.status(400).json({ message: 'No update fields provided'})
            return
        }
        //Build update object dynamically
        const updateData: Partial<ISupplier> = {}
        if (name) updateData.name = name
        if (contactInfo) updateData.contactInfo = contactInfo
        if (address) updateData.address = address

       
        const updatedSupplier = await Supplier.findByIdAndUpdate(id, updateData,{
            new: true,
            runValidators: true,
        })
        .lean()
        if (!updatedSupplier) {
            res.status(404).json ({ message: 'Supplier not found'})
            return
        }
        res.status(200).json(updatedSupplier)
    } catch (error) {
        handleError(res, error)
    }
}

//Delete Supplier
export const deleteSupplier = async ( req: Request, res: Response): Promise<void> => {
    try {
        const {id} = req.params;
        if (!isValidObjectId(id, res)) return
        const deleteSupplier = await Supplier.findByIdAndDelete(id).lean()
        if (!deleteSupplier) {
            res.status(404).json({ message: 'Supplier not found'})
            return
        }
        res.status(200).json({ message: 'Supplier deleted successfully'})
    } catch (error) {
        handleError(res, error)
    }
}
