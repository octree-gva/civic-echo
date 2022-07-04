# Civic Echo

Civic Echo is a light app used for dynamic survey generation based on YAML files.
Coupled with DeepL, it can handle multiple languages easily.

It is initiated for [demaincestaujourdhui.online](https://www.demaincestaujourdhui.online/),
led by [Genève en Transition](https://www.ge.ch/teaser/geneve-transition)
and [Grand Genève en transition](https://www.grand-geneve.org/grand-geneve-en-transition/).

## How does it work ?

### 1. Create questions in a YAML file for each language

Civic Echo uses a standardized YAML file format to describe questions and locales for a specific language.
See [langs](/app/langs/) directory for examples of YAML files.

We provide some tools to help you generate YAML files:

- [notion-yaml](https://github.com/octree-gva/civic-echo-tools/notion-yaml): Generate a YAML file from a database in [Notion](https://www.notion.so/).
- [translations](https://github.com/octree-gva/civic-echo/tree/main/translations): Translate an input YAML file to another language using [DeepL](https://www.deepl.com).

### 2. Provide the YAML files to the app

Put the YAML files in the `app/langs` directory and update the `index.ts` to add languages detection.

> This step is a bit cumbersome. If you want to help us improve it, we are open to contributions.

```
app/
  ...
  langs/
    index.ts
    de.yaml
    en.yaml
    fr.yaml
    pt.yaml
```

```typescript
# app/langs/index.ts
import fr from "./fr.yaml";
import en from "./en.yaml";
import de from "./de.yaml";
import pt from "./pt.yaml";

export const LANGS = ["fr", "en", "pt", "de"];

const langs: LangContent[] = [fr, en, de, pt];

export const getLangContent = (targetLang: string) => {
  return langs.find(lang => lang.lang === targetLang);
};

export default langs;
```

### 3. Adapt configuration

You can set some configurations in `app/config/index.ts` to adapt to your use case.
[See example](/app//config/index.ts).

### 4. Run the app

```bash
yarn start # or 'npm start'
```

This command will install dependencies, build app and start it.
