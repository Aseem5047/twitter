import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { GoVerified } from "react-icons/go";
import Link from "next/link";
import axios from "axios";

import NoResults from "../../components/NoResults";
import ContentCard from "../../components/ContentCard";
import useAuthStore from "../../store/authStore";
import { BASE_URL } from "../../utils";
import { IUser, Content } from "../../types";

interface IProps {
	content: Content[];
}

const Search = ({ content }: IProps) => {
	const [isAccounts, setIsAccounts] = useState(false);
	const { allUsers }: { allUsers: IUser[] } = useAuthStore();
	const router = useRouter();
	const { searchTerm }: any = router.query;

	const accounts = isAccounts ? "border-b-2 border-white" : "text-gray-300";
	const isPosts = !isAccounts ? "border-b-2 border-white" : "text-gray-300";

	const searchedAccounts = allUsers?.filter((user: IUser) =>
		user.userName.toLowerCase().includes(searchTerm)
	);

	return (
		<div className="w-full">
			<div className="flex gap-10 mb-10  md:fixed z-50 bg-transparent w-full">
				<p
					onClick={() => setIsAccounts(true)}
					className={`text-xl  font-semibold cursor-pointer ${accounts} mt-2`}
				>
					Accounts
				</p>
				<p
					className={`text-xl font-semibold cursor-pointer ${isPosts} mt-2`}
					onClick={() => setIsAccounts(false)}
				>
					Posts
				</p>
			</div>
			{isAccounts ? (
				<div className="md:mt-16">
					{searchedAccounts.length > 0 ? (
						searchedAccounts.map((user: IUser, idx: number) => (
							<Link key={idx} href={`/profile/${user._id}`}>
								<div className=" flex gap-3 p-2 cursor-pointer font-semibold rounded border-b border-gray-200 py-4">
									<div>
										<Image
											width={50}
											height={50}
											className="rounded-full"
											alt="user-profile"
											src={user.image}
										/>
									</div>
									<div>
										<div>
											<p className="flex gap-1 items-center text-lg font-bold text-primary">
												{user.userName} <GoVerified className="text-blue-400" />
											</p>
											<p className="capitalize text-gray-400 text-sm">
												{user.userName}
											</p>
										</div>
									</div>
								</div>
							</Link>
						))
					) : (
						<div className="mt-[10rem]">
							<NoResults text={`No Account Results for ${searchTerm}`} />
						</div>
					)}
				</div>
			) : (
				<div className="md:mt-16 flex flex-wrap gap-6 md:justify-start ">
					{content.length ? (
						content.map((post: Content, idx: number) => (
							<ContentCard post={post} key={idx} />
						))
					) : (
						<div className="mt-[10rem]">
							<NoResults text={`No Content Results for ${searchTerm}`} />
						</div>
					)}
				</div>
			)}
		</div>
	);
};

export const getServerSideProps = async ({
	params: { searchTerm },
}: {
	params: { searchTerm: string };
}) => {
	const res = await axios.get(`${BASE_URL}/api/search/${searchTerm}`);

	return {
		props: { content: res.data },
	};
};

export default Search;
