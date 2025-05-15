import { Response, Request } from "express"
import { handleError, isValidObjectId } from '../utils/auth.utils'
import Warehouse from '../models/warehouse.models'
import { IWarehouse } from "../types/inventory"

// Get all Warehouses
export const getWarehouse = async (_req: Request, res: Response): Promise<void> => {
    try {
        //Use lean() for better performance when you don't want
        // need full mongoose documents
        const Warehouses = await Warehouse.find().lean()
        res.status(200).json({
            message: 'Cannot find Warehouse',
            Warehouse: Warehouses
        })
    } catch (error) {
        handleError(res, error)
    }
}

//Get Warehouse by ID
export const getCurrentWarehouse = async (req: Request, res: Response): Promise<void> => {
    try {
        const {id} = req.params;

        if (!id) {
            res.status(400).json({ message: 'Warehouse Id is required' });
            return;
        }

        const warehouse = await Warehouse.findById(id).lean();
        if (!Warehouse) {
            res.status(404).json({ message: 'Warehouse not found' });
            return;
        }

        res.status(200).json(warehouse);
    } catch (error) {
        handleError(res, error);
    }
}

// create new Warehouse
export const createWarehouse = async ( req: Request, res: Response): Promise<void> => {
    try {
        const { name, location, capacity } = req.body
         
        const newWarehouse = await Warehouse.create({ name, location, capacity   })
        res.status(201).json({
            message: 'Warehouse created successfully.',
            Warehouse: newWarehouse
        })
    } catch (error){
        handleError(res, error)
    }
}

//Update Warehouse
export const updateWarehouse = async ( req: Request, res: Response): Promise<void> => {
    try {
        const {id} = req.params;
        const { name, location, capacity   } = req.body
        if (!isValidObjectId(id, res)) return
        //Ensure at least one update field is provided
        if ( !name && !location && !capacity ) {
            res.status(400).json({ message: 'No update fields provided'})
            return
        }
        //Build update object dynamically
        const updateData: Partial<IWarehouse> = {}
        if (name) updateData.name = name
        if (location) updateData.location = location
        if (capacity) updateData.capacity = capacity

    
       
        const updatedWarehouse = await Warehouse.findByIdAndUpdate(id, updateData,{
            new: true,
            runValidators: true,
        })
        .lean()
        if (!updatedWarehouse) {
            res.status(404).json ({ message: 'Warehouse not found'})
            return
        }
        res.status(200).json(updatedWarehouse)
    } catch (error) {
        handleError(res, error)
    }
}

//Delete Warehouse
export const deleteWarehouse = async ( req: Request, res: Response): Promise<void> => {
    try {
        const {id} = req.params;
        if (!isValidObjectId(id, res)) return
        const deleteWarehouse = await Warehouse.findByIdAndDelete(id).lean()
        if (!deleteWarehouse) {
            res.status(404).json({ message: 'Warehouse not found'})
            return
        }
        res.status(200).json({ message: 'Warehouse deleted successfully'})
    } catch (error) {
        handleError(res, error)
    }
}
