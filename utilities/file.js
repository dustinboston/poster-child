import YAML from "yaml";

const contentPath = process.env.CONTENT_PATH; // Should be a directory.

export function formatFileLinks(files) {
	if (!files) return "";

	return files
		.filter((file) => file.type === "file")
		.map((file) => `<li><a href="/?file=${file.path}">${file.name}</a></li>`)
		.join("\n");
}

export function formatFrontmatter(file, body) {
	const content = body.content.trim();

	// Get date in the format YY-MM-DD
	const today = new Date();
	const year = today.getFullYear().toString().slice(2);
	const month = String(today.getMonth() + 1).padStart(2, "0");
	const day = String(today.getDate()).padStart(2, "0");

	const slug = `${year}${month}${day}.md`;
	const path = file || `${contentPath}/${slug}`;

	const sha = body.sha;
	const frontmatter = YAML.stringify({
		categories: body.categories,
		date: body.date || `${year}-${month}-${day}`,
		description: body.description,
		draft: body.draft,
		keywords: body.keywords,
		slug: body.slug || `${year}${month}${day}.md`,
		tags: body.tags,
		title: body.title,
	});
	return { content, frontmatter, path, sha };
}

export function parseFile(content) {
	const frontmatter = content.split("---")[1] ?? "";
	const markup = content.split("---")[2] ?? "";

	return {
		content: markup.trim(),
		frontmatter: YAML.parse(frontmatter),
	};
}
