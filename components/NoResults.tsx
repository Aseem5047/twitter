import React from "react";
import { BiCommentX } from "react-icons/bi";

interface IProps {
	text: string;
}

const NoResults = ({ text }: IProps) => {
	return (
		<div className="flex flex-col justify-center items-center h-full w-full ">
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
