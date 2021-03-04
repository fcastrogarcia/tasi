import styles from "./Operations.module.scss";
import Button from "@material-ui/core/Button";
import cx from "classnames";
import useCheckUser from "hooks/useCheckUser";
import useSetTimeout from "hooks/useSetTimeout";
import Link from "next/link";
import { useRouter } from "next/router";

const actions = [
  { path: "/extraction", label: "extracción" },
  { path: "/deposit", label: "depósito" },
  { path: "/balance", label: "consulta de saldo" },
];

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
        {actions.map(({ path, label }, index) => (
          <Link key={index.toString()} href={path}>
            <Button variant="outlined" color="primary" className="btn--action">
              {label}
            </Button>
          </Link>
        ))}
      </div>
      <Link href="/cancellation">
        <Button variant="contained" color="primary" className="btn--cancel">
          Cancelar
        </Button>
      </Link>
    </div>
  );
};

export default Operations;
