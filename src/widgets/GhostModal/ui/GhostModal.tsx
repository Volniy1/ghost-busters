import { useRef } from 'react'
import clsx from 'clsx'

import { IGhost } from '@entities/ghost'
import { Button } from '@widgets/Button'

import s from './GhostModal.module.scss'

interface IGhostModal {
	className?: string
	data: IGhost
	onSubmit: () => void
	onClose: () => void
}

export function GhostModal({ className, data, onSubmit, onClose }: IGhostModal) {
	const ref = useRef<HTMLDivElement>(null)

	const onOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
		if (ref.current && !ref.current.contains(e.target as Node)) {
			onClose()
		}
	}

	return (
		<div className={s.modal} onClick={onOutsideClick}>
			<div
				ref={ref}
				className={clsx(s.container, data.threat === 'critical' && s.critical, className)}
			>
				<div className={s.card_head}>
					<p className={s.card_title}>Threat Alert: {data.name}</p>
				</div>
				<div className={s.card_content}>
					<p className={s.card_row}>
						<span className={s.label}>Level:</span>
						<span className={s.threat}>{data.threat}</span>
					</p>
					<p className={s.card_row}>
						<span className={s.label}>Location:</span>
						<span className={s.info_text}>{data.location}</span>
					</p>
					<p className={s.card_row}>
						<span className={s.label}>Status:</span>
						<span className={s.info_text}>{data.status}</span>
					</p>
				</div>
				<div className={s.card_bottom}>
					<Button label="Cancel" onClick={() => onClose()} />
					<Button label="Dispatch Team" onClick={() => onSubmit()} type="submit" />
				</div>
			</div>
		</div>
	)
}
