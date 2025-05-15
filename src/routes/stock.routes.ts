import { Router } from "express"
import { createStock, deleteStock, getCurrentStock, getStock, updateStock } from "../controllers/stock.controllers"



const router = Router ()

// Get all Stock
router.get('/', getStock)


// Get by Stock Id
router.get('/:id', getCurrentStock)


// Create new Stock
router.post('/', createStock)


// Update by Stock Id
router.put('/:id', updateStock )


// Delete by Stock Id
router.delete('/:id', deleteStock)

export default router