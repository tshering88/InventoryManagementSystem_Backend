import { Response, Request } from "express"
import { handleError, isValidObjectId } from '../utils/auth.utils'
import Category from '../models/category.models'
import { ICategory } from "../types/inventory"

// Get all categorys
export const getCategorys = async (_req: Request, res: Response): Promise<void> => {
    try {
        //Use lean() for better performance when you don't want
        // need full mongoose documents
        const categorys = await Category.find().lean()
        res.status(200).json({
            message: 'Cannot find category',
            category: categorys
        })
    } catch (error) {
        handleError(res, error)
    }
}

//Get category by ID
export const getCurrentCategory = async (req: Request, res: Response): Promise<void> => {
    try {
        const {id} = req.params;

        if (!id) {
            res.status(400).json({ message: 'category ID is required' });
            return;
        }

        const category = await Category.findById(id).lean();
        if (!category) {
            res.status(404).json({ message: 'category not found' });
            return;
        }

        res.status(200).json(category);
    } catch (error) {
        handleError(res, error);
    }
}

// create new category
export const createCategory = async ( req: Request, res: Response): Promise<void> => {
    try {
        const { name, description } = req.body
        
        const newCategory = await Category.create({ name, description })
        res.status(201).json({
            message: 'category created successfully.',
            category: newCategory
        })
    } catch (error){
        handleError(res, error)
    }
}

//Update category
export const updateCategory = async ( req: Request, res: Response): Promise<void> => {
    try {
        const {id} = req.params;
        const { name, description } = req.body
        if (!isValidObjectId(id, res)) return
        //Ensure at least one update field is provided
        if (!name && !description) {
            res.status(400).json({ message: 'No update fields provided'})
            return
        }
        //Build update object dynamically
        const updateData: Partial<ICategory> = {}
        if (name) updateData.name = name
        if (description) updateData.description = description
       
       
        const updatedCategory = await Category.findByIdAndUpdate(id, updateData,{
            new: true,
            runValidators: true,
        })
        .lean()
        if (!updatedCategory) {
            res.status(404).json ({ message: 'category not found'})
            return
        }
        res.status(200).json(updatedCategory)
    } catch (error) {
        handleError(res, error)
    }
}

//Delete category
export const deleteCategory = async ( req: Request, res: Response): Promise<void> => {
    try {
        const {id} = req.params;
        if (!isValidObjectId(id, res)) return
        const deleteCategory = await Category.findByIdAndDelete(id).lean()
        if (!deleteCategory) {
            res.status(404).json({ message: 'category not found'})
            return
        }
        res.status(200).json({ message: 'category deleted successfully'})
    } catch (error) {
        handleError(res, error)
    }
}
