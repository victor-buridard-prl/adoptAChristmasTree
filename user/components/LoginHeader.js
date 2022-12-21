import { Typography } from "@mui/material";
import styles from "./LoginHeader.module.css";

export default function LoginPage() {
  return (
    <div className={styles.userMfeLoginHeaderContainer}>
      <Typography variant="h4" className={styles.userMfeHeaderTitle}>
        Adopte un sapin
      </Typography>
    </div>
  );
}
