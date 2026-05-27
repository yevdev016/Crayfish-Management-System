import { Router } from 'express'
import passport from 'passport'
import * as lifecycleController from '../controllers/lifecycleController.js'

const router = Router()

router.get('/', passport.authenticate('jwt', { session: false }), lifecycleController.getAllLifecycles)
router.post('/', passport.authenticate('jwt', { session: false }), lifecycleController.createLifecycle)

export default router
