
import { Suspense} from "react";
import PaymentShell from "./PaymentShell";

const page = () => {

  return (
    <Suspense fallback="Loading...">
      <PaymentShell/>
    </Suspense>
  );
};

export default page;
