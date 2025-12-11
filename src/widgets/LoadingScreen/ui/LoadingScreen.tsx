import s from './LoadingScreen.module.scss'

interface ILoadingScreen {
	className?: string
}

export function LoadingScreen({ className }: ILoadingScreen) {
	return (
		<div className={s.modal}>
			<div className={s.container}>
				<span className={s.loader} />
				<p className={s.text}>Deploying ghost busters....</p>
			</div>
		</div>
	)
}
