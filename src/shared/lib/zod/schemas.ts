import { z } from 'zod'

export const ghostSchema = z.object({
	name: z.string(),
	location: z.string(),
	threat: z.enum(['critical', 'low']),
	status: z.enum(['contained', 'active']),
	id: z.string().optional(),
})

export type Ghost = z.infer<typeof ghostSchema>

export const captureGhostRequestSchema = z.object({
	name: z.string(),
})

export type captureGhostRequest = z.infer<typeof captureGhostRequestSchema>

export const captureGhostResponseSchema = z.object({
	success: z.boolean(),
	message: z.string(),
	ghost: ghostSchema.optional(),
})

export type captureGhostResponse = z.infer<typeof captureGhostResponseSchema>
