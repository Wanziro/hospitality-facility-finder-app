import React from "react";
import { useSelector } from "react-redux";
import Hotel from "./Hotel";
import Restaurant from "./Restaurant";
import Transport from "./Transport";

function PaymentReports() {
  const { role } = useSelector((state) => state.user);
  if (role === "hotel") {
    return <Hotel />;
  } else if (role === "restaurant") {
    return <Restaurant />;
  } else if (role === "transport") {
    return <Transport />;
  } else {
    return null;
  }
}

export default PaymentReports;