import { ServerTarget } from "nthul-lite/server";
import { Inter } from "next/font/google";
import { SharedRootLayout } from "shared-ui";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }): JSX.Element {
	return (
		<html lang="en">
			<body>
				<ServerTarget />
				<SharedRootLayout className={inter.className}>{children}</SharedRootLayout>
			</body>
		</html>
	);
}
