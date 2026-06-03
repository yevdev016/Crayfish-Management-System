import { Router } from 'express'
import passport from 'passport'
import * as lifecycleController from '../controllers/lifecycleController.js'
import { validate } from '../middleware/validate.js'
import { createLifecycleSchema, updateLifecycleSchema } from '../validators/lifecycleValidator.js'

const router = Router()

router.get('/', passport.authenticate('jwt', { session: false }), lifecycleController.getAllLifecycles)
router.post('/', passport.authenticate('jwt', { session: false }), validate(createLifecycleSchema), lifecycleController.createLifecycle)
router.put('/:id', passport.authenticate('jwt', { session: false }), validate(updateLifecycleSchema), lifecycleController.updateLifecycle)
router.delete('/:id', passport.authenticate('jwt', { session: false }), lifecycleController.deleteLifecycle)

export default router
