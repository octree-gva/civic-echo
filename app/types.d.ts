declare module "*.yaml" {
  const data: Lang;
  export default data;
}

type LangContent = {
  lang: string;
  locales: object;
  questions: FormQuestion[];
};

type FormQuestion = {
  id: string;
  title: string;
  description?: string;
  category: string;
  type: string;
  link?: string;
  responses?: string | KeyValueResponse[];
};

type FormResponse = {
  questionId: string;
  content: number | string | string[];
};

type KeyValueResponse = {
  key: string;
  value: string;
};

type Person = {
  npa?: string;
  email?: string;
  completeForm?: boolean;
  acceptNotif?: boolean;
};
