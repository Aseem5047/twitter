import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Navbar from "../components/Navbar";
import SideBar from "../components/SideBar";
import dynamic from "next/dynamic";

const Loader = dynamic(() => import("../components/Loader"));

export default function App({ Component, pageProps }: AppProps) {
	const [loading, setLoading] = useState(true);
	const [isSSR, setIsSSR] = useState(true);

	useEffect(() => {
		setIsSSR(false);
		setTimeout(() => {
			setLoading(false);
		}, 2500);
	}, []);

	if (isSSR) return null;
	return (
		<GoogleOAuthProvider
			clientId={`${process.env.NEXT_PUBLIC_GOOGLE_API_TOKEN}`}
		>
			<div className="w-full px-2 lg:px-7 xl:px-16 m-auto overflow-hidden h-[100vh] text-white">
				<Navbar />
				{/* Conditional rendering based on loading state */}
				{loading ? (
					<Loader /> // Render loader when loading is true
				) : (
					<div className="flex gap-2 lg:gap-6 items-start">
						<div className="h-[92vh] overflow-x-hidden overflow-y-scroll no-scrollbar pt-5 md:pt-0">
							<SideBar />
						</div>
						<div className="flex flex-col gap-10 h-[90.5vh] flex-1 content">
							<Component {...pageProps} />
						</div>
					</div>
				)}
			</div>
		</GoogleOAuthProvider>
	);
}
