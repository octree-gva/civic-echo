import { Client } from "@notionhq/client";

const { NOTION_TOKEN } = process.env;

const notionClient = new Client({
  auth: NOTION_TOKEN,
});

export const insertIntoDatabase = async (
  databaseId: string,
  properties: any
) => {
  try {
    const response = await notionClient.pages.create({
      parent: {
        database_id: databaseId,
      },
      properties,
    });
    return response;
  } catch (error: any) {
    console.error(
      `ERROR: Can't add into database ${databaseId}: `,
      error?.message || error
    );
    console.error(error);
  }
};
