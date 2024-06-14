import data from './querys.js'

export const filtros = async ({ precio_max: precioMax, precio_min: precioMin, categoria, metal }) => {
  let filtros = []
  const values = []
  const agregarFiltro = (campo, comparador, valor) => {
    values.push(valor)
    const { length } = filtros
    filtros.push(`${campo} ${comparador} $${length + 1}`)
  }
  if (precioMax) agregarFiltro('precio', '<=', precioMax)
  if (precioMin) agregarFiltro('precio', '>=', precioMin)
  if (categoria) agregarFiltro('categoria', '=', categoria)
  if (metal) agregarFiltro('metal', '=', metal)

  let consulta = 'SELECT * FROM inventario'
  if (filtros.length > 0) {
    filtros = filtros.join(' AND ')
    consulta += ` WHERE ${filtros}`
  }
  const joyas = await data(consulta, values)
  return joyas
}
