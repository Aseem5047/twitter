import React from "react";
import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";

import { topics } from "../utils/constants";

const Discover = () => {
	const router = useRouter();
	const { topic } = router.query;

	const activeTopicStyle =
		" hover:opacity-[0.7]  px-3 py-2 rounded xl:rounded-full flex items-center gap-2 justify-start cursor-pointer text-blue-400";
	const topicStyle =
		" hover:opacity-[0.7]  px-3 py-2 rounded xl:rounded-full flex items-center gap-2 justify-start cursor-pointer text-white";
	return (
		<div className="xl:border-b-2 xl:border-gray-200 pb-6">
			<p className="text-gray-300 font-semibold m-3 mt-4 hidden xl:block">
				Trending Topics
			</p>
			<div className="flex flex-col lg:flex-row flex-wrap gap-2">
				{topics?.map((item) => (
					<Link href={`/?topic=${item?.name}`} key={item.name}>
						<div
							className={topic === item.name ? activeTopicStyle : topicStyle}
						>
							<span className="font-bold text-2xl xl:text-lg ">
								{item.icon}
							</span>
							<span className="font-medium text-base hidden md:block capitalize">
								{item.name}
							</span>
						</div>
					</Link>
				))}
			</div>
		</div>
	);
};

export default Discover;
