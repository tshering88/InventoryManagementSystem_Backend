import { Router } from "express";
import { register, login, getProile, updateUser } from "../controllers/auth.controllers";
import { authenticate, authorize } from "../middleware/auth.middleware";


const router = Router()

router.post('/register', register)

router.post('/login', login)

router.get('/profile', authenticate, getProile)


router.put('/profile/:id', authenticate, updateUser)

// Only admin can access this 
router.get('/admin-data', authenticate, authorize(['admin']),
(_req, res) => {
    res.status(200).json({ message: 'Admin-only content'})
})


// Only manager or admin can access this
router.get(
    '/manager-data',
    authenticate, authorize(['manager']),
    (_req, res) => {
        res.status(200).json({ message: 'Manager/Admin content'})
    }
)


// Admin, manager and staff can access this
router.get('/staff-data', authenticate, authorize(['staff']),
(_req, res) => {
    res.status(200).json({ message: 'staff/Manager/Admin content' })
})

export default router