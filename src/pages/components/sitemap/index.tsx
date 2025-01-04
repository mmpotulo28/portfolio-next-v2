import React, { useEffect, useState } from "react";

const Sitemap: React.FC = () => {
	console.log("sitemap");
	const [res, setRes] = useState("");

	const fetchData = async () => {
		try {
			setRes("fetching sitemap endpoint");
			console.log("fetching sitemap endpoint");
			const response = await fetch("/api/sitemap", {
				method: "GET",
			});
			console.log(response);
			setRes(response.statusText);
		} catch (error) {
			console.error("could not generate Sitemap", error);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<>
			<span>{res} </span>
			<button onClick={fetchData}>generate</button>
		</>
	);
};

export default Sitemap;
