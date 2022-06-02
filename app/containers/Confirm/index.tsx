import { useMemo } from "react";
import usePersonStore from "../../stores/person";
import Voucher from "./Voucher";
import Simple from "./Simple";
import { enableVoucher } from "../../config";

const Confirm = () => {
  const person = usePersonStore(s => s.person);

  const showVoucher = useMemo(
    () => enableVoucher && person.email && person.npa && person.completeForm,
    [person]
  );

  if (showVoucher) return <Voucher />;
  else return <Simple />;
};

export default Confirm;
