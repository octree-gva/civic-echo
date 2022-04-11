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
  responses?: string[];
};

type FormResponse = {
  questionId: string;
  content: number | string;
};

type Person = {
  name?: string;
  email?: string;
  birthdate?: DateTime;
  acceptNotif?: boolean;
};
