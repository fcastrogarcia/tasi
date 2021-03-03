import styles from "./Operations.module.scss";
import Button from "@material-ui/core/Button";
import cx from "classnames";
import useCheckUser from "hooks/useCheckUser";
import useSetTimeout from "hooks/useSetTimeout";
import Link from "next/link";
import { useRouter } from "next/router";

const Operations = () => {
  const router = useRouter();
  const { user } = useCheckUser();
  useSetTimeout(() => router.push("/"), 30000);

  const { name } = user;

  return (
    <div className={cx("container", styles.container)}>
      <div className={styles.welcome}>
        <h2>Bienvenido {name || ""}</h2>
        <h3>¿Qué operación deseas realizar?</h3>
      </div>
      <div className={styles.buttons}>
        <Link href="/extraction">
          <Button
            variant="outlined"
            color="primary"
            className={styles["button--action"]}
          >
            Extracción
          </Button>
        </Link>
        <Link href="/deposit">
          <Button
            variant="outlined"
            color="primary"
            className={styles["button--action"]}
          >
            Depósito
          </Button>
        </Link>
        <Link href="/balance">
          <Button
            variant="outlined"
            color="primary"
            className={styles["button--action"]}
          >
            Consulta de saldo
          </Button>
        </Link>
      </div>
      <Link href="/cancellation">
        <Button
          variant="contained"
          color="primary"
          className={styles["button--cancel"]}
        >
          Cancelar
        </Button>
      </Link>
    </div>
  );
};

export default Operations;
