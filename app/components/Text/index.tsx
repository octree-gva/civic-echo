import Typography, { TypographyProps } from "@mui/material/Typography";

const Text = (props: TypographyProps) => {
  const { children, ...typoProps } = props;
  return (
    <Typography
      {...typoProps}
      dangerouslySetInnerHTML={{
        __html: parseText(`${children}`),
      }}
    />
  );
};

const parseText = (text: string): string => {
  const link = text.match(/\[(.*?)\]\((\S*?)\)/);

  if (link) {
    return parseText(
      text.replace(
        link[0],
        `<a href='${link[2]}' target='_blank' style='text-decoration:underline;'>${link[1]}</a>`
      )
    );
  }

  return text
    .split("\n")
    .map(line => `<p >${line}</p>`)
    .join("");
};

export default Text;
