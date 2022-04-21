import { useTranslation } from "react-i18next";
import { Link } from "@mui/material";

export type Partner = {
  url: string;
  name: string;
};

interface Props {
  partner: Partner;
  first?: boolean;
  last?: boolean;
}

const PartnerLink = (props: Props) => {
  const { t } = useTranslation();
  const { partner, first, last } = props;
  return (
    <>
      {!last && !first && ","} {last && `${t("credentials.and")} `}
      <Link target="blank" href={partner.url}>
        {partner.name}
      </Link>
    </>
  );
};

export default PartnerLink;
