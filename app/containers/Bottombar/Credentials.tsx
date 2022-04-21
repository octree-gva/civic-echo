import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";
import PartnerLink, { Partner } from "./PartnerLink";

interface Props {
  partners: Array<Partner>;
}

const Credentials = (props: Props) => {
  const { t } = useTranslation();
  const partners = [...props.partners];
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
