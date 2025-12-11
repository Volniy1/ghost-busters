import { Button } from '@widgets/Button'

import s from './ErrorScreen.module.scss'

interface ILoadingScreen {
	onClick?: () => void
	error?: string
}

export function ErrorScreen({ onClick, error }: ILoadingScreen) {
	return (
		<div className={s.modal}>
			<div className={s.container}>
				<span className={s.error}>{error ?? 'Error'}</span>
				<Button type="submit" label="Restart" onClick={() => window.location.reload()} />
			</div>
		</div>
	)
}
