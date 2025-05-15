import { Router } from "express"
import { createSupplier, deleteSupplier, getCurrentSupplier, getSuppliers, updateSupplier } from "../controllers/supplier.controllers"


const router = Router ()

// Get all Suppliers
router.get('/', getSuppliers)


// Get by Supplier Id
router.get('/:id', getCurrentSupplier)


// Create new Supplier
router.post('/', createSupplier)


// Update by Supplier Id
router.put('/:id', updateSupplier )


// Delete by Supplier Id
router.delete('/:id', deleteSupplier )


export default router