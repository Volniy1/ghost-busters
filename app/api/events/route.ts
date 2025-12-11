import { NextRequest } from 'next/server'
import { ghosts } from '../ghosts/route'

export async function GET(request: NextRequest) {
	const stream = new ReadableStream({
		async start(controller) {
			const encoder = new TextEncoder()

			const sendEvent = (data: object) => {
				const message = `data: ${JSON.stringify(data)}\n\n`
				controller.enqueue(encoder.encode(message))
			}

			sendEvent({ type: 'connected', message: 'Stream started' })
			const interval = setInterval(() => {
				if (ghosts.length === 0) return

				const activeGhosts = ghosts.filter((g) => g.status === 'contained' || g.threat === 'low')
				if (activeGhosts.length === 0) return

				const randomGhost = activeGhosts[Math.floor(Math.random() * activeGhosts.length)]
				const ghostIndex = ghosts.findIndex((g) => g.id === randomGhost.id)
				console.log('newGhost', randomGhost)

				if (ghostIndex !== -1) {
					ghosts[ghostIndex] = {
						...ghosts[ghostIndex],
						threat: ghosts[ghostIndex].status === 'contained' ? 'low' : 'critical',
						status: 'active',
					}

					sendEvent({
						type: 'threat_update',
						ghost: ghosts[ghostIndex],
					})
				}
			}, 5000)

			request.signal.addEventListener('abort', () => {
				clearInterval(interval)
				controller.close()
			})
		},
	})

	return new Response(stream, {
		headers: {
			'Content-Type': 'text/event-stream',
			'Cache-Control': 'no-cache',
			Connection: 'keep-alive',
		},
	})
}
