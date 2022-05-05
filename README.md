# Civic-echo

Civic-echo is a light app used for dynamic survey generation based on YAML files.
Coupled with DeepL, it could handle multiple languages easily.

It was first developed for [demaincestaujourdhui.online](https://www.demaincestaujourdhui.online/),
supported by [Genève en Transition](https://www.ge.ch/teaser/geneve-transition)
and [Grand Genève en transition](https://www.grand-geneve.org/grand-geneve-en-transition/).

## How does it work ?

### 1. Create questions in a YAML file

Civic-echo used a standardized YAML file format to describe questions.
With `notion-yaml` tools, it can generate a YAML file from Notion databases.

See [notion-yaml](/notion-yaml/README.md) for documentation.

### 2. Translate the questions

A NodeJS script in `translations` directory allows to translate a source YAML file to
other languages using DeepL. You need a DeepL account with an API key to do so.

See [translations](/translations/README.md) for documentation.

### 3. Generate the survey

The `app` directory consumes YAML files to generate a survey in a WebApp.

See [app](/app/README.md) for documentation.
