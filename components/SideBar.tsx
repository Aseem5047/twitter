import React, { useState } from "react";
// import { NextPage } from "next";
// import { useRouter } from "next/router";
import Link from "next/link";
import { GoogleLogin } from "@react-oauth/google";
import { AiFillHome, AiOutlineMenu } from "react-icons/ai";
import { ImCancelCircle } from "react-icons/im";
import Discover from "./Discover";
import SuggestedAccounts from "./SuggestedAccounts";
import Footer from "./Footer";
import useAuthStore from "../store/authStore";
import { createOrGetUser } from "../utils";

const SideBar = () => {
	const [showSidebar, setShowSidebar] = useState(true);
	const { addUser, fetchAllUsers, allUsers } = useAuthStore();
	const userProfile: any = useAuthStore((state) => state.userProfile);
	const normalLink =
		"flex items-center gap-3 hover:bg-gray-700 p-3 xl:justify-start cursor-pointer font-semibold text-white rounded";

	return (
		<>
			<div
				className="flex items-center justify-start xl:hidden m-2 ml-6 mt-3 text-xl"
				onClick={() => setShowSidebar((state) => !state)}
			>
				{showSidebar ? <ImCancelCircle /> : <AiOutlineMenu />}
			</div>
			{showSidebar && (
				<div className="xl:w-[400px] w-[18vw] md:w-[25vw] flex flex-col justify-start mb-10 border-r-2 border-gray-100 xl:border-0 p-3 pl-0">
					<div className="xl:border-b-2 border-gray-200 xl:pb-4">
						<Link href="/">
							<div className={normalLink}>
								<p className="text-2xl mx-auto sm:mx-0">
									<AiFillHome />
								</p>
								<span className="capitalize text-sm lg:text-xl w-full hidden sm:block">
									Home
								</span>
							</div>
						</Link>
					</div>
					{!userProfile && (
						<div className="px-2 py-4 hidden xl:block">
							<p className="text-gray-400 mb-[1rem]">
								Log in to like and comment on videos
							</p>
							<GoogleLogin
								onSuccess={(response) => createOrGetUser(response, addUser)}
								onError={() => console.log("error")}
							/>
						</div>
					)}
					<Discover />
					<SuggestedAccounts
						fetchAllUsers={fetchAllUsers}
						allUsers={allUsers}
					/>
					<Footer />
				</div>
			)}
		</>
	);
};

export default SideBar;
