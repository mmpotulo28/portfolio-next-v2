import fs from "fs";
import path from "path";
import { NextApiRequest, NextApiResponse } from "next";

const BASE_URL = "https://manelisim.vercel.app";
const SITEMAP_PATH = path.join(process.cwd(), "public", "sitemap.xml");

const generateSiteMap = (routes: string[]) => {
	const lastmod = new Date().toISOString().split("T")[0];
	const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
	${routes
		.map(
			(route) => `
		<url>
			<loc>${BASE_URL}${route}</loc>
			<lastmod>${lastmod}</lastmod>
			<changefreq>${route === "/" ? "daily" : "weekly"}</changefreq>
			<priority>${route === "/" ? "1.0" : "0.8"}</priority>
		</url>
	`,
		)
		.join("")}
</urlset>`;
	return sitemap;
};

const getAllRoutes = async () => {
	const pagesDir = path.join(process.cwd(), ".next", "server", "pages");
	const pageFiles = fs.readdirSync(pagesDir);

	const routes = pageFiles
		.filter((file) => file.endsWith(".html") && !file.startsWith("_"))
		.map((file) => {
			const route = file.replace(/\.html$/, "");
			return route === "index" ? "/" : `/${route}`;
		});

	return routes;
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method !== "GET") {
		return res.status(405).json({ message: "Method not allowed. Please use GET method." });
	}

	try {
		const routes = await getAllRoutes();
		const sitemap = generateSiteMap(routes);
		fs.writeFileSync(SITEMAP_PATH, sitemap);

		res.setHeader("Content-Type", "application/xml");
		res.status(200).send(sitemap);
	} catch (error) {
		res.status(500).json({ message: error });
	}
};

export default handler;
