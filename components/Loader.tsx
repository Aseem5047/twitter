import Image from "next/image";
import React from "react";

const Loader = () => {
	return (
		// src="https://i.pinimg.com/originals/29/38/a3/2938a3b0772876c56082d65731c23692.gif"
		<>
			<div className="h-[85vh] flex items-center justify-center">
				<Image
					src="/twitter.gif"
					alt="Loading"
					className="m-auto rounded-xl"
					width={120}
					height={110}
				/>
			</div>
		</>
	);
};

export default Loader;
