import { Router } from "express"
import {  } from "../controllers/product.controllers"
import { createCategory, deleteCategory, getCategorys, getCurrentCategory, updateCategory } from "../controllers/category.controllers"


const router = Router ()

// Get all categorys
router.get('/', getCategorys)

// Get by categorys Id
router.get('/:id', getCurrentCategory)

// Create new Category
router.post('/', createCategory)

// Update by categorys Id
router.put('/:id', updateCategory )

// Delete by categorys Id
router.delete('/:id', deleteCategory)

export default router