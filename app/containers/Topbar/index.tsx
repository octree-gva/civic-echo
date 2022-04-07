import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useTranslation } from "react-i18next";
import { useQuestionsStore } from "../../stores/questions";

interface Props {}

const Topbar = (props: Props) => {
  const { t } = useTranslation();
  const nextQuestion = useQuestionsStore(s => s.nextQuestion);

  return (
    <Box position="static" display="flex" justifyContent="space-between" p={2}>
      <Typography variant="h6">
        Demain c'est <br />
        ...aujourd'hui?
      </Typography>
      <Box>
        <Button onClick={nextQuestion}>{t`generic.skip`}</Button>
      </Box>
    </Box>
  );
};

export default Topbar;
