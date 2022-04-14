import Box from "@mui/material/Box";
import usePersonStore from "../../stores/person";

// Views
import Email from "./Email";
import Birthdate from "./Birtdate";
import Name from "./Name";
import Confirm from "./Confirm";

const VIEWS = [Email, Birthdate, Name, Confirm];

interface Props {}

const Person = (props: Props) => {
  const currentViewIndex = usePersonStore(s => s.currentViewIndex);
  const View = VIEWS[currentViewIndex];
  return (
    <Box maxWidth="40rem" sx={{ bgcolor: "secondary.light" }}>
      <View />
    </Box>
  );
};

export default Person;
