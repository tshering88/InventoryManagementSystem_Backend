import express, { Express } from 'express'
import cors from 'cors'
import userRoutes from './routes/user.routes'
import productRoutes from './routes/product.routes'
import categoryRoutes from './routes/category.routes'
import purchaseRoutes from './routes/purchase.routes'
import purchaseItemRoutes from './routes/purchaseItem.routes'
import supplierRoutes from './routes/supplier.routes'
import saleRoutes from './routes/sale.routes'
import saleItemRoutes from './routes/saleItem.routes'
import stockRoutes from './routes/stock.routes'
import stockMovementRoutes from './routes/stockMovement.routes'
import warehouseRoutes from './routes/warehouse.routes'


//Initialize Express app
const app: Express = express()

// Middleware
app.use(cors())
app.use(express.json())

app.use('/api/v1/user', userRoutes)
app.use('/api/v1/product', productRoutes)
app.use('/api/v1/category', categoryRoutes)
app.use('/api/v1/purchase', purchaseRoutes)
app.use('/api/v1/purchaseItem', purchaseItemRoutes)
app.use('/api/v1/supplier', supplierRoutes)
app.use('/api/v1/sale', saleRoutes)
app.use('/api/v1/saleItem', saleItemRoutes)
app.use('/api/v1/stock', stockRoutes)
app.use('/api/v1/stockMovement', stockMovementRoutes)
app.use('/api/v1/warehouse', warehouseRoutes)






// Root Route 
app.get('/', (req, res) => {
    res.send(`
        API is running...
        Status: Online
        Uptime: ${Math.floor(process.uptime())} seconds
    `)
})


export default app