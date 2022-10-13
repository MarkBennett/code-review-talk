import { LoremIpsum } from "npm:lorem-ipsum";
import { ensureDir } from "https://deno.land/std/fs/mod.ts/";

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

// Create 1000 files in the directory
for (let i = 0; i < 1000; i++) {
  const path = `./files/${i}.md`;
  Deno.writeTextFileSync(path, generateRandomFileBody());
}
