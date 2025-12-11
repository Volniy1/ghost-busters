import clsx from 'clsx'
import s from './Button.module.scss'

interface IButton {
	label?: string
	type?: 'default' | 'submit'
	onClick: () => void
	disabled?: boolean
}

export default function Button({ label, type = 'default', disabled = false, onClick }: IButton) {
	return (
		<button
			className={clsx(s.button, type === 'submit' && s.submit)}
			disabled={disabled}
			onClick={() => onClick()}
		>
			{label}
		</button>
	)
}
