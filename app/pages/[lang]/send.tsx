import type { NextPage } from "next";
import Box from "@mui/material/Box";
import Topbar from "../../containers/Topbar";
import * as pageUtils from "../../lib/pageUtils";
import Person from "../../containers/Person";

interface Props {}

const SendPage: NextPage<Props> = (props: Props) => {
  return (
    <Box>
      <Topbar />
      <Person />
    </Box>
  );
};

export const getStaticProps = pageUtils.getStaticProps;
export const getStaticPaths = pageUtils.getStaticPaths;

export default SendPage;
