NodeJS app for Civic-echo based on NextJS & MaterialUI.

Responses data are saved to a MongoDB database and personal data could be saved to a Notion database.

## Install

```bash
git clone https://github.com/octree-gva/civic-echo.git civic-echo
cd civic-echo/app
yarn
```

## Setup

### Environment variable

Using a `.env` or any other way to provide environement variable, set these variables:

- `MONGO_URL`: URL to connect to a MongoDB database
- `NOTION_DBID`: Notion database ID to store the personal data
- `NOTION_TOKEN`: Notion's token to communicate with the API

The Notion database must have, at least, following fields:

- `Email` (email): Email of the respondent
- `NPA` (rich text): postal code
- `Répondu le` (date): Date of response
- `Langue` (select): Respondent's language
- `Notifications` (checkbox): If the respondent wants to receive newsletters
- `Totalité` (checkbox): If the respondent has answered all questions
- `Source` (select): How the respondent came to the survey

> Field names could be adapted in `pages/api/response.ts`.

### Specific frontend configuration

Specific configurations must be set in `config/index.ts`.

> Currently, it's not a proper way to store specific configurations. We will work on it.

### Languages

At build time, it will search for languages config in `/langs` directory.
To add a new lang, add its YAML config in `/langs`, update `/langs/index.ts` and rebuild.

## Start

**Development:**

```bash
yarn dev
```

**Production:**

```bash
yarn start # Will run 'yarn install' & 'yarn build'
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).
