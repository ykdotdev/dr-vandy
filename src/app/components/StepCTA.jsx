import styles from "./StepCTA.module.css";
import clsx from "clsx";

const StepCTA = ({currentStep, btnStatus}) => {

    const stepName = {
        1: "Confirm Checkout",
        2: "Continue to Payment",
        3: "Continue Shopping"
    }

  return (
    <button className={clsx(styles.stepCTA, btnStatus === "disabled" && styles.disabled)}>
      <div className={styles.label}>Continue to Payment</div>
      {/* {currentStep === 3 || (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={styles.icon}
        >
          <circle cx="12" cy="12" r="10" />
          <path d="m12 16 4-4-4-4" />
          <path d="M8 12h8" />
        </svg>
      )} */}
    </button>
  );
}

export default StepCTA
