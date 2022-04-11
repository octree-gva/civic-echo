import type { NextApiRequest, NextApiResponse } from "next";
import { MongoClient } from "mongodb";
import { DateTime } from "luxon";

const { MONGO_URL = "", MONGO_DB = "survey" } = process.env;
const COLLECTION_NAME = "responses";

const mongoDB = new MongoClient(MONGO_URL);

type DataResponse = {
  datetime: string;
  responses: object;
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { person, responses } = req.body || {};
    const datetime = DateTime.now().toISOTime();
    const response: DataResponse = {
      responses: formatResponses(responses),
      datetime,
    };
    await insertResponse(response);
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

const formatResponses = (responses: FormResponse[]) =>
  responses?.reduce(
    (acc, response) => ({ ...acc, [response.questionId]: response.content }),
    {}
  );

export default handler;
