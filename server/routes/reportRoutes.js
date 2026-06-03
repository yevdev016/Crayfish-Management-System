import { Router } from 'express'
import passport from 'passport'
import { z } from 'zod'
import { validate } from '../middleware/validate.js'
import { generateReportController, getReportHistory } from '../controllers/reportController.js'
const router = Router()
const generateSchema = z.object({
  type: z.enum(['habitat', 'sales-stock', 'lifecycle', 'activity'], {
    errorMap: () => ({ message: 'Type must be: habitat, sales-stock, lifecycle, or activity' })
  })
})
router.post(
  '/generate',
  passport.authenticate('jwt', { session: false }),
  validate(generateSchema),
  generateReportController
)
router.get(
  '/history',
  passport.authenticate('jwt', { session: false }),
  getReportHistory
)
export default router