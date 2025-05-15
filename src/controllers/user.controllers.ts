import bcrypt from 'bcrypt'
import { Response, Request } from "express"
import { handleError, isValidObjectId } from '../utils/auth.utils'
import User from '../models/user.models'
import { IUser } from '../types/inventory'


//Get by user ID
export const getCurrentUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const {id} = req.params;

        if (!id) {
            res.status(400).json({ message: 'User ID is required' });
            return;
        }

        const user = await User.findById(id).select('-passwordHash').lean();
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        res.status(200).json(user);
    } catch (error) {
        handleError(res, error);
    }
}


//Create new user
export const createUser = async ( req: Request, res: Response): Promise<void> => {
    try {
        const { name, email, role, password } = req.body
        const existingUser = await User.findOne({ email }).select('_id').lean()
        if ( existingUser) {
            res.status(409).json({ message: 'Email already exists'})
            return
        }
        const passwordHash = await bcrypt.hash(password, 10)
        const newUser = await User.create({ name, email, role, passwordHash})
        res.status(201).json({
            message: 'User created successfully.',
            user: newUser
        })
    } catch (error){
        handleError(res, error)
    }
}


//Update my profile
export const updateMyProfile = async ( req: Request, res: Response): Promise<void> => {
    try {
        const {id} = req.params;
        const { name, email, password, role } = req.body
        if (!isValidObjectId(id, res)) return
        //Ensure at least one update field is provided
        if (!name && !email && !password && !role) {
            res.status(400).json({ message: 'No update fields provided'})
            return
        }
        //Build update object dynamically
        const updateData: Partial<IUser> = {}
        if (name) updateData.name = name
        if (email) updateData.email = email
        if (password) updateData.passwordHash = password
        if (role) updateData.role = role
       
        const updatedUser = await User.findByIdAndUpdate(id, updateData,{
            new: true,
            runValidators: true,
        })
        .select('-passwordHash')
        .lean()
        if (!updatedUser) {
            res.status(404).json ({ message: 'User not found'})
            return
        }
        res.status(200).json(updatedUser)
    } catch (error) {
        handleError(res, error)
    }
}


