import { useReducer } from "react";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";

interface Props {
  question: FormQuestion;
}

const Iframe = (props: Props) => {
  const { question } = props;
  const [loaded, setLoaded] = useReducer(() => true, false);
  return (
    <Box height="60vh">
      {!loaded && <LinearProgress />}
      <iframe
        src={question.link}
        frameBorder="0"
        width="100%"
        height="100%"
        onLoad={setLoaded}
        allowTransparency
      ></iframe>
    </Box>
  );
};

export default Iframe;
