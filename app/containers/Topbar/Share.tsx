import React, { useReducer } from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { useTranslation } from "react-i18next";
import ShareIcon from "@mui/icons-material/Share";

const Share = () => {
  const { t } = useTranslation();
  const url = getUrl();
  const [showModal, toggleModal] = useReducer((i) => !i, false);

  const onShare = async () => {
    if (navigator?.share) {
      try {
        await navigator.share({
          title: t`share.message`,
          url,
        });
      } catch (err) {
        if (!err.toString().includes('AbortError')) {
          throw(err)
        } else {
          toggleModal()
        }
      }
    } else toggleModal();
  };

  const onCopy = () => {
    navigator?.clipboard?.writeText(url);

  };

  return (
    <>
      <Button
        onClick={onShare}
        size="small"
        color="primary"
        endIcon={<ShareIcon />}
      >{t`generic.share`}</Button>
      <Dialog open={showModal} keepMounted onClose={toggleModal}>
        <DialogContent>
          <Typography sx={{ mb: 2 }}>{t`share.shareLink`}</Typography>
          <TextField value={url} size="small" fullWidth />
          <Button
            fullWidth
            onClick={onCopy}
            variant="contained"
            sx={{ mt: 2 }}
          >{t`share.copyLink`}</Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={toggleModal}>{t`generic.close`}</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

const getUrl = () => {
  if (typeof window !== "undefined") {
    const host = window.location.href.split("?")?.[0] || "";
    return `${host}?src=share`;
  } else return "";
};

export default React.memo(Share);
