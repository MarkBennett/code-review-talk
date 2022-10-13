import { ensureDir, expandGlob } from "https://deno.land/std@0.159.0/fs/mod.ts";
import { LoremIpsum } from "npm:lorem-ipsum";

const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 8,
    min: 4,
  },
  wordsPerSentence: {
    max: 16,
    min: 4,
  },
});

const generateRandomFileBody: () => string = () =>
  lorem.generateParagraphs(3).split("\n").join("\n\n");

// Make the directory to store the files in
await ensureDir("./files");

// Open a few hundred files and randomly insert new paragraphs and new sentences
const paths = [];
for await (const file of expandGlob("./files/*.md")) {
  paths.push(file.path);
}
const randomPaths = [];
for (let i = 0; i < 400; i++) {
  const randomIndex = Math.floor(paths.length * Math.random());
  randomPaths.push(paths[randomIndex]);
  paths.splice(randomIndex, 1);
}

randomPaths.forEach((path) => {
  const content = Deno.readTextFileSync(path);
  const lines = content.split("\n").filter((line) => line.trim() === "");
  const randomIndex = Math.floor(lines.length * Math.random());
  lines.splice(randomIndex, 0, lorem.generateParagraphs(1));
  const newContent = lines.join("\n\n").trim() + "\n";
  Deno.writeTextFileSync(path, newContent);
});

// Create new 1000 files in the directory
// for (let i = 1000; i < 2000; i++) {
//   const path = `./files/${i}.md`;
//   Deno.writeTextFileSync(path, generateRandomFileBody());
// }
