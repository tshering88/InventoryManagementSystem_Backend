import { Router } from "express"
import { createWarehouse, deleteWarehouse, getCurrentWarehouse, getWarehouse, updateWarehouse } from "../controllers/warehouse.controllers"



const router = Router ()

// Get all Warehouse
router.get('/', getWarehouse)

// Get by Warehouse Id
router.get('/:id', getCurrentWarehouse)


// Create new Warehouse
router.post('/', createWarehouse)


// Update by Warehouse Id
router.put('/:id', updateWarehouse )


// Delete by Warehouse Id
router.delete('/:id', deleteWarehouse )


export default router