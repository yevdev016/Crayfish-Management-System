import { z } from 'zod'
import { validStages } from '../constants.js'

export const createLifecycleSchema = z.object({
    habitat_id: z.number().int().positive(),
    from_stage: z.enum(validStages),
    to_stage: z.enum(validStages),
    count: z.number().int().positive(),
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be YYYY-MM-DD')
})

export const updateLifecycleSchema = z.object({
    count: z.number().int().positive(),
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be YYYY-MM-DD')
})
