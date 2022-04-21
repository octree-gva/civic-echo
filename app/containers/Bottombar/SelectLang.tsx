import { useReducer } from "react";
import TranslateIcon from "@mui/icons-material/Translate";
import Button from "@mui/material/Button";
import { useTranslation } from "react-i18next";
import Dialog from "@mui/material/Dialog";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { LANGS } from "../../langs";
import { useRouter } from "next/router";

interface Props {}

const SelectLang = (props: Props) => {
  const { t } = useTranslation();
  const router = useRouter();
  const [showModal, toggleModal] = useReducer(i => !i, false);

  const onSelectLang = (lang: string) => () => {
    toggleModal();
    router.push(`/${lang}`);
  };

  return (
    <>
      <Button
        color="primary"
        size="small"
        onClick={toggleModal}
        endIcon={<TranslateIcon />}
      >{t`bottom.langs`}</Button>
      <Dialog open={showModal} keepMounted onClose={toggleModal}>
        <List>
          {LANGS.map(lang => (
            <ListItem button key={lang} onClick={onSelectLang(lang)}>
              <ListItemText>{t(`langs.${lang}`)}</ListItemText>
            </ListItem>
          ))}
        </List>
      </Dialog>
    </>
  );
};

export default SelectLang;
