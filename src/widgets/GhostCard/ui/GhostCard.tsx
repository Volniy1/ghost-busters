import { IGhost } from '@pages/MonitoringPage/ui/MonitoringPage'
import s from './GhostCard.module.scss'
import clsx from 'clsx'

interface IGhostCard {
	className?: string
	data: IGhost
	onClick: () => void
}

export function GhostCard({ className, data, onClick }: IGhostCard) {
	return (
		<div
			className={clsx(s.container, data.threat === 'critical' && s.critical, className)}
			onClick={() => onClick()}
		>
			<div className={s.card_head}>
				<p className={s.card_title}>{data.name}</p>
				<p className={s.card_threat}>{data.threat}</p>
			</div>
			<div className={s.card_content}>
				<p className={s.card_location}>{data.location}</p>
				<p className={s.card_status}>{data.status}</p>
			</div>
		</div>
	)
}
