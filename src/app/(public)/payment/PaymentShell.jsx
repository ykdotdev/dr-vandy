"use client";

import { useSearchParams } from "next/navigation";
import PaymentClient from "./PaymentClient";

const PaymentShell = () => {
  const searchParams = useSearchParams();

  return <PaymentClient orderID={searchParams.get("oID")} />;
};

export default PaymentShell;
