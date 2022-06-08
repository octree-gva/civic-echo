import { Client } from "@notionhq/client";
import dotenv from "dotenv";

dotenv.config();
const { NOTION_TOKEN } = process.env;

const notionClient = new Client({
  auth: NOTION_TOKEN,
});

export const getProp = (notionItem, propertyName) => {
  const property = notionItem.properties[propertyName];
  if (!property)
    throw new Error(
      `Property named "${propertyName}" is missing in notion page ${notionItem.object} (#${notionItem?.id})`
    );
  switch (property.type) {
    case "text":
      return property.plain_text;
    case "rich_text":
      return parseRichText(property.rich_text);
    case "title":
      return property.title?.[0]?.plain_text;
    case "number":
      return property.number;
    case "select":
      return property.select?.name;
    case "multi_select":
      return property.multi_select.map(item => item.name).join(",");
    case "date":
      return property.date;
    case "url":
      return property.url;
    case "checkbox":
      return property.checkbox;
    default:
      return property;
  }
};

export const getDatabase = async (databaseId, options = {}) => {
  let response = await queryDatabase(databaseId, options);
  let results = response.results;

  while (response.has_more) {
    response = await queryDatabase(
      databaseId,
      { filter, sorts },
      response.next_cursor
    );
    results = [...results, ...response.results];
  }
  return results;
};

const queryDatabase = async (databaseId, options = {}, start_cursor) => {
  try {
    const { filter, sorts } = options;
    const response = await notionClient.databases.query({
      database_id: databaseId,
      start_cursor,
      filter,
      sorts,
    });
    console.log(
      `Got ${response?.results.length} results from db ${databaseId}`
    );
    return response;
  } catch (error) {
    console.error(
      `ERROR: Can't get database ${databaseId}: `,
      error?.message || error
    );
    console.error(error);
  }
};

const parseRichText = (richTextParts = []) =>
  richTextParts
    .map(part => {
      if (part.href) return `[${part.plain_text}](${part.href})`;
      return part.plain_text;
    })
    .join("");
