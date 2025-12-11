import { captureGhostRequest, captureGhostResponse, Ghost } from '@shared/lib/zod/schemas'

export const ghostsApi = {
	getAll: async (): Promise<Ghost[]> => {
		const response = await fetch('/api/ghosts', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		})

		if (!response.ok) {
			throw new Error('Failed to fetch ghosts')
		}

		return response.json()
	},

	capture: async (request: captureGhostRequest): Promise<captureGhostResponse> => {
		const response = await fetch('/api/ghosts/capture', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(request),
		})

		const data = await response.json()

		if (!response.ok) {
			throw new Error(data.message || 'Failed to capture ghost')
		}

		return data
	},
}
