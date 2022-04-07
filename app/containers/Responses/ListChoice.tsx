import Box from "@mui/material/Box";
import Chips from "../../components/Chips";

interface Props {
  question: FormQuestion;
  onRespond: (response: string) => void;
}

const ListChoice = (props: Props) => {
  const { question, onRespond } = props;

  const onChange = (chips: string[]) => {
    onRespond(chips[0]);
  };

  return (
    <Box>
      <Chips options={question.responses || []} onChange={onChange} />
    </Box>
  );
};

export default ListChoice;
