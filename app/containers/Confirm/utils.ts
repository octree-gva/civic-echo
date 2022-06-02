export const parseUrl = (text: string, replacedText: string, url: string) =>
  text.replace(
    replacedText,
    `<a href='${url}' style='text-decoration:underline;'>${replacedText}</a>`
  );
