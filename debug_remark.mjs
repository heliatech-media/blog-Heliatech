import fs from 'fs';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

async function run() {
  const fileContents = fs.readFileSync('src/content/articles/sujet-3.md', 'utf8');
  const matterResult = matter(fileContents);
  const processedContent = await remark().use(html).process(matterResult.content);
  console.log(processedContent.toString().substring(0, 1000));
}
run();
