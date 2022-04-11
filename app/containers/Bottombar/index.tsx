import { useReducer } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useTranslation } from "react-i18next";
import StopDialog from "./StopDialog";
import Share from "./Share";

interface Props {}

const Bottombar = (props: Props) => {
  const { t } = useTranslation();
  const [openDialog, toggleDialog] = useReducer(i => !i, false);

  return (
    <>
      <Box
        position="static"
        display="flex"
        justifyContent="space-between"
        px={2}
        pb={1}
      >
        <Button>{t`bottom.moreInfo`}</Button>
        <Share />
        <Button onClick={toggleDialog}>{t`bottom.stopSurvey`}</Button>
      </Box>
      <StopDialog open={openDialog} toggle={toggleDialog} />
    </>
  );
};

export default Bottombar;
