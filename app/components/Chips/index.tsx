import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { styled } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";

interface Props {
  options: KeyValueResponse[];
  onChange: (clickedResponse?: KeyValueResponse) => void;
}

const Chips = (props: Props) => {
  const { options, onChange } = props;
  const [selectedKey, setSelectedKey] = useState("");

  useEffect(() => {
    setSelectedKey("");
  }, [options]);

  const onClickChip = (clickedKey: string) => {
    setSelectedKey(clickedKey);

    const clickedResponse = options.find(option => option.key === clickedKey);
    onChange(clickedResponse);
  };

  return (
    <Root>
      {options?.map((option, index) => (
        <Chip
          key={index}
          onClick={() => onClickChip(option.key)}
          isSelected={selectedKey === option.key}
        >
          {selectedKey === option.key && (
            <CheckIcon sx={{ mr: 2, fontSize: "2rem" }} />
          )}
          {option.value}
        </Chip>
      ))}
    </Root>
  );
};

const Root = styled(Box)(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  columnGap: theme.spacing(3),
  gridRowGap: theme.spacing(3),
  rowGap: theme.spacing(3),
  justifyContent: "center",

  [theme.breakpoints.down("sm")]: {
    gridRowGap: theme.spacing(3),
    rowGap: theme.spacing(3),
    columnGap: theme.spacing(2),
  },
}));

const Chip = styled("div")<{ isSelected: boolean }>(
  ({ theme, isSelected }) => ({
    borderRadius: "22px",
    fontSize: "18px",
    height: "48px",
    letterSpacing: 0,
    border: `2px solid ${theme.palette.grey[400]}`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing(0, 2),
    cursor: "pointer",
    transition: "all 0.25s ease",
    borderColor: isSelected
      ? theme.palette.primary.main
      : theme.palette.grey[400],
  })
);

export default Chips;
