import { Router } from "express"
import { createPurchase, deletePurchase, getCurrentPurchase, getPurchases, updatePurchase } from "../controllers/purchase.controllers"



const router = Router ()

// Get all Purchase
router.get('/', getPurchases)


// Get by Purchase Id
router.get('/:id', getCurrentPurchase)


// Create new purchase
router.post('/', createPurchase)


// Update by Purchase Id
router.put('/:id', updatePurchase )


// Delete by Purchase Id
router.delete('/:id', deletePurchase)

export default router