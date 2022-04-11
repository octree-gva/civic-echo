import type { NextApiRequest, NextApiResponse } from "next";
import { MongoClient } from "mongodb";
import { DateTime } from "luxon";
import * as Notion from "../../lib/notion";

const { MONGO_URL = "", MONGO_DB = "survey", NOTION_DBID } = process.env;
const COLLECTION_NAME = "responses";
const AUTHORIZED_SOURCE = ["direct", "share", "iframe", "other"];

const mongoDB = new MongoClient(MONGO_URL);

type DataResponse = {
  datetime: string;
  responses: object;
};

type ResponseContext = {
  datetime: string;
  lang: string;
  completeForm?: boolean;
  source: string;
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const {
      person,
      responses,
      completeForm,
      lang,
      src = "direct",
    } = req.body || {};
    const datetime = DateTime.now().toISO();
    const source = AUTHORIZED_SOURCE.includes(src) ? src : "other";
    const context = { datetime, lang, completeForm, source };
    const response: DataResponse & ResponseContext = {
      responses: formatResponses(responses),
      ...context,
    };
    await insertResponse(response);
    await insertPerson(person, context);
    res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(400).json({ success: false });
  }
};

const insertResponse = async (response: DataResponse) => {
  await mongoDB.connect();
  const db = mongoDB.db(MONGO_DB);
  const collection = db.collection(COLLECTION_NAME);

  try {
    await collection.insertOne(response);
  } catch (error) {
    console.error(error);
  }
  mongoDB.close();
};

const insertPerson = async (person: Person, context: ResponseContext) => {
  if (!NOTION_DBID) {
    console.warn(`No NOTION_DBID provided`);
    return null;
  }

  if (!person?.email) return null;

  const properties = {
    ["Nom"]: {
      title: [
        {
          text: {
            content: person.name,
          },
        },
      ],
    },
    ["Email"]: {
      email: person.email,
    },
    ["Date de naissance"]: {
      date: {
        start: person.birthdate,
      },
    },
    ["Répondu le"]: {
      date: {
        start: context.datetime,
      },
    },
    ["Langue"]: {
      select: {
        name: context.lang,
      },
    },
    ["Notifications"]: {
      checkbox: person.acceptNotif,
    },
    ["Totalité"]: {
      checkbox: !!context.completeForm,
    },
    ["Source"]: {
      select: {
        name: context.source,
      },
    },
  };

  return Notion.insertIntoDatabase(NOTION_DBID, properties);
};

const formatResponses = (responses: FormResponse[]) =>
  responses?.reduce(
    (acc, response) => ({ ...acc, [response.questionId]: response.content }),
    {}
  );

export default handler;
