import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Navbar from "../components/Navbar";
import SideBar from "../components/SideBar";

export default function App({ Component, pageProps }: AppProps) {
	const [isSSR, setIsSSR] = useState(true);
	useEffect(() => {
		setIsSSR(false);
	}, []);

	if (isSSR) return null;
	return (
		<GoogleOAuthProvider
			clientId={`${process.env.NEXT_PUBLIC_GOOGLE_API_TOKEN}`}
		>
			<div className="xl:w-[1200px] m-auto overflow-hidden h-[100vh] text-white">
				<Navbar />
				<div className="flex gap-6 md:gap-20">
					<div className="h-[92vh] overflow-hidden xl:hover:overflow-auto">
						<SideBar />
					</div>
					<div className="mt-4 flex flex-col gap-10 overflow-auto h-[88vh] flex-1 content">
						<Component {...pageProps} />
					</div>
				</div>
			</div>
		</GoogleOAuthProvider>
	);
}
