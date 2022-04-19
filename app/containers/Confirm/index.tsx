import { useMemo } from "react";
import usePersonStore from "../../stores/person";
import Voucher from "./Voucher";
import Simple from "./Simple";

const Confirm = () => {
  const person = usePersonStore(s => s.person);

  const showVoucher = useMemo(
    () => person.email && person.npa && person.completeForm,
    [person]
  );

  if (showVoucher) return <Voucher />;
  else return <Simple />;
};

export default Confirm;
