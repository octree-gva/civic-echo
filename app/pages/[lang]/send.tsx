import type { NextPage } from "next";
import Box from "@mui/material/Box";
import Topbar from "../../containers/Topbar";
import * as pageUtils from "../../lib/pageUtils";
import Person from "../../containers/Person";

interface Props {}

const SendPage: NextPage<Props> = (props: Props) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      sx={{ bgcolor: { md: "secondary.light" } }}
      minHeight="100vh"
    >
      <Topbar />
      <Box
        flexGrow={1}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Person />
      </Box>
    </Box>
  );
};

export const getStaticProps = pageUtils.getStaticProps;
export const getStaticPaths = pageUtils.getStaticPaths;

export default SendPage;
