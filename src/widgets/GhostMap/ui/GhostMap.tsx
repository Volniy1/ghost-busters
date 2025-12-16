import { RefObject, useEffect, useRef, useState } from 'react'

import { IGhost } from '@entities/ghost'
import GhostPin from './GhostPin'

import s from './GhostMap.module.scss'

export interface IMapSize {
	h: number
	w: number
}

export function GhostMap({
	ghosts,
	onSelect,
}: {
	ghosts: IGhost[]
	onSelect: (v: IGhost) => void
}) {
	const ref = useRef<HTMLDivElement | null>(null)

	const [mapSize, setMapSize] = useState<IMapSize>({ h: 0, w: 0 })

	useEffect(() => {
		setMapSize({ w: ref.current?.clientWidth ?? 0, h: ref.current?.clientHeight ?? 0 })
	}, [0])

	return (
		<div className={s.map}>
			<div className={s.map_label}>Active Ghosts: {ghosts.length}</div>
			<div className={s.map_pins} ref={ref}>
				{ghosts.map((v, i) => (
					<GhostPin
						key={v.id}
						id={Number(v.id) ?? i}
						mapSize={mapSize}
						onClick={() => onSelect(v)}
					/>
				))}
			</div>
		</div>
	)
}
