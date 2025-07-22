import React, { useEffect, useState } from "react";
import { SanityAssetDocument } from "@sanity/client";
import { useRouter } from "next/router";
import { FaCloudUploadAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import axios from "axios";

import useAuthStore from "../store/authStore";
import { BASE_URL } from "../utils";
import { client } from "../utils/client";
import { topics } from "../utils/constants";
import Image from "next/image";

const Upload = () => {
	const [caption, setCaption] = useState("");
	const [topic, setTopic] = useState<String>(topics[0].name);
	const [loading, setLoading] = useState<Boolean>(false);
	const [savingPost, setSavingPost] = useState<Boolean>(false);
	const [isImage, setIsImage] = useState<Boolean>(false);
	const [contentAsset, setContentAsset] = useState<
		SanityAssetDocument | undefined
	>();
	const [wrongFileType, setWrongFileType] = useState<Boolean>(false);

	const userProfile: any = useAuthStore((state) => state.userProfile);
	const router = useRouter();

	useEffect(() => {
		if (!userProfile) router.push("/");
	}, [userProfile, router]);

	useEffect(() => {
		contentAsset?.extension.toLowerCase().includes("jpg") ||
		contentAsset?.extension.toLowerCase().includes("png") ||
		contentAsset?.extension.toLowerCase().includes("jpeg")
			? setIsImage(true)
			: setIsImage(false);
	}, [contentAsset]);

	const uploadPost = async (e: any) => {
		const selectedFile = e.target.files[0];
		const fileTypes = [
			"video/mp4",
			"video/webm",
			"video/ogg",
			"image/png",
			"image/jpg",
			"image/jpeg",
		];

		// uploading asset to sanity
		if (fileTypes.includes(selectedFile.type)) {
			setWrongFileType(false);
			setLoading(true);

			client.assets
				.upload("file", selectedFile, {
					contentType: selectedFile.type,
					filename: selectedFile.name,
				})
				.then((data) => {
					setContentAsset(data);
					setLoading(false);
				});
		} else {
			setLoading(false);
			setWrongFileType(true);
		}
	};

	const handlePost = async () => {
		if (caption && contentAsset?._id && topic && isImage) {
			setSavingPost(true);

			const doc = {
				_type: "post",
				caption,
				image: {
					_type: "file",
					asset: {
						_type: "reference",
						_ref: contentAsset?._id,
					},
				},
				userId: userProfile?._id,
				postedBy: {
					_type: "postedBy",
					_ref: userProfile?._id,
				},
				topic,
			};

			await axios.post(`${BASE_URL}/api/post`, doc);

			router.push("/");
		}

		if (caption && contentAsset?._id && topic && !isImage) {
			setSavingPost(true);

			const doc = {
				_type: "post",
				caption,
				video: {
					_type: "file",
					asset: {
						_type: "reference",
						_ref: contentAsset?._id,
					},
				},
				userId: userProfile?._id,
				postedBy: {
					_type: "postedBy",
					_ref: userProfile?._id,
				},
				topic,
			};

			await axios.post(`${BASE_URL}/api/post`, doc);

			router.push("/");
		}
	};

	const handleDiscard = () => {
		setSavingPost(false);
		setContentAsset(undefined);
		setCaption("");
		setTopic("");
	};

	// console.log(contentAsset);

	console.log(isImage);

	return (
		<div className="flex w-full h-full absolute left-0 top-[77px] lg:top-[70px] mb-10 pt-10 lg:pt-20 bg-[#15202b] justify-center">
			<div className=" bg-transparent rounded-lg xl:h-[80vh] flex gap-6 flex-wrap justify-center items-center p-14 pt-6">
				<div>
					<div>
						<p className="text-2xl font-bold">Upload Post</p>
						<p className="text-md text-gray-400 mt-1">
							Post a video/Image to your account
						</p>
					</div>
					<div className=" border-dashed rounded-xl border-4 border-gray-200 flex flex-col justify-center items-center  outline-none mt-10 w-[240px] md:w-[400px] h-[458px] p-10 cursor-pointer hover:border-red-300 hover:bg-gray-700">
						{loading ? (
							<p className="text-center text-3xl text-red-400 font-semibold">
								Uploading...
							</p>
						) : (
							<div>
								{!contentAsset ? (
									<label className="cursor-pointer">
										<div className="flex flex-col items-center justify-center h-full">
											<div className="flex flex-col justify-center items-center">
												<p className="font-bold text-xl">
													<FaCloudUploadAlt className="text-gray-300 text-6xl" />
												</p>
												<p className="text-xl font-semibold">
													Select video / Image to upload
												</p>
											</div>

											<p className="text-gray-400 text-center mt-10 text-sm leading-10">
												MP4 or WebM or ogg <br />
												PNG or JPG or Jpeg <br />
												720x1280 resolution or higher <br />
												Up to 10 minutes <br />
												Less than 2 GB
											</p>
											<p className="bg-[#F51997] text-center mt-8 rounded text-black text-md font-medium p-2 w-52 outline-none">
												Select file
											</p>
										</div>
										<input
											type="file"
											name="upload-post"
											onChange={(e) => uploadPost(e)}
											className="w-0 h-0"
										/>
									</label>
								) : (
									<div className=" rounded-3xl w-[260px] md:w-[350px] lg:w-[500px] p-4 flex flex-col gap-6 justify-center items-center">
										{!isImage ? (
											<video
												className="rounded-xl h-[475px] w-[260px] md:w-[420px] mt-16 bg-gray-700"
												controls
												loop
												src={contentAsset?.url}
											/>
										) : (
											<Image
												src={contentAsset?.url}
												alt="Image"
												className="rounded-xl w-[260px] md:w-[420px] h-[462px] mt-16 bg-gray-700"
												width={350}
												height={200}
											/>
										)}

										<div className=" flex justify-between gap-20">
											<p className="text-lg">{contentAsset.originalFilename}</p>
											<button
												type="button"
												className=" rounded-full bg-gray-200 text-red-400 p-2 text-xl cursor-pointer outline-none hover:shadow-md transition-all duration-500 ease-in-out"
												onClick={() => setContentAsset(undefined)}
											>
												<MdDelete />
											</button>
										</div>
									</div>
								)}
							</div>
						)}
					</div>
					{wrongFileType && (
						<p className="text-center text-xl text-red-400 font-semibold mt-4 w-[260px]">
							Please select an video file (mp4 or webm or ogg / png or jpg or
							jpeg)
						</p>
					)}
				</div>
				<div className="flex flex-col gap-3 pb-10">
					<label className="text-md font-medium ">Caption</label>
					<input
						type="text"
						value={caption}
						onChange={(e) => setCaption(e.target.value)}
						className="rounded lg:after:w-650 outline-none text-md text-black font-base border-2 border-gray-200 p-2"
					/>
					<label className="text-md font-medium ">Choose a topic</label>

					<select
						onChange={(e) => {
							setTopic(e.target.value);
						}}
						className="outline-none lg:w-650 border-2 border-gray-200 text-md text-black capitalize lg:p-4 p-2 rounded cursor-pointer"
					>
						{topics.map((item) => (
							<option
								key={item.name}
								className=" outline-none capitalize  text-gray-700 text-md p-2 hover:bg-slate-700"
								value={item.name}
							>
								{item.name}
							</option>
						))}
					</select>
					<div className="flex gap-6 mt-10">
						<button
							onClick={handleDiscard}
							type="button"
							className="border-gray-300 border-2 text-md font-medium p-2 rounded w-28 lg:w-44 outline-none"
						>
							Discard
						</button>
						<button
							disabled={contentAsset?.url ? false : true}
							onClick={handlePost}
							type="button"
							className="bg-[#F51997] text-white text-md font-medium p-2 rounded w-28 lg:w-44 outline-none"
						>
							{savingPost ? "Posting..." : "Post"}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Upload;
