import Box from "@mui/material/Box";
import Chips from "../../components/Chips";

interface Props {
  question: FormQuestion;
  onRespond: (responseKey: string) => void;
}

const ListChoice = (props: Props) => {
  const { question, onRespond } = props;

  const onChange = (response?: KeyValueResponse) => {
    if (response) {
      setTimeout(() => onRespond(response.key), 400);
    }
  };

  return (
    <Box>
      <Chips
        options={question.responses as KeyValueResponse[]}
        onChange={onChange}
      />
    </Box>
  );
};

export default ListChoice;
