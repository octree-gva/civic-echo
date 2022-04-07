import MUIButton from "@mui/material/Button";
import Box from "@mui/material/Box";
import { useTranslation } from "react-i18next";

interface Props {
  question: FormQuestion;
}

const Button = (props: Props) => {
  const { question } = props;
  const { t } = useTranslation();

  return (
    <Box>
      <a href={question.link} target="_blank">
        <MUIButton variant="contained">
          {question.responses || t`generic.openLink`}
        </MUIButton>
      </a>
    </Box>
  );
};

export default Button;
