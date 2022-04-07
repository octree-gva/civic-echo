import Box from "@mui/material/Box";
import MUIIconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import { styled } from "@mui/material/styles";

interface Props {
  onRespond: (response: string) => void;
}

const YesNo = (props: Props) => {
  const { onRespond } = props;

  const handleSelect = (selection: string) => () => onRespond(selection);

  return (
    <Box display="flex" justifyContent="space-between" px={4}>
      <IconButton onClick={handleSelect("Non")}>
        <CloseIcon color="error" />
      </IconButton>
      <IconButton onClick={handleSelect("Oui")}>
        <CheckIcon color="success" />
      </IconButton>
    </Box>
  );
};

const IconButton = styled(MUIIconButton)(({ theme }) => ({
  backgroundColor: theme.palette.grey[200],
  border: "1px solid grey",
  borderColor: theme.palette.grey[300],
  width: "4rem",
  height: "4rem",

  "& svg": {
    width: "1.5em",
    height: "1.5em",
  },
}));

export default YesNo;
