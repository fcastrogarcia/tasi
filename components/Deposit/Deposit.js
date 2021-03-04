import { useEffect, useState } from "react";
import { shape } from "prop-types";
import { useRouter } from "next/router";
import Link from "next/link";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Keyboard from "components/Keyboard";
import styles from "./Deposit.module.scss";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import NumberFormat from "react-number-format";
import axios from "axios";
import useSetTimeout from "hooks/useSetTimeout";
import ProgressContainer from "components/ProgressContainer";

const getTotalAmount = state =>
  Object.keys(state).reduce((acc, curr) => acc + curr * state[curr], 0);

const hasValue = values => Object.values(values).every(val => !val);

const Deposit = ({ user }) => {
  const initialState = {
    100: "",
    200: "",
    500: "",
    1000: "",
  };

  const [value, setValue] = useState(initialState);
  const [totalAmount, setTotalAmount] = useState(0);
  const [selectedBill, setBill] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  useSetTimeout(() => router.push("/", 30000));

  const handleFocus = e => setBill(e.target.name);

  const handleClick = input => value => () => {
    if (!input) return;
    setValue(prev => {
      if (prev[input].length === 4) return prev;
      return {
        ...prev,
        [input]: prev[input].concat(value),
      };
    });
  };

  const handleErase = input => () => {
    if (!input) return;

    setValue(prev => {
      return {
        ...prev,
        [input]: prev[input].slice(0, -1),
      };
    });
  };

  const handleSubmit = () => {
    setLoading(true);

    axios
      .put(`/api/funds?id=${user.id}`, { amount: Number.parseInt(totalAmount) })
      .then(() => {
        setValue(initialState);
        setLoading(false);
        router.push({
          pathname: "/success",
          query: { operation: "deposit", amount: totalAmount },
        });
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    setTotalAmount(getTotalAmount(value));
  }, [value]);

  return (
    <ProgressContainer loading={loading} className={styles.container}>
      <Typography className={styles.title} variant="h3">
        Depósito
      </Typography>
      <div className={styles.content}>
        <Paper elevation={0} variant="outlined">
          <form className={styles.form}>
            <Typography variant="body1">Pesos</Typography>
            <Typography variant="body1">Cantidad</Typography>
            <Typography variant="h5">$100</Typography>
            <TextField
              variant="outlined"
              type="number"
              name="100"
              value={value[100] || 0}
              onFocus={handleFocus}
            />
            <Typography variant="h5">$200</Typography>
            <TextField
              variant="outlined"
              type="number"
              name="200"
              value={value[200] || 0}
              onFocus={handleFocus}
            />
            <Typography variant="h5">$500</Typography>
            <TextField
              variant="outlined"
              type="number"
              name="500"
              value={value[500] || 0}
              onFocus={handleFocus}
            />
            <Typography variant="h5">$1000</Typography>
            <TextField
              variant="outlined"
              type="number"
              name="1000"
              value={value[1000] || 0}
              onFocus={handleFocus}
            />
          </form>
        </Paper>
        <div>
          <div style={{ marginBottom: 24 }}>
            <Typography variant="h5" align="center" gutterBottom>
              Monto a depositar
            </Typography>
            <Typography variant="h3" align="center">
              <NumberFormat
                value={totalAmount}
                displayType={"text"}
                decimalSeparator={","}
                thousandSeparator={"."}
                prefix={"$"}
              />
            </Typography>
          </div>
          <Keyboard
            disableSubmit={hasValue(value)}
            handleClick={handleClick(selectedBill)}
            handleErase={handleErase(selectedBill)}
            handleSubmit={handleSubmit}
          />
        </div>
      </div>
      <Link href="/cancellation">
        <Button
          variant="contained"
          color="primary"
          className={styles["btn--cancel"]}
        >
          Cancelar
        </Button>
      </Link>
    </ProgressContainer>
  );
};

export default Deposit;

Deposit.propTypes = {
  user: shape({}),
};

Deposit.defaultProps = {
  user: {},
};
