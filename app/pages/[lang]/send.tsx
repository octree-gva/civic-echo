import type { NextPage } from "next";
import { useEffect } from "react";
import Box from "@mui/material/Box";
import Topbar from "../../containers/Topbar";
import * as pageUtils from "../../lib/pageUtils";
import Confirm from "../../containers/Confirm";
import { sendResponse } from "../../lib/sendResponse";

interface Props {}

const ConfirmPage: NextPage<Props> = (props: Props) => {
  useEffect(() => {
    sendResponse().catch(error => console.error(error));
  }, []);

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
        <Confirm />
      </Box>
    </Box>
  );
};

export const getStaticProps = pageUtils.getStaticProps;
export const getStaticPaths = pageUtils.getStaticPaths;

export default ConfirmPage;
