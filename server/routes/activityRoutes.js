import { Router } from 'express'
import passport from 'passport'
import * as activityController from '../controllers/activityController.js'

const router = Router()
router.get('/', passport.authenticate('jwt', { session: false }), activityController.getActivities)

export default router
