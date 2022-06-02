import fs from "fs";
import dotenv from "dotenv";
import YAML from "json-to-pretty-yaml";
import * as Notion from "./notion.mjs";
import { formatResponses, removeEmptyKeys } from "./format.mjs";

dotenv.config();
const {
  NOTION_QUESTIONS_DBID,
  NOTION_LOCALES_DBID,
  DESTINATION_PATH = "./questions.yml",
  DEFAULT_LANG = "fr",
} = process.env;

const notionQuestions = await Notion.getDatabase(NOTION_QUESTIONS_DBID, {
  sorts: [
    {
      property: "Ordre",
      direction: "ascending",
    },
  ],
});
const questions = notionQuestions
  .map(notionQuestion =>
    removeEmptyKeys({
      id: notionQuestion.id,
      title: Notion.getProp(notionQuestion, "Question"),
      description: Notion.getProp(notionQuestion, "Description"),
      category: Notion.getProp(notionQuestion, "Catégorie"),
      type: Notion.getProp(notionQuestion, "Type"),
      link: Notion.getProp(notionQuestion, "Hyperlien"),
      responses: formatResponses(Notion.getProp(notionQuestion, "Réponses")),
      random: Notion.getProp(notionQuestion, "Aléatoire"),
    })
  )
  .filter(question => !!question.title);

let locales = {};
if (NOTION_LOCALES_DBID) {
  const notionLocales = await Notion.getDatabase(NOTION_LOCALES_DBID);
  locales = notionLocales.reduce(
    (acc, notionLocale) => ({
      ...acc,
      [Notion.getProp(notionLocale, "Clé")]: Notion.getProp(
        notionLocale,
        "Valeur"
      ),
    }),
    {}
  );
}

const jsonContent = {
  lang: DEFAULT_LANG,
  locales,
  questions,
};

const yamlContent = YAML.stringify(jsonContent);

fs.writeFileSync(DESTINATION_PATH, yamlContent);

console.log(`YAML questions written to ${DESTINATION_PATH}`);
