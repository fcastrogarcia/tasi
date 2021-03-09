import { useState } from "react";
import { shape } from "prop-types";
import { useRouter } from "next/router";
import ProgressContainer from "components/ProgressContainer";
import useSetTimeout from "hooks/useSetTimeout";
import Link from "next/link";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import NumberFormat from "react-number-format";
import Keyboard from "components/Keyboard";
import axios from "axios";
import InsufficientFunds from "components/InsufficientFunds";

const useStyles = makeStyles({
  container: {
    flexDirection: "column",
    justifyContent: "center !important",
  },
  amount: {
    width: 300,
    "& h3": {
      wordBreak: "break-word",
    },
  },
  cancel: {
    position: "absolute",
    left: 32,
    bottom: 32,
  },
  content: {
    display: "flex",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-around",
  },
  title: {
    position: "relative",
    bottom: 64,
  },
});

const DifferentAmount = ({ user }) => {
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const classes = useStyles();
  const router = useRouter();
  useSetTimeout(() => router.push("/"), 30000);

  const handleErase = () => setValue("");

  const handleClick = value => () => {
    setValue(prev => {
      if (!prev && !value) return prev;
      return prev.concat(value);
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!value || !user.id) return;

    setLoading(true);

    axios
      .put(`/api/funds?id=${user.id}`, { amount: -Number.parseInt(value) })
      .then(() => {
        setLoading(false);
        router.push({
          pathname: "/success",
          query: { operation: "extraction", amount: value },
        });
      })
      .catch(() => {
        setLoading(false);
        setOpen(true);
      });
  };

  return (
    <ProgressContainer className={classes.container} loading={loading}>
      <Typography variant="h3" className={classes.title} gutterBottom>
        Otro monto
      </Typography>
      <div className={classes.content}>
        <form
          id="different-amount"
          className={classes.amount}
          onSubmit={handleSubmit}
        >
          <Typography variant="h3" align="center">
            <NumberFormat
              value={value || 0}
              displayType={"text"}
              decimalSeparator={","}
              thousandSeparator={"."}
              prefix={"$"}
            />
          </Typography>
        </form>
        <Keyboard
          handleClick={handleClick}
          handleErase={handleErase}
          disableSubmit={!value || loading}
          formId="different-amount"
        />
      </div>
      <Link href="/cancellation">
        <Button variant="contained" color="primary" className={classes.cancel}>
          cancelar
        </Button>
      </Link>
      <InsufficientFunds handleClose={() => setOpen(false)} open={open} />
    </ProgressContainer>
  );
};

export default DifferentAmount;

DifferentAmount.propTypes = {
  user: shape({}),
};

DifferentAmount.defaultProps = {
  user: {},
};
