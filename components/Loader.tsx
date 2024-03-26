import Image from "next/image";
import React from "react";

const Loader = () => {
	return (
		<>
			<div className="h-screen flex items-center justify-center">
				<Image
					src="https://cdn.dribbble.com/users/1813781/screenshots/5597337/dribbble-girl-with-clock.gif"
					alt=""
					className="m-auto rounded-xl w-80 h-60"
					width={320}
					height={240}
				/>
			</div>
		</>
	);
};

export default Loader;
