import { Router } from "express"
import { createStockMovement, deleteStockMovement, getCurrentStockMovement, getStockMovement, updateStockMovement } from "../controllers/stockMovement.controllers"




const router = Router ()

// Get all Stock Movement
router.get('/', getStockMovement)


// Get by Stock Movement Id
router.get('/:id', getCurrentStockMovement)


// Create new Stock Movement
router.post('/', createStockMovement)


// Update by Stock Movement Id
router.put('/:id', updateStockMovement )


// Delete by Stock Movement Id
router.delete('/:id', deleteStockMovement)

export default router