// import dotenv from 'dotenv'
import format from 'pg-format'
import pool from '../database/config.js'

// dotenv.config() // para ingresar url base

// const { PORT } = process.env // para ingresar url base
// const BASE_URL = process.env.NODE_ENV === 'production' ? process.env.DOMAIN_URL_APP : `http://localhost:${PORT}` // para ingresar url base

const findAll = async ({ limit = 5, page = 1, order_by: orderBy = 'stock_DESC' }) => {
  try {
    const countQuery = 'SELECT COUNT(*) FROM inventario;'
    const { rows: countResult } = await pool.query(countQuery)
    const totalJoyas = parseInt(countResult[0].count, 10)
    const totalStockQuery = 'SELECT SUM(stock) AS total_stock FROM inventario;'
    const { rows: totalStockResult } = await pool.query(totalStockQuery)
    const stockTotal = parseInt(totalStockResult[0].total_stock, 10)

    const [campo, direccion] = orderBy.split('_')

    const validFields = ['stock', 'nombre', 'precio']
    const validDirections = ['ASC', 'DESC']
    if (!validFields.includes(campo) || !validDirections.includes(direccion)) {
      throw new Error('Campo o dirección de ordenamiento inválido')
    }

    const offset = Math.abs(+page !== 0 ? page - 1 : 0) * limit
    const query = format('SELECT * FROM inventario ORDER BY %I %s LIMIT $1 OFFSET $2;', campo, direccion)

    const { rows } = await pool.query(query, [limit, offset])
    const results = rows.map((row) => ({
      ...row,
      name: `${row.nombre}`,
      href: `joyas/joya/${row.id}`
    }))

    return {
      totalJoyas,
      stockTotal,
      results

    }
  } catch ({ code, message }) {
    const error = { status: false, code, message }
    throw error
  }
}

export default findAll
