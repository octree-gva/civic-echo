// @ts-nocheck
import dynamic from "next/dynamic";
import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { DropResult } from "react-beautiful-dnd";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { styled } from "@mui/material";
import { useTranslation } from "react-i18next";

interface Props {
  question: FormQuestion;
  onRespond: (responseKeys: string[]) => void;
}

const SortList = (props: Props) => {
  const { question, onRespond } = props;
  const { t } = useTranslation();
  const [items, setItems] = useState<KeyValueResponse[]>(
    (question.random
      ? randomise(question.responses as KeyValueResponse[])
      : question.responses) as KeyValueResponse[]
  );

  useEffect(() => {
    setItems(
      items.map(item => {
        const responses: KeyValueResponse[] =
          (question.responses as KeyValueResponse[]) || [];
        return responses.find(response => response.key === item.key) || item;
      })
    );
  }, [question.responses]);

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
  const renderDraggable = useDraggableInPortal();
  if (!item.key) return null;
  return (
    <Draggable draggableId={item.key} index={index} key={`key-${item.key}`}>
      {renderDraggable(provided => (
        <ListItem
          ref={provided.innerRef}
          title={item.value}
          isActive={isActive}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {index + 1}. {item.value}
        </ListItem>
      ))}
    </Draggable>
  );
};

const useDraggableInPortal = () => {
  const self = useRef({}).current;

  useEffect(() => {
    const div = document.createElement("div");
    div.style.position = "absolute";
    div.style.pointerEvents = "none";
    div.style.top = "0";
    div.style.width = "100%";
    div.style.height = "100%";
    div.style.textAlign = "center";
    self.elt = div;
    document.body.appendChild(div);
    return () => {
      document.body.removeChild(div);
    };
  }, [self]);

  return render =>
    (provided, ...args) => {
      const element = render(provided, ...args);
      if (provided.draggableProps.style.position === "fixed") {
        return createPortal(element, self.elt);
      }
      return element;
    };
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

const randomise = (items: any[]) =>
  items.slice().sort(() => Math.random() - 0.5);

export default dynamic(() => Promise.resolve(SortList), { ssr: false });
