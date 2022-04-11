import Box from "@mui/material/Box";
import Chips from "../../components/Chips";

interface Props {
  question: FormQuestion;
  onRespond: (responseIndex: number) => void;
}

const ListChoice = (props: Props) => {
  const { question, onRespond } = props;

  const onChange = (chip: string, index: number) => {
    onRespond(index);
  };

  return (
    <Box>
      <Chips options={question.responses || []} onChange={onChange} />
    </Box>
  );
};

export default ListChoice;
