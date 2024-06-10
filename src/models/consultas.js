import data from './querys.js'

export const filtros = async ({ precio_max, precio_min, categoria, metal }) => {
  let filtros = []
  const values = []
  const agregarFiltro = (campo, comparador, valor) => {
    values.push(valor)
    const { length } = filtros
    filtros.push(`${campo} ${comparador} $${length + 1}`)
  }
  if (precio_max) agregarFiltro('precio', '<=', precio_max)
  if (precio_min) agregarFiltro('precio', '>=', precio_min)
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
