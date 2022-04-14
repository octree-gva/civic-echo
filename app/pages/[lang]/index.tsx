import type { NextPage } from "next";
import Box from "@mui/material/Box";
import Questions from "../../containers/Questions";
import Topbar from "../../containers/Topbar";
import Bottombar from "../../containers/Bottombar";
import * as pageUtils from "../../lib/pageUtils";

interface Props {}

const QuestionsPage: NextPage<Props> = (props: Props) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      minHeight="100vh"
      sx={{ bgcolor: { md: "secondary.light" } }}
    >
      <Topbar />
      <Box
        flexGrow={1}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Questions />
      </Box>
      <Bottombar />
    </Box>
  );
};

export const getStaticProps = pageUtils.getStaticProps;
export const getStaticPaths = pageUtils.getStaticPaths;

export default QuestionsPage;
