import { Octokit } from "octokit";
import { parseFile } from "../utilities/file.js";

const accessToken = { auth: process.env.GITHUB_ACCESS_TOKEN };

const author = {
	name: process.env.OWNER,
	email: `${process.env.GITHUB_USERNAME}@users.noreply.github.com`,
};

export async function listFiles() {
	const octokit = new Octokit(accessToken);

	const files = await octokit.rest.repos.getContent({
		owner: process.env.GITHUB_USERNAME,
		repo: process.env.GITHUB_REPOSITORY,
		path: process.env.CONTENT_PATH,
	});
	return files;
}

export async function getFile(path) {
	const octokit = new Octokit(accessToken);

	const file = await octokit.rest.repos.getContent({
		owner: process.env.GITHUB_USERNAME,
		repo: process.env.GITHUB_REPOSITORY,
		path,
	});

	return { ...file };
}

export async function commitFile(message, frontmatter, content, path, sha) {
	const octokit = new Octokit(accessToken);

	const data = `---\n${frontmatter}\n---\n${content}`;
	const octokitOptions = {
		owner: process.env.GITHUB_USERNAME,
		repo: process.env.GITHUB_REPOSITORY,
		path,
		message,
		content: btoa(data),
		committer: author,
		author,
	};

	// If the fileSha has a value, then add it to the options.
	if (sha) {
		octokitOptions.sha = sha;
	}

	try {
		await octokit.rest.repos.createOrUpdateFileContents(octokitOptions);
		return { committed: true };
	} catch (error) {
		console.error("Error fetching from GitHub:", error);
		return { committed: false, error };
	}
}
