import Box from "@mui/material/Box";
import Share from "./Share";
import { useTheme } from "@mui/system";
import { logoUrl } from "../../config";

interface Props {}

const Topbar = (props: Props) => {
  const theme = useTheme();
  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      <Box
        width="15rem"
        maxWidth="60%"
        sx={{ [theme.breakpoints.up("sm")]: { pt: 5 } }}
      >
        <a href={logoUrl}>
          <img
            src="/logo.svg"
            alt="Demain c'est aujourd'hui"
            width="80%"
            height="auto"
          />
        </a>
      </Box>
      <Box sx={{ [theme.breakpoints.up("sm")]: { pt: 5 } }}>
        <Share />
      </Box>
    </Box>
  );
};

export default Topbar;
