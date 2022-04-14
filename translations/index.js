// Based on https://github.com/MBoittin/deepl-json-translation
// See available langs on https://www.deepl.com/fr/docs-api/translating-text/request/
const translate = require("deepl");
const fs = require("fs");
const dotenv = require("dotenv");
const yamlLoader = require("js-yaml");
const jsonToYaml = require("json-to-pretty-yaml");
dotenv.config();

const filePath = process.argv[2];
if (!filePath)
  throw new Error(
    `No file path provided as first argument (example: './fr.yaml')`
  );

const targetLang = process.argv[3];
if (!targetLang)
  throw new Error(`No lang provided as second argument (example: 'en')`);

const IGNORED_FIELDS = ["id", "key", "type", "link", "lang", "category"];
const targetPath = `../app/langs/${targetLang}.yaml`;
const free = true;

const { DEEPL_KEY } = process.env;
const jsonContent = yamlLoader.load(fs.readFileSync(filePath, "utf8"));

buffer(jsonContent, "test");

async function buffer(json, fileName) {
  await recursiveObjectTranslation(json);
  json = { ...json, lang: targetLang };
  const yaml = jsonToYaml.stringify(json);

  fs.writeFile(targetPath, yaml, function (err) {
    if (err) throw err;
    console.log("Saved!");
  });
}

async function recursiveObjectTranslation(object) {
  await Promise.all(
    Object.keys(object).map(async key => {
      if (
        !!object[key] &&
        typeof object[key] === "string" &&
        !IGNORED_FIELDS.includes(key)
      ) {
        try {
          const result = await translate({
            free_api: free,
            text: object[key],
            auth_key: DEEPL_KEY,
            target_lang: targetLang,
          });
          console.log(
            "translating",
            object[key],
            "\x1b[33mto\x1b[0m",
            result.data.translations[0].text
          );
          object[key] = result.data.translations[0].text;
        } catch (err) {
          console.error(err);
        }
      } else if (typeof object[key] === "object") {
        await recursiveObjectTranslation(object[key]);
      }
    })
  );
  return;
}
