import type { NextPage } from "next";
import Box from "@mui/material/Box";
import Questions from "../../containers/Questions";
import Topbar from "../../containers/Topbar";
import Bottombar from "../../containers/Bottombar";
import * as pageUtils from "../../lib/pageUtils";
import { useTheme } from "@mui/system";

interface Props {}

const QuestionsPage: NextPage<Props> = (props: Props) => {
  const theme = useTheme();
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
        sx={{
          [theme.breakpoints.down("sm")]: {
            borderBottom: `1px solid ${theme.palette.secondary.main}`,
            display: "block",
            maxHeight: `calc(100vh - ${theme.spacing(18)})`,
            overflowY: "scroll",
          },
        }}
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
