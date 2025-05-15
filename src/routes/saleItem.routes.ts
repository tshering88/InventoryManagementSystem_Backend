import { Router } from "express"
import { createSaleItem, deleteSaleItem, getCurrentSaleItem, getSaleItem, updateSaleItem } from "../controllers/saleItem.controllers"





const router = Router ()

// Get all Sale Item
router.get('/', getSaleItem)


// Get by Sale Item Id
router.get('/:id', getCurrentSaleItem)


// Create new Sale Item
router.post('/', createSaleItem)


// Update by Sale Item Id
router.put('/:id', updateSaleItem )


// Delete by Sale Item Id
router.delete('/:id', deleteSaleItem)

export default router