This is a NodeJS script used to generate YAML questions file from Notion database.

## Install

```bash
git clone https://github.com/octree-gva/civic-echo.git civic-echo
cd civic-echo/notion-yaml
yarn
```

## Setup

### Questions on Notion

This script must target a database on Notion with survey's questions, referenced by its ID.
This database must match to a fixed structure. Eventually, the expected structure could be updated by editing `index.mjs`.

**Default structure**:

- `Question`: Title for the question.
- `Description`: Arbitrary text field for the question.
- `Catégorie`: Category / context of the question.
- `Type`: Type of the question for frontend generation. See below for possible types.
- `Hyperlien`: URL to use for a question of type _Bouton_
- `Réponses`: List of possible responses for a question of type _Choix unique_ (CSV format)
- `Ordre`: Question order index for frontend display

Possible types:

- `Swipe`: Yes/No response
- `Choix unique`: Item to select from a list
- `Triage`: List of items to sort
- `Champ text`: Text to enter
- `Bouton`: Call to action (not a question)
- `Iframe`: URL for an iframe integration

### Locales on Notion

This script can also generate locales for static strings on frontend, provided from Notion.
To use this, it must target another database on Notion with the following structure:

- `Clé`: String identifier used by i18n on frontend
- `Valeur`: Content in the default language

> The expected structure could be updated in `index.mjs`.

### Tool configuration

All configuration is provided throught environement variables.
The [Dotenv](https://www.dotenv.org/) mechanism could be used.

- `NOTION_TOKEN` (required): A Notion API token. See [Notion documention](https://developers.notion.com/docs/getting-started) to know how to have one.
- `NOTION_QUESTIONS_DBID` (required): Notion Database ID with the questions
- `NOTION_LOCALES_DBID`: Notion Database ID with the locales
- `DESTINATION_PATH`: Path of the generated YAML file
- `DEFAULT_LANG`: Default language for the generated file

**Configuration example in .env**:

```.env
NOTION_TOKEN=secret_XXXXXXXXXXXXXXXXXXXXXXXXXXX
NOTION_LIST_ID=74382f50e279463ba7043fa2xxxxxxxx
DESTINATION_PATH=./questions.yml
DEFAULT_LANG=fr
```

## Run

```bash
yarn start
```

If execution succeeds, a YAML file is created locally.
