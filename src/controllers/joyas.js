import * as sql from '../models/consultas.js'
import findAll from '../models/HATEOAS.js'

// GET
export const getJoyas = (req, res) => sql.filtros(req.query)
  .then((result) => res.status(200).json(result))
  .catch((error) => res.status(500).json({ status: false, code: 500, message: error })
  )

export const getAllJoyas = (req, res) => findAll(req.query)
  .then((result) => res.status(200).json(result))
  .catch((error) => res.status(500).json({ status: false, code: 500, message: error })
  )
