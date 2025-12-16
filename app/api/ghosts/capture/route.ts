import { NextResponse } from 'next/server'
import { ghosts } from '../route'
import { captureGhostRequestSchema, captureGhostResponseSchema } from '@shared/lib/zod/schemas'

export async function POST(request: Request) {
	try {
		const body = await request.json()

		const validatedRequest = captureGhostRequestSchema.parse(body)

		const ghostIndex = ghosts.findIndex((g) => g.name === validatedRequest.name)

		if (ghostIndex === -1) {
			return NextResponse.json({ success: false, message: 'Ghost not found' }, { status: 404 })
		}

		const shouldFail = Math.random() < 0.3

		if (shouldFail) {
			return NextResponse.json(
				{
					success: false,
					message: 'Capture failed! Ghost escaped. Team dispatched but anomaly remains active.',
				},
				{ status: 500 }
			)
		}

		ghosts[ghostIndex] = {
			...ghosts[ghostIndex],
			status: 'contained' as const,
			threat: 'low',
			id: Math.floor(Math.random() * (500 - 0 + 1) + 0).toString(),
		}

		const response = {
			success: true,
			message: 'Ghost captured successfully!',
			ghost: ghosts[ghostIndex],
		}

		const validatedResponse = captureGhostResponseSchema.parse(response)

		return NextResponse.json(validatedResponse, { status: 200 })
	} catch (error) {
		if (error instanceof Error && error.name === 'ZodError') {
			return NextResponse.json(
				{ success: false, message: 'Invalid request data', error: error.message },
				{ status: 400 }
			)
		}

		console.error('Error capturing ghost:', error)
		return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 })
	}
}
