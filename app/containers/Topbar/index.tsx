import Box from "@mui/material/Box";
import { useTheme } from "@mui/system";
import Share from "./Share";
import { logoUrl } from "../../config";
import { useRouter } from "next/dist/client/router";

interface Props {}

const Topbar = (props: Props) => {
  const theme = useTheme();
  const router = useRouter();
  const { src } = router.query;
  const hideLogo = src === "sqs";
  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      <Box
        width="15rem"
        maxWidth="60%"
        sx={{ [theme.breakpoints.up("sm")]: { pt: 5 } }}
      >
        {hideLogo || (
          <a href={logoUrl}>
            <img
              src="/logo.svg"
              alt="Demain c'est aujourd'hui"
              width="80%"
              height="auto"
              className="animate__animated animate__fadeIn"
            />
          </a>
        )}
      </Box>
      <Box sx={{ [theme.breakpoints.up("sm")]: { pt: 5 } }}>
        <Share />
      </Box>
    </Box>
  );
};

export default Topbar;
