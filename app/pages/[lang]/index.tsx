import type { NextPage } from "next";
import Box from "@mui/material/Box";
import Questions from "../../containers/Questions";
import Topbar from "../../containers/Topbar";
import * as pageUtils from "../../lib/pageUtils";
import useNextQuestion from "../../hooks/useNextQuestion";

interface Props {}

const QuestionsPage: NextPage<Props> = (props: Props) => {
  const nextQuestion = useNextQuestion();

  return (
    <Box>
      <Topbar onNext={nextQuestion} />
      <Questions />
    </Box>
  );
};

export const getStaticProps = pageUtils.getStaticProps;
export const getStaticPaths = pageUtils.getStaticPaths;

export default QuestionsPage;
