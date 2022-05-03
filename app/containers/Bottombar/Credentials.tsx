import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";
import { partnersConfig } from "../../config";
import PartnerLink from "./PartnerLink";

const Credentials = () => {
  const { t } = useTranslation();
  const partners = [...partnersConfig];
  if (partners.length > 0) {
    const firstPartner = partners.length > 0 && partners.shift();
    const lastPartner = partners.length > 0 && partners.pop();

    return (
      <Typography variant="caption">
        {t("credentials")}
        {firstPartner && <PartnerLink first partner={firstPartner} />}
        {partners.map(partner => (
          <PartnerLink partner={partner} />
        ))}
        {lastPartner && <PartnerLink last partner={lastPartner} />}
      </Typography>
    );
  } else {
    return null;
  }
};

export default Credentials;
