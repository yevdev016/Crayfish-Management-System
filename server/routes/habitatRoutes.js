import express from 'express'
import passport from 'passport'
import * as habitatController from '../controllers/habitatController.js'
const router = express.Router()
router.use(passport.authenticate('jwt', { session: false }))
router.get('/', habitatController.getHabitats)
router.get('/:id', habitatController.getHabitat)
router.post('/', habitatController.createHabitat)
router.put('/:id', habitatController.updateHabitat)
router.delete('/:id', habitatController.deleteHabitat)
export default router