import type { Metadata } from 'next'
import { QueryProvider } from '@app/providers/QueryProvider'

import './styles/theme.scss'
import './styles/globals.scss'

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
