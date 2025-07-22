import React from "react";
import { BiCommentX } from "react-icons/bi";

interface IProps {
	text: string;
	coverScreen?: boolean;
}

const NoResults = ({ text, coverScreen = true }: IProps) => {
	return (
		<div
			className={`flex flex-col justify-center items-center ${
				coverScreen ? "h-[calc(100vh-10rem)]" : "h-full"
			}
 w-full overflow-hidden`}
		>
			<p className="text-8xl mb-2">
				<BiCommentX />
			</p>
			<p className="text-lg text-center">
				<span className="text-lg md:text-2xl">{text}</span> <br /> <br /> Upload
				the Post & Be First to do <br /> add the comment or Like the Post.
			</p>
		</div>
	);
};

export default NoResults;
