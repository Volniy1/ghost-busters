import { useCallback } from 'react'
import { IMapSize } from '../GhostMap'

import s from './GhostPin.module.scss'

export default function GhostPin({
	id,
	mapSize,
	onClick,
}: {
	id: number
	mapSize: IMapSize
	onClick: () => void
}) {
	const x =
		mapSize.w - id <= 0 ? 40 : mapSize.w - id >= mapSize.w ? mapSize.w - 100 : mapSize.w - id
	const y =
		mapSize.h - id <= 0 ? 40 : mapSize.h - id >= mapSize.h ? mapSize.h - 100 : mapSize.h - id
	return (
		<button className={s.pin} style={{ top: y, left: x }} onClick={() => onClick()}>
			!
		</button>
	)
}
