import { forwardRef, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Slide from "@mui/material/Slide";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";
import { sendResponse } from "../../lib/sendResponse";
import { useRouter } from "next/router";

interface Props {
  open: boolean;
  toggle: () => void;
}

const StopDialog = (props: Props) => {
  const { open, toggle } = props;
  const [sent, setSent] = useState(false);
  const { t } = useTranslation();
  const router = useRouter();

  const onFinish = async () => {
    try {
      await sendResponse();
      setSent(true);
    } catch (error) {
      console.error(error);
    }
  };

  const onGoToPersonal = () => router.push(`${router.asPath}/send`);
  const onClose = () => (window.location.href = router.asPath);

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={toggle}
    >
      {!sent && (
        <DialogContent sx={{ textAlign: "center" }}>
          <DialogContentText>
            <Typography variant="h6">{t`stop.title`}</Typography>
            <Typography sx={{ mt: 2 }}>{t`stop.notice`}</Typography>
          </DialogContentText>
          <Box mt={4} display="flex" justifyContent="space-between">
            <Button
              variant="outlined"
              onClick={onFinish}
            >{t`stop.button.finish`}</Button>
            <Button
              variant="contained"
              onClick={onGoToPersonal}
            >{t`stop.button.personal`}</Button>
          </Box>
        </DialogContent>
      )}
      {sent && (
        <DialogContent sx={{ textAlign: "center" }}>
          <DialogContentText>
            <Typography variant="h6">{t`stop.thanks`}</Typography>
            <Typography sx={{ mt: 2 }}>{t`stop.content`}</Typography>
          </DialogContentText>
          <Box mt={4}>
            <Button
              variant="outlined"
              onClick={onClose}
            >{t`generic.close`}</Button>
          </Box>
        </DialogContent>
      )}
    </Dialog>
  );
};

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default StopDialog;
