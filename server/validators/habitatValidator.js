import { z } from 'zod'

export const createHabitatSchema = z.object({
    name: z.string().min(1).max(50),
    species: z.string().min(1).max(50),
    count: z.number().int().min(0),
    stage: z.string().min(1).max(50),
    image: z.string().nullable().optional()
})

export const updateHabitatSchema = z.object({
    name: z.string().min(1).max(50).optional(),
    species: z.string().min(1).max(50).optional(),
    count: z.number().int().min(0).optional(),
    stage: z.string().min(1).max(50).optional(),
    image: z.string().nullable().optional()
})
