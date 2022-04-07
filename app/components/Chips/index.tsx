import { useState } from "react";
import Box from "@mui/material/Box";
import { styled } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";

interface Props {
  options: string[];
  onChange: (options: string[]) => void;
}

const Chips = (props: Props) => {
  const { options, onChange } = props;
  const [selectedChips, setSelectedChips] = useState<string[]>([]);

  const onClickChip = (clickedChip: string) => {
    let chips = selectedChips.slice();

    if (selectedChips.includes(clickedChip))
      chips = chips.filter(option => option !== clickedChip);
    else chips = [...chips, clickedChip];

    setSelectedChips(chips);
    onChange(chips);
  };

  return (
    <Root>
      {options?.map((option, index) => (
        <Chip
          key={index}
          onClick={() => onClickChip(option)}
          isSelected={selectedChips.includes(option)}
        >
          {selectedChips.includes(option) && (
            <CheckIcon sx={{ mr: 2, fontSize: "2rem" }} />
          )}
          {option}
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
