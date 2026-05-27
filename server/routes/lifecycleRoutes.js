import { Router } from 'express'
import passport from 'passport'
import * as lifecycleController from '../controllers/lifecycleController.js'

const router = Router()

router.get('/', passport.authenticate('jwt', { session: false }), lifecycleController.getAllLifecycles)
router.post('/', passport.authenticate('jwt', { session: false }), lifecycleController.createLifecycle)
router.put('/:id', passport.authenticate('jwt', { session: false }), lifecycleController.updateLifecycle)
router.delete('/:id', passport.authenticate('jwt', { session: false }), lifecycleController.deleteLifecycle)

export default router
