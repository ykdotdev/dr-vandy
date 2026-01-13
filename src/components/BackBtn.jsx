import styles from "./BackBtn.module.css";
import { useRouter } from "next/navigation";

const BackBtn = () => {
const router = useRouter();

  return (
    <button className={styles.backBtn} onClick={() => router.back()}>
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
        <path d="m15 18-6-6 6-6" />
      </svg>
      <span className={styles.backBtnText}>Back</span>
    </button>
  );
}

export default BackBtn
