import Image from "next/image";
import React from "react";

const Chats = () => {
	return (
		<div className="flex justify-center align-center w-full h-full">
			<Image
				src="https://miro.medium.com/v2/resize:fit:1358/1*zBFBJktPD3_z0S_35kO5Hg.gif"
				alt=""
				height={75}
				width={75}
				className="flex-grow rounded-lg h-[85%]"
			/>
		</div>
	);
};

export default Chats;
