import type { NextApiRequest, NextApiResponse } from "next";

import { searchPostsQuery } from "../../../utils/queries";
import { client } from "../../../utils/client";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method === "GET") {
		const { term } = req.query;

		const contentQueries = searchPostsQuery(term!);

		const contents = await client.fetch(contentQueries);

		res.status(200).json(contents);
	}
}
