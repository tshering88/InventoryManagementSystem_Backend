import { Router } from "express"
import { createUser, getCurrentUser, updateMyProfile } from '../controllers/user.controllers'

const router = Router ()


// Get by User Id
router.get('/:id', getCurrentUser)


// Create new User
router.post('/', createUser)


// Update by User Id
router.put('/:id', updateMyProfile )


export default router