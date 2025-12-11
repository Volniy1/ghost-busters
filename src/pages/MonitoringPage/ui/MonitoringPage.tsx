'use client'

import { useState } from 'react'
import clsx from 'clsx'

import { IGhost } from '@entities/ghost'
import { ErrorScreen } from '@widgets/ErrorScreen'
import { GhostCard } from '@widgets/GhostCard'
import { GhostModal } from '@widgets/GhostModal'
import { LoadingScreen } from '@widgets/LoadingScreen'
import { useCaptureGhost, useGhosts } from '@shared/hooks/useGhosts'
import { useGhostEvents } from '@shared/hooks/useGhostsEvents'

import s from './MonitoringPage.module.scss'

export function MonitoringPage() {
	const { data: ghosts = [], isLoading, error } = useGhosts()
	const captureMutation = useCaptureGhost()

	// SSE
	useGhostEvents()

	const [selectedGhost, setSelectedGhost] = useState<IGhost>()

	const onSelect = (data: IGhost) => {
		setSelectedGhost(data)
	}

	const onDetain = async () => {
		if (!selectedGhost) return

		try {
			const data = selectedGhost
			setSelectedGhost(undefined)
			await captureMutation.mutateAsync({ name: data.name })
		} catch (error) {
			console.error('Capture failed:', error)
			setSelectedGhost(undefined)
		}
	}

	if (isLoading) {
		return <LoadingScreen />
	}

	if (error) {
		return <ErrorScreen />
	}

	return (
		<div className={`${s.container}`}>
			{captureMutation.isError && <ErrorScreen error={(captureMutation.error as Error)?.message} />}
			{captureMutation.isPending && <LoadingScreen />}
			{selectedGhost && (
				<GhostModal
					data={selectedGhost}
					onSubmit={onDetain}
					onClose={() => setSelectedGhost(undefined)}
				/>
			)}
			<div className={s.threat_feed}>
				<div className={clsx(s.threat_header, s.title)}>Threat Feed</div>
				<div className={s.threat_list}>
					{ghosts
						.filter((g) => g.status !== 'contained')
						.sort((a, b) => (a.threat === 'critical' && b.threat === 'low' ? -1 : 1))
						.map((g, i) => (
							<GhostCard data={g} key={g.id || i} onClick={() => onSelect(g)} />
						))}
				</div>
			</div>
		</div>
	)
}
