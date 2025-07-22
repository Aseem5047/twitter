import type { NextApiRequest, NextApiResponse } from "next";

import {
	singleUserQuery,
	userCreatedPostsQuery,
	userLikedPostsQuery,
} from "../../../utils/queries";
import { client } from "../../../utils/client";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method === "GET") {
		const { id } = req.query;

		const query = singleUserQuery(id!);
		const userContentQuery = userCreatedPostsQuery(id!);
		const userLikedContentQuery = userLikedPostsQuery(id!);

		const user = await client.fetch(query);
		const userContent = await client.fetch(userContentQuery);
		const userLikedContent = await client.fetch(userLikedContentQuery);

		const data = { user: user[0], userContent, userLikedContent };

		res.status(200).json(data);
	}
}
