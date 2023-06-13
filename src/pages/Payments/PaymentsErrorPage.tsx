import { useLocation } from "react-router-dom";

const PaymentsErrorPage = () => {
  const location = useLocation().search;
  return <div>{location}</div>;
};

export default PaymentsErrorPage;
