import React, { useEffect, useState } from "react";
import { GoVerified } from "react-icons/go";
import axios from "axios";
import ContentCard from "../../components/ContentCard";
import NoResults from "../../components/NoResults";
import { IUser, Content } from "../../types";
import { BASE_URL } from "../../utils";
import Image from "next/image";

interface IProps {
	data: {
		user: IUser;
		userContent: Content[];
		userLikedContent: Content[];
	};
}

const Profile = ({ data }: IProps) => {
	const [showUserContent, setShowUserContent] = useState<Boolean>(true);
	const [contentList, setContentList] = useState<Content[]>([]);

	const { user, userContent, userLikedContent } = data;
	const Contents = showUserContent
		? "border-b-2 border-white pb-2"
		: "text-gray-400";
	const liked = !showUserContent
		? "border-b-2 border-white pb-2"
		: "text-gray-400";

	useEffect(() => {
		const fetchContents = async () => {
			if (showUserContent) {
				setContentList(userContent);
			} else {
				setContentList(userLikedContent);
			}
		};

		fetchContents();
	}, [showUserContent, userLikedContent, userContent]);

	console.log(data);

	return (
		<div className="relative w-full mt-7 pb-7 px-4 md:px-0 md:pl-4 overflow-y-scroll no-scrollbar">
			<div className=" flex gap-6 md:gap-10 w-full">
				<div className="w-16 h-16 md:w-32 md:h-32">
					<Image
						width={120}
						height={120}
						layout="responsive"
						className="rounded-full object-center object-cover"
						src={
							user.image ||
							"/defaultProfileImage.png" ||
							"/defaultProfileImage.png"
						}
						alt="user-profile"
					/>
				</div>
				<div>
					<div className="text-md md:text-2xl font-bold tracking-wider flex gap-2 items-center justify-center lowercase">
						<span>{user.userName.replace(/\s+/g, "")} </span>
						<GoVerified className="text-blue-400 md:text-xl text-md" />
					</div>
					<p className="text-sm font-medium capitalize"> {user.userName}</p>
				</div>
			</div>

			<div className="sticky top-0 z-40 py-2 pb-4 bg-[#15202b] flex gap-10 w-full">
				<p
					className={`text-xl font-semibold cursor-pointer ${Contents} mt-2`}
					onClick={() => setShowUserContent(true)}
				>
					Posts
				</p>
				<p
					className={`text-xl font-semibold cursor-pointer ${liked} mt-2`}
					onClick={() => setShowUserContent(false)}
				>
					Liked
				</p>
			</div>
			<div
				className={`grid grid-cols-1 ${
					contentList?.length > 0 && "mt-4 md:grid-cols-2 3xl:grid-cols-4"
				}  items-center w-full gap-4`}
			>
				{contentList?.length > 0 ? (
					contentList.map((post: Content, idx: number) => (
						<ContentCard key={idx} post={post} />
					))
				) : (
					<div className="size-full flex items-center justify-center -mt-20">
						<NoResults
							text={`No ${showUserContent ? "" : "Liked"} Contents Yet`}
						/>
					</div>
				)}
			</div>
		</div>
	);
};

export default Profile;

export const getServerSideProps = async ({
	params: { userId },
}: {
	params: { userId: string };
}) => {
	const res = await axios.get(`${BASE_URL}/api/profile/${userId}`);
	// console.log(res + " from posts");

	return {
		props: { data: res.data },
	};
};
