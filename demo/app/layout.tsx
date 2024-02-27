import { StoreProvider } from '@/lib/store/StoreProvider'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import "./globals.scss";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'Student Registry',
	description: 'Student CRUD operations',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<StoreProvider>
			<html lang='en'>
				<body className={inter.className}>{children}</body>
			</html>
		</StoreProvider>
	)
}
