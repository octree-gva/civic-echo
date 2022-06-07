import { useMemo } from "react";
import Box from "@mui/material/Box";
import dynamic from "next/dynamic";
import Chips from "../../components/Chips";

interface Props {
  question: FormQuestion;
  onRespond: (responseKey: string) => void;
}

const ListChoice = (props: Props) => {
  const { question, onRespond } = props;
  const items = useMemo(
    () =>
      question.random
        ? randomise(question.responses as KeyValueResponse[])
        : question.responses,
    [question.responses]
  );

  const onChange = (response?: KeyValueResponse) => {
    if (response) setTimeout(() => onRespond(response.key), 300);
  };

  return (
    <Box>
      <Chips options={items as KeyValueResponse[]} onChange={onChange} />
    </Box>
  );
};

const randomise = (items: any[]) =>
  items.slice().sort(() => Math.random() - 0.5);

export default dynamic(() => Promise.resolve(ListChoice), { ssr: false });
