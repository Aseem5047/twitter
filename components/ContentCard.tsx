import React, { useEffect, useRef, useState } from "react";
import { NextPage } from "next";
import { Content } from "../types";
import Link from "next/link";
import { HiVolumeUp, HiVolumeOff } from "react-icons/hi";
import { BsFillPlayFill, BsFillPauseFill } from "react-icons/bs";
import { GoVerified } from "react-icons/go";
import { BsPlay } from "react-icons/bs";
import Image from "next/image";

interface IProps {
	post: Content;
	isShowingOnHome?: boolean;
}

const ContentCard: NextPage<IProps> = ({
	post: { caption, postedBy, video, image, _id, likes },
	isShowingOnHome,
}) => {
	const [playing, setPlaying] = useState(false);
	const [isHover, setIsHover] = useState(false);
	const [isVideoMuted, setIsVideoMuted] = useState(false);
	const videoRef = useRef<HTMLVideoElement>(null);

	const onVideoPress = () => {
		if (playing) {
			videoRef?.current?.pause();
			setPlaying(false);
		} else {
			videoRef?.current?.play();
			setPlaying(true);
		}
	};

	useEffect(() => {
		if (videoRef?.current) {
			videoRef.current.muted = isVideoMuted;
		}
	}, [isVideoMuted]);

	if (!isShowingOnHome) {
		return (
			<div className="flex flex-col justify-center w-full">
				<Link href={`/detail/${_id}`}>
					{video !== null ? (
						<video
							loop
							src={video.asset.url}
							className="w-full h-[300px] aspect-square  rounded-2xl cursor-pointer bg-gray-800 object-cover"
							width={300}
							height={300}
						></video>
					) : (
						<Image
							src={image.asset.url}
							className="w-full h-full object-cover aspect-square rounded-2xl cursor-pointer bg-gray-800"
							alt="Post"
							width={300}
							height={300}
						/>
					)}
				</Link>
				<div className="flex gap-2 -mt-8 items-center ml-4">
					<p className="text-white text-lg font-medium flex gap-1 items-center">
						<BsPlay className="text-2xl" />
						{(likes?.length !== undefined &&
							likes?.length + `${likes?.length <= 1 ? " Like" : " Likes"}`) ||
							"No Like"}
					</p>
				</div>
				<Link href={`/detail/${_id}`}>
					<p className="mt-5 text-md text-white cursor-pointer w-210 pb-7">
						About - {caption}
					</p>
				</Link>
			</div>
		);
	}

	return (
		<div className="flex flex-col justify-center items-start gap-5 border-b border-gray-200 pb-6 w-fit last:mb-7 3xl:last:mb-0">
			<div className="flex gap-3 p-2 cursor-pointer font-semibold rounded mt-2">
				<div className="md:w-16 md:h-16 w-10 h-10">
					<Link href={`/profile/${postedBy?._id}`}>
						<Image
							width={62}
							height={62}
							className=" rounded-full"
							src={postedBy?.image}
							alt="user-profile"
						/>
					</Link>
				</div>
				<div className="flex flex-col items-start justify-center">
					<Link href={`/profile/${postedBy?._id}`}>
						<div className="flex items-center gap-2 flex-wrap">
							<p className="flex gap-2 items-center md:text-md font-bold text-primary">
								{postedBy.userName}
							</p>
							<p className="capitalize font-medium text-xs text-gray-500 flex items-center gap-1">
								<GoVerified className="text-blue-400 text-md" />
								{postedBy.userName}
							</p>
						</div>
					</Link>
				</div>
			</div>

			<div className="flex items-center relative">
				<div
					onMouseEnter={() => setIsHover(true)}
					onMouseLeave={() => setIsHover(false)}
					className="rounded-3xl w-fit"
				>
					<Link href={`/detail/${_id}`} className="w-full">
						{video !== null ? (
							<video
								loop
								ref={videoRef}
								src={video.asset.url}
								className="w-full max-h-[400px] object-cover aspect-square rounded-2xl cursor-pointer bg-gray-800"
								width={400}
								height={400}
							></video>
						) : (
							<Image
								src={image.asset.url}
								className="w-full max-h-[400px] object-cover aspect-square rounded-2xl cursor-pointer bg-gray-800"
								alt="Post"
								width={400}
								height={400}
							/>
						)}
					</Link>

					{video !== null && isHover && (
						<div className="absolute bottom-6 cursor-pointer left-0 flex gap-10 justify-between w-full py-2 px-5">
							{playing ? (
								<button onClick={onVideoPress}>
									<BsFillPauseFill className="text-white text-2xl lg:text-4xl" />
								</button>
							) : (
								<button onClick={onVideoPress}>
									<BsFillPlayFill className="text-white text-2xl lg:text-4xl" />
								</button>
							)}
							{isVideoMuted ? (
								<button onClick={() => setIsVideoMuted(false)}>
									<HiVolumeOff className="text-white text-2xl lg:text-4xl" />
								</button>
							) : (
								<button onClick={() => setIsVideoMuted(true)}>
									<HiVolumeUp className="text-white text-2xl lg:text-4xl" />
								</button>
							)}
						</div>
					)}
				</div>
			</div>
			<Link href={`/detail/${_id}`}>
				<div className="flex flex-col items-start gap-2 justify-center">
					<span className="font-medium">Description</span>
					<p className="font-normal h-full max-h-20 text-ellipsis  overflow-x-hidden overflow-y-scroll no-scrollbar text-sm">
						{caption}
					</p>
				</div>
			</Link>
		</div>
	);
};

export default ContentCard;
