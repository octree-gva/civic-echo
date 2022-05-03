import { useReducer } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useTranslation } from "react-i18next";
import StopDialog from "./StopDialog";
import SelectLang from "./SelectLang";
import Credentials from "./Credentials";

interface Props {}

const Bottombar = (props: Props) => {
  const { t } = useTranslation();
  const [openDialog, toggleDialog] = useReducer(i => !i, false);

  return (
    <>
      <Box>
        <Box
          position="static"
          display="flex"
          justifyContent="space-between"
          px={2}
          py={1}
        >
          <SelectLang />
          <Button
            onClick={toggleDialog}
            size="small"
            color="secondary"
          >{t`bottom.stopSurvey`}</Button>
        </Box>
        <Box
          textAlign="center"
          pb={2}
          sx={{ display: { md: "block", xs: "none" } }}
        >
          <Credentials />
        </Box>
      </Box>
      <StopDialog open={openDialog} toggle={toggleDialog} />
    </>
  );
};

export default Bottombar;
