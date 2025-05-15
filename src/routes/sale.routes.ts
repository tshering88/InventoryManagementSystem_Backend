import { Router } from "express"
import { createSale, deleteSale, getCurrentSale, getSale, updateSale } from "../controllers/sale.controllers"


const router = Router ()

// Get all Sale
router.get('/', getSale)


// Get by Sale Id
router.get('/:id', getCurrentSale)


// Create new sale
router.post('/', createSale)


// Update by Sale Id
router.put('/:id', updateSale )


// Delete by Sale Id
router.delete('/:id', deleteSale)

export default router