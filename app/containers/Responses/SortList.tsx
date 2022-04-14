// @ts-nocheck
import { useState } from "react";
import { DropResult, DragDropContext as DDCT } from "react-beautiful-dnd";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { styled } from "@mui/material";
import dynamic from "next/dynamic";
import { useTranslation } from "react-i18next";

const DragDropContext = dynamic(
  () => import("react-beautiful-dnd").then(mod => mod.DragDropContext),
  { ssr: false }
) as Promise<DDCT>;
const Droppable = dynamic(
  () => import("react-beautiful-dnd").then(mod => mod.Droppable),
  { ssr: false }
);
const Draggable = dynamic(
  () => import("react-beautiful-dnd").then(mod => mod.Draggable),
  { ssr: false }
);

interface Props {
  question: FormQuestion;
  onRespond: (responseKeys: string[]) => void;
}

const SortList = (props: Props) => {
  const { question, onRespond } = props;
  const { t } = useTranslation();
  const [items, setItems] = useState<KeyValueResponse[]>(
    question.responses as KeyValueResponse[]
  );

  const handleOnDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const newItems = reorder(
      items,
      result.source.index,
      result.destination.index
    );
    setItems(newItems);
  };

  const reorder = (
    list: KeyValueResponse[],
    startIndex: number,
    endIndex: number
  ) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  const onNext = () => {
    onRespond(items.map(item => item.key));
  };

  return (
    <Box width="100%">
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="list">
          {provided => (
            <List
              {...provided.droppableProps}
              ref={provided.innerRef}
              count={question.responses?.length || 0}
            >
              {items?.map((item, index) => (
                <Item key={item.key} index={index} item={item} />
              ))}
              {provided.placeholder}
            </List>
          )}
        </Droppable>
      </DragDropContext>
      <Button
        fullWidth
        onClick={onNext}
        variant="contained"
        sx={{ mt: 4 }}
      >{t`generic.next`}</Button>
    </Box>
  );
};

const Item = ({
  index,
  item,
  isActive = false,
}: {
  index: number;
  item: KeyValueResponse;
  isActive?: boolean;
}) => {
  return (
    <Draggable key={item.key} draggableId={item.key} index={index}>
      {provided => (
        <ListItem
          ref={provided.innerRef}
          title={item.value}
          isActive={isActive}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {index + 1}. {item.value}
        </ListItem>
      )}
    </Draggable>
  );
};

const List = styled(Box)<{ count: number }>(({ count }) => ({
  height: `${count * 62 - 8}px`,
  maxWidth: "100%",
  margin: "0 auto",
}));

const ListItem = styled(Box)<{ isActive: boolean }>(({ theme, isActive }) => ({
  border: `1px solid ${theme.palette.grey[300]}`,
  padding: theme.spacing(2),
  width: "100%",
  marginBottom: theme.spacing(1),
  overflow: "hidden",
  height: "54px",
  boxSizing: "border-box",
  userSelect: "none",
  transition: "background-color 0.4s ease, color 0.4s ease",
  backgroundColor: isActive ? theme.palette.primary.main : "white",
  color: isActive ? "white" : "inherit",
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
}));

export default SortList;
