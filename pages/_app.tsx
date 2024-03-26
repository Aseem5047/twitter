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
			<div className="xl:w-4/5 m-auto overflow-hidden h-[100vh] text-white">
				<Navbar />
				<div className="flex gap-6 items-start">
					<div className="h-[92vh] overflow-hidden hover:overflow-auto no-scrollbar pt-5 md:pt-0">
						<SideBar />
					</div>
					<div className="flex flex-col gap-10 h-[90.5vh] flex-1 content">
						<Component {...pageProps} />
					</div>
				</div>
			</div>
		</GoogleOAuthProvider>
	);
}
