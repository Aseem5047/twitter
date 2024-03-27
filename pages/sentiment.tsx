import React, { useState, useEffect } from "react";
import axios from "axios";
import Head from "next/head";
import Loader from "../components/Loader";

interface Prediction {
	text: string;
	sentiment: string;
}

const Sentiment = () => {
	const [tweets, setTweets] = useState([]);
	const [tweetCount, setTweetCount] = useState(6);
	const [selectedTweets, setSelectedTweets] = useState<string[]>([]);
	const [predictions, setPredictions] = useState<Prediction[]>([]);
	const [loading, setLoading] = useState(true);

	const [selectAll, setSelectAll] = useState(false);
	const [showResult, setShowResult] = useState(false);

	let defaultURL = "https://tweetsentiment.onrender.com";

	// http://127.0.0.1:5000"

	const fetchTweets = async () => {
		try {
			setLoading(true);
			const response = await axios.post(`${defaultURL}/random_tweets`, {
				count: tweetCount,
			});
			setSelectedTweets([]);
			// setPredictions([]);
			setLoading(false);
			return response.data;
		} catch (error) {
			console.error("Error fetching tweets:", error);
			setSelectedTweets([]);
			// setPredictions([]);
			setLoading(false);
			return [];
		}
	};

	const predictSentiment = async () => {
		try {
			setLoading(true);
			const response = await axios.post(`${defaultURL}/predict`, {
				tweets: selectedTweets,
			});
			setPredictions(response.data.results);
			setSelectedTweets([]);
			setShowResult(true);
			setSelectAll(false);
			setLoading(false);
		} catch (error) {
			console.error("Error fetching tweets:", error);
			setSelectedTweets([]);
			setLoading(false);
			return [];
		}
	};

	useEffect(() => {
		const fetchData = async () => {
			const fetchedTweets = await fetchTweets();
			fetchedTweets?.tweets?.length > 0 && setTweets(fetchedTweets.tweets); // Assuming 'tweets' is the key for tweets in the response
		};
		fetchData();
	}, [tweetCount]);

	const handleCountChange = (event: any) => {
		setTweetCount(event.target.value);
	};

	const handleSelectTweet = (index: number, currentSelectedTweet: any) => {
		let alreadyExists = selectedTweets.some(
			(tweet) => tweet === currentSelectedTweet
		);
		if (!alreadyExists) {
			setSelectedTweets([...selectedTweets, currentSelectedTweet]);
		} else {
			const updatedTweets = selectedTweets.filter(
				(tweet) => tweet !== currentSelectedTweet
			);
			setSelectedTweets(updatedTweets);
		}
	};

	const handleSelectAll = () => {
		setSelectAll((prev) => !prev);
		// If all are selected, deselect
		selectAll ? setSelectedTweets([]) : setSelectedTweets(tweets);
	};

	return (
		<>
			<Head>
				<title>Random Tweets</title>
				<meta name="description" content="Generated by create next app" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/twitter.ico" />
			</Head>
			{loading ? (
				<Loader />
			) : (
				<div className="relative flex flex-col h-full justify-start items-start px-4 w-full overflow-y-scroll no-scrollbar">
					<div className="sticky top-0 pb-4 z-10 bg-[#15202b] w-full">
						<div className="pt-4 flex w-full items-center justify-start gap-4">
							<p className="px-4 py-2 rounded-xl border-2 border-white w-fit text-base md:text-lg lg:text-xl">
								{showResult ? "Tweets Sentiments" : "Random Tweets"}
							</p>
							{!showResult && (
								<select
									className="outline-none border-2 border-gray-200 text-md capitalize p-2 rounded-xl cursor-pointer bg-transparent text-white hover:opacity-80"
									value={tweetCount}
									onChange={handleCountChange}
								>
									<option value="0">0</option>
									<option value="2">2</option>
									<option value="4">4</option>
									<option value="5">5</option>
									<option value="6">6</option>
									<option value="8">8</option>
									<option value="10">10</option>
									<option value="12">12</option>
									<option value="14">14</option>
									<option value="15">15</option>
									<option value="16">16</option>
									<option value="18">18</option>
									<option value="20">20</option>
								</select>
							)}
						</div>
					</div>
					{tweets?.length === 0 ? (
						<div className="flex h-[75vh] w-full items-center justify-center gap-4">
							<p className="p-7 rounded-xl border-2 border-white w-fit text-base md sm:text-xl 2xl:text-3xl">
								No Tweets Available Yet!
							</p>
						</div>
					) : (
						<>
							{showResult ? (
								<div
									className={`grid grid-cols-1 2xl:grid-cols-2 items-center gap-4 py-2 pb-7 w-full overflow-y-scroll no-scrollbar`}
								>
									{predictions &&
										predictions.map((prediction) => (
											<div
												className="flex flex-col gap-4 justify-between p-4 rounded-xl border-2 border-white h-full w-full min-h-[10rem] 2xl:min-h-[12rem] lg:max-h-56 overflow-y-scroll no-scrollbar"
												key={prediction.text}
											>
												<span>{prediction.text}</span>
												<span className="flex gap-2 items-center text-center">
													{prediction.sentiment}{" "}
													{prediction.sentiment === "Positive" ? (
														<svg
															xmlns="http://www.w3.org/2000/svg"
															fill="none"
															viewBox="0 0 24 24"
															strokeWidth={1.5}
															stroke="currentColor"
															className="w-6 h-6"
														>
															<path
																strokeLinecap="round"
																strokeLinejoin="round"
																d="M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z"
															/>
														</svg>
													) : prediction.sentiment === "Negative" ? (
														<svg
															xmlns="http://www.w3.org/2000/svg"
															fill="none"
															viewBox="0 0 24 24"
															strokeWidth={1.5}
															stroke="currentColor"
															className="w-6 h-6"
														>
															<path
																strokeLinecap="round"
																strokeLinejoin="round"
																d="M15.182 16.318A4.486 4.486 0 0 0 12.016 15a4.486 4.486 0 0 0-3.198 1.318M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z"
															/>
														</svg>
													) : (
														<svg
															xmlns="http://www.w3.org/2000/svg"
															fill="none"
															viewBox="0 0 24 24"
															strokeWidth={1.5}
															stroke="currentColor"
															className="w-6 h-6"
														>
															<path
																strokeLinecap="round"
																strokeLinejoin="round"
																d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z"
															/>
														</svg>
													)}
												</span>
											</div>
										))}
								</div>
							) : (
								<ul className="py-4 grid grid-cols-1 lg:grid-cols-2 3xl:grid-cols-3 gap-4">
									{tweets?.map((tweet, index) => (
										<li
											key={tweet + index}
											className={`min-h-[10rem] max-h-52 overflow-y-scroll no-scrollbar px-4 py-2 rounded-xl border-2 border-white w-full hover:opacity-80 cursor-pointer whitespace-pre-wrap break-words ${
												selectedTweets.some(
													(selectedTweet) => selectedTweet === tweet
												) && "opacity-50"
											}`}
											onClick={() => handleSelectTweet(index, tweet)}
										>
											{tweet}
										</li>
									))}
								</ul>
							)}

							<div className="sticky bottom-3 s:bottom-0 pt-4 pb-2 lg:pt-4 lg:pb-7 bg-[#15202b] w-full flex items-center justify-center">
								{selectedTweets.length > 0 && !showResult ? (
									<div className="flex gap-4 items-center flex-wrap w-full justify-center">
										<button
											className="border-2 border-white px-4 py-2 rounded-xl text-sm sm:text-base lg:text-xl hover:opacity-80 flex gap-1 items-center justify-center"
											onClick={predictSentiment}
										>
											<span>Predict</span>
											<span className="hidden sm:block">Sentiment</span>
										</button>
										<button
											className="border-2 border-white px-4 py-2 rounded-xl text-sm sm:text-base lg:text-xl hover:opacity-80"
											onClick={handleSelectAll}
										>
											{selectAll ? "Unselect" : "Select All"}
										</button>
									</div>
								) : (
									showResult && (
										<button
											className="border-2 border-white px-4 py-2 rounded-xl text-sm sm:text-xl hover:opacity-80"
											onClick={() => setShowResult(false)}
										>
											Analyse Other Tweets
										</button>
									)
								)}
							</div>
						</>
					)}
				</div>
			)}
		</>
	);
};

export default Sentiment;
