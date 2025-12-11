import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

import { ghostsApi } from '@shared/api/ghosts'
import { captureGhostRequest, Ghost } from '@shared/lib/zod/schemas'

export function useGhosts() {
	return useQuery({
		queryKey: ['ghosts'],
		queryFn: () => ghostsApi.getAll(),
	})
}

export function useCaptureGhost() {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: (request: captureGhostRequest) => ghostsApi.capture(request),
		onMutate: async (newCapture) => {
			await queryClient.cancelQueries({ queryKey: ['ghosts'] })

			const previousGhosts = queryClient.getQueryData<Ghost[]>(['ghosts'])

			await new Promise((resolve) => setTimeout(resolve, 1000))

			if (previousGhosts) {
				queryClient.setQueryData<Ghost[]>(['ghosts'], (old) =>
					old?.map((ghost) =>
						ghost.name === newCapture.name ? { ...ghost, status: 'contained' as const } : ghost
					)
				)
				console.log(queryClient.getQueryData(['ghosts']))
			}

			return { previousGhosts }
		},
		onError: (err, newCapture, context) => {
			if (context?.previousGhosts) {
				queryClient.setQueryData(['ghosts'], context.previousGhosts)
			}
		},
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: ['ghosts'] })
		},
	})
}
