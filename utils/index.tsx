import axios from "axios";
import jwt_decode from "jwt-decode";

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const createOrGetUser = async (response: any, addUser: any) => {
	const decoded: { name: String; picture: String; sub: String; email: String } =
		jwt_decode(response.credential);

	// const info = jwt_decode(response.credential);
	// console.log(info);

	const { name, picture, sub, email } = decoded;

	const user = {
		_id: sub,
		_type: "user",
		userName: name,
		image: picture,
		email: email,
	};

	addUser(user);
	await axios.post(`${BASE_URL}/api/auth`, user);
};
