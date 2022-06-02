import Box from "@mui/material/Box";
import { styled } from "@mui/material";

export default styled(Box)`
  padding: ${({ theme }) => theme.spacing(2)};
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  min-height: 480px;
  max-width: 640px;
  background-color: white;
  border-radius: 24px;
`;
