import { IGhost } from '@entities/ghost'
import s from './GhostMap.module.scss'

export function GhostMap({ ghosts }: { ghosts: IGhost[] }) {
	return (
		<div className={s.map}>
			<div className={s.map_inner}>
				<div className={s.map_label}></div>
			</div>
		</div>
	)
}
