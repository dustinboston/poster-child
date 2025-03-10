import { Router } from "express";

import { commitFile, getFile, listFiles } from "../services/github.js";
import errorHandler from "../utilities/errors.js";
import {
	formatFileLinks,
	formatFrontmatter,
	parseFile,
} from "../utilities/file.js";

const router = Router();

/* Return a list of files for the configured repo and path. */
router.get("/", async (req, res, next) => {
	try {
		const files = await listFiles();
		if (!files.data) {
			throw new Error("List files data was missing from GitHub response.");
		}

		const fileLinksHtml = formatFileLinks(files.data);

		// If there isn't a query string parameter of `file`, end early
		if (!req.query.file) {
			return res.render("index", {
				files: fileLinksHtml,
				currentFile: {},
			});
		}

		// Don't allow random paths. It must be in the list of actual paths.
		const hasPath = files.data.some((file) => file.path === req.query.file);
		const currentFile = {};
		if (hasPath) {
			const file = await getFile(req.query.file);

			if (file?.data) {
				currentFile.sha = file.data.sha;
				const decoded = atob(file.data.content);
				const parsed = parseFile(decoded);
				currentFile.frontmatter = parsed.frontmatter;
				currentFile.content = parsed.content;
			} else {
				throw new Error("File data was missing from GitHub response.");
			}
		}

		res.render("index", {
			files: fileLinksHtml,
			currentFile,
		});
	} catch (error) {
		console.error(error);
		res.status(500).send("An unexpected error occurred.");
		return next();
	}
});

router.post("/", async (req, res) => {
	try {
		if (!req.body.content || !req.body.sha || !req.query.file) {
			return res.status(400).send("Missing required fields in request body");
		}

		const { content, frontmatter, path, sha } = formatFrontmatter(
			req.query.file,
			req.body,
		);

		const message = `feat: Add note "${title}"`;
		const status = await commitFile(message, frontmatter, content, path, sha);

		if (!status.committed) {
			res.status(500).send("The commit failed.");
		}

		res.status(303).location(`/?file=${path}`).send();
	} catch (error) {
		console.error(error);
		res.status(500).send("An unexpected error occurred.");
	}
});

router.use(errorHandler);

export default router;
