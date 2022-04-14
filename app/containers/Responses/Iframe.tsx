import Box from "@mui/material/Box";

interface Props {
  question: FormQuestion;
}

const Iframe = (props: Props) => {
  const { question } = props;
  return (
    <Box height="60vh">
      <iframe
        src={question.link}
        frameBorder="0"
        width="100%"
        height="100%"
        allowTransparency
      ></iframe>
    </Box>
  );
};

export default Iframe;
