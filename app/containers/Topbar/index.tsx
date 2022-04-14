import Box from "@mui/material/Box";
import Share from "./Share";
import { logoUrl } from "../../config";

interface Props {}

const Topbar = (props: Props) => {
  return (
    <Box position="static" display="flex" justifyContent="space-between" p={2}>
      <Box width="15rem" maxWidth="60%">
        <a href={logoUrl}>
          <img
            src="/logo.svg"
            alt="Demain c'est aujourd'hui"
            width="100%"
            height="auto"
          />
        </a>
      </Box>
      <Box>
        <Share />
      </Box>
    </Box>
  );
};

export default Topbar;
