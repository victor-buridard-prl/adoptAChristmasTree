import { Paper } from "@mui/material";
import LoginForm from "../components/LoginForm";
import LoginHeader from "../components/LoginHeader";
import styles from "./LoginPage.module.css";

export default function LoginPage() {
  return (
    <div>
      <LoginHeader />
      <div className={styles.userMfeBodyContainer}>
        <Paper className={styles.userMfePromotionalContent}></Paper>
        <LoginForm />
      </div>
    </div>
  );
}
