import { useEffect, useRef } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { Ghost } from '@shared/lib/zod/schemas'

export function useGhostEvents() {
	const queryClient = useQueryClient()
	const eventSourceRef = useRef<EventSource | null>(null)

	useEffect(() => {
		const eventSource = new EventSource('/api/events')
		eventSourceRef.current = eventSource

		eventSource.onmessage = (event) => {
			try {
				const data = JSON.parse(event.data)

				if (data.type === 'threat_update' && data.ghost) {
					queryClient.setQueryData<Ghost[]>(['ghosts'], (old) =>
						old?.map((ghost) => (ghost.name === data.ghost.name ? data.ghost : ghost))
					)
				}
			} catch (error) {
				console.error('Error parsing SSE message:', error)
			}
		}

		eventSource.onerror = (error) => {
			console.error('SSE error:', error)
		}

		return () => {
			eventSource.close()
		}
	}, [queryClient])
}
