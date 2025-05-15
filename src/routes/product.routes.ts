import { Router } from "express"
import { createProduct, deleteProduct, getCurrentProduct, getProducts, updateProduct } from "../controllers/product.controllers"


const router = Router ()

// Get all Products
router.get('/', getProducts)


// Get by Product Id
router.get('/:id', getCurrentProduct)


//Crete new Product
router.post('/', createProduct)


// Update by Product Id
router.put('/:id', updateProduct )


// Delete by Product Id
router.delete('/:id', deleteProduct )

export default router