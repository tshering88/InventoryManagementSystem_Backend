import { Router } from "express"
import { createPurchaseItem, deletePurchaseItem, getCurrentPurchaseItem, getPurchaseItem, updatePurchaseItem } from "../controllers/purchaseItem.controllers"


const router = Router ()

// Get all PurchaseItem
router.get('/', getPurchaseItem)

// Get by PurchaseItem Id
router.get('/:id', getCurrentPurchaseItem)


// Create ne PurchaseItem
router.post('/', createPurchaseItem)


// Update by PurchaseItem Id
router.put('/:id', updatePurchaseItem )


// Delete by PurchaseItem Id
router.delete('/:id', deletePurchaseItem)

export default router