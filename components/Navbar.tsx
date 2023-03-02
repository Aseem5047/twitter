import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { AiOutlineLogout } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import { SiGooglemessages } from "react-icons/si";
import { IoMdAdd } from "react-icons/io";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import logo from "../utils/logo.png";
import { IUser } from "../types";
import useAuthStore from "../store/authStore";
import Link from "next/link";
import { createOrGetUser } from "../utils";

const Navbar = () => {
	const [user, setUser] = useState<IUser | null>();
	const [searchTerm, setSearchTerm] = useState("");
	const router = useRouter();
	const { userProfile, addUser, removeUser } = useAuthStore();

	const handleKeyDown = (event: any) => {
		event.preventDefault();
		if (searchTerm && event.key === "Enter") {
			router.push(`/search/${searchTerm}`);
		}
	};

	const handleSearch = (e: { preventDefault: () => void }) => {
		e.preventDefault();
		if (searchTerm) {
			router.push(`/search/${searchTerm}`);
		}
	};

	useEffect(() => {
		setUser(userProfile);
	}, [userProfile]);

	return (
		<div className="flex justify-between w-full items-center p-4">
			<Link href="/">
				<div className="w-fit flex justify-center items-center">
					<Image src={logo} alt="Twitter" className="w-10 h-10 ml-2" />
					<span className="hidden md:block ml-2 font-bold text-xl">
						Twitter
					</span>
				</div>
			</Link>
			<div className="relative hidden md:block">
				<div className="absolute md:static top-10 -left-20 bg-transparent">
					<input
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
						type="text"
						className="w-[300px] md:w-[375px] rounded-full p-4 text-black focus:outline-none text-normal font-medium md:top-0 pl-7"
						placeholder="Search Accounts and Content"
					/>
					<button
						onClick={handleSearch}
						className="absolute right-5 md:right-4 border-l-2 border-gray-400 top-4 px-4 text-2xl  text-gray-400 z-20 bg-white"
					>
						<BiSearch />
					</button>
				</div>
			</div>
			<div>
				{user ? (
					<div className="flex gap-5 md:gap-10 items-center">
						<Link href="/chat">
							<SiGooglemessages className="text-2xl" />
						</Link>
						<Link href="/upload">
							<button className="border-2 p-2 md:px-4 text-md font-semibold flex items-center gap-2 rounded-full cursor-pointer hover:opacity-70">
								<IoMdAdd className="text-xl" />{" "}
								<span className="hidden md:block">Upload </span>
							</button>
						</Link>
						{user.image && (
							<Link href={`/profile/${user._id}`}>
								<div>
									<Image
										className="rounded-full cursor-pointer hover:opacity-70"
										src={user.image}
										alt="user"
										width={40}
										height={40}
									/>
								</div>
							</Link>
						)}
						<button
							type="button"
							className="border-2 p-2 rounded-full outline-none shadow-md cursor-pointer hover:opacity-70 -ml-4"
							onClick={() => {
								googleLogout();
								removeUser();
							}}
						>
							<AiOutlineLogout color="white" fontSize={21} />
						</button>
					</div>
				) : (
					<GoogleLogin
						onSuccess={(response) => createOrGetUser(response, addUser)}
						onError={() => console.log("Login Failed")}
					/>
				)}
			</div>
		</div>
	);
};

export default Navbar;
