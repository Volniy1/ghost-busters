import type { Metadata } from 'next'

import { QueryProvider } from '@app/providers/QueryProvider'

import './styles/globals.scss'
import './styles/theme.scss'

export const metadata: Metadata = {
	title: 'Ghost Busters Monitoring',
	description: 'Yokai anomaly dashboard',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en">
			<body>
				<QueryProvider>{children}</QueryProvider>
			</body>
		</html>
	)
}
