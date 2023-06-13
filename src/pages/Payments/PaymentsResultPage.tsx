import { useLocation } from "react-router-dom";

const PaymentsResultPage = () => {
  const search = useLocation().search;
  console.log(search);
  return <div>{search}</div>;
};

export default PaymentsResultPage;
