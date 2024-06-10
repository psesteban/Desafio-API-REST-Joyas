import { Router } from 'express'
import * as controller from '../controllers/joyas.js'

const router = Router()
router.route('/joyas').get(controller.getAllJoyas)
router.route('/joyas/filtros').get(controller.getJoyas)

export default router
