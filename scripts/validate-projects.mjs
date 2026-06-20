import { access } from "node:fs/promises";
import { resolve } from "node:path";
import { projects } from "../src/data/projects.js";

const requiredFields = [
  "title",
  "type",
  "description",
  "ownership",
  "repositoryVisibility",
  "image",
  "mediaType",
  "goal",
  "challenge",
  "contribution",
  "outcome",
  "architecture",
  "validation",
];

const titles = new Set();

for (const project of projects) {
  for (const field of requiredFields) {
    if (!project[field]) throw new Error(`${project.title || "Untitled project"} is missing ${field}`);
  }
  if (titles.has(project.title)) throw new Error(`Duplicate project title: ${project.title}`);
  titles.add(project.title);

  if (!Array.isArray(project.tech) || project.tech.length < 2) {
    throw new Error(`${project.title} needs at least two technologies`);
  }
  if (!Array.isArray(project.evidence) || project.evidence.length === 0) {
    throw new Error(`${project.title} needs at least one evidence source`);
  }
  if (project.image.startsWith("/")) {
    await access(resolve("public", project.image.slice(1)));
  }
}

console.log(`Validated ${projects.length} portfolio projects.`);
