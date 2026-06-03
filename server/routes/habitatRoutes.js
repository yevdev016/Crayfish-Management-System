import express from 'express'
import passport from 'passport'
import * as habitatController from '../controllers/habitatController.js'
import { validate } from '../middleware/validate.js'
import { createHabitatSchema, updateHabitatSchema } from '../validators/habitatValidator.js'

const router = express.Router()
router.use(passport.authenticate('jwt', { session: false }))
router.get('/', habitatController.getHabitats)
router.get('/:id', habitatController.getHabitat)
router.post('/', validate(createHabitatSchema), habitatController.createHabitat)
router.put('/:id', validate(updateHabitatSchema), habitatController.updateHabitat)
router.delete('/:id', habitatController.deleteHabitat)
export default router