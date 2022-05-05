This is a NodeJS script to translate YAML formated file with DeepL to arbitrary language.

## Install

```bash
git clone https://github.com/octree-gva/civic-echo.git civic-echo
cd civic-echo/translations
yarn
```

## Setup

1. [Create a developer account on DeepL](https://www.deepl.com/fr/pro#developer) and get an API Key
2. Copy `.env.sample` to `.env` and add your API KEY
3. Eventually, adapt constants in `index.js`

## Run

Get a YAML file with questions (see [tool](../notion-yaml/README.md)) and run script:

```bash
node index <questions YAML file> <destination language>
```

Example:

```bash
node index fr.yaml de
```

Then, a `de.yaml` file is created in NextJS app direction `langs`, ready to be used.
