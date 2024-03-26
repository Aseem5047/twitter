import Image from "next/image";
import React from "react";

const Loader = () => {
	return (
		<>
			<div className="h-[85vh] flex items-center justify-center">
				<Image
					src="https://cliply.co/wp-content/uploads/2019/07/371907030_TWITTER_ICON_400px.gif"
					alt=""
					className="m-auto rounded-xl w-80 h-72"
					width={320}
					height={288}
				/>
			</div>
		</>
	);
};

export default Loader;
