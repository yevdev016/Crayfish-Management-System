import { z } from 'zod'

export const createSaleStockSchema = z.object({
    habitat_id: z.number().int().positive(),
    price: z.number().min(0),
    count: z.number().int().positive(),
    notes: z.string().nullable().optional().default('')
})

export const updateSaleStockSchema = z.object({
    habitat_id: z.number().int().positive().optional(),
    price: z.number().min(0).optional(),
    count: z.number().int().positive().optional(),
    notes: z.string().nullable().optional()
})

export const sellSaleStockSchema = z.object({
    qty: z.number().int().positive(),
    customer_name: z.string().optional().default('')
})
