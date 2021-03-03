import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/Link";
import cx from "classnames";
import axios from "axios";
import Button from "@material-ui/core/Button";
import useSetTimeout from "hooks/useSetTimeout";
import styles from "./Extraction.module.scss";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import { shape } from "prop-types";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import InsufficientFunds from "./InsufficientFunds";

const radios = [
  [
    { label: "$500", value: "500" },
    { label: "$2000", value: "2000" },
    { label: "$3000", value: "3000" },
  ],
  [
    { label: "$5000", value: "5000" },
    { label: "$6000", value: "6000" },
    { label: "Otro monto", value: "different-amount" },
  ],
];

const Extraction = ({ user }) => {
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const router = useRouter();
  useSetTimeout(() => router.push("/"), 30000);

  const handleChange = e => setValue(e.target.value);

  const handleClose = () => setOpen(false);

  const handleNext = () => {
    switch (value) {
      case "different-amount":
        router.push("/extraction/different-amount");
        break;
      default:
        setLoading(true);
        axios
          .put(`/api/funds?id=${user.id}`, { amount: -Number.parseInt(value) })
          .then(() => router.push("/success"))
          .catch(() => setOpen(true))
          .finally(() => setLoading(false));
        break;
    }
  };

  return (
    <div className={cx("container", styles.container)}>
      <div>
        <Typography variant="h3" gutterBottom>
          Extracción
        </Typography>
      </div>
      <Paper elevation={0} variant="outlined" className={styles.paper}>
        <FormControl component="fieldset">
          <RadioGroup
            aria-label="amount"
            name="amount"
            value={value}
            onChange={handleChange}
            className={styles.form}
          >
            {radios.map((batch, index) => (
              <span key={index.toString()} className={styles.divider}>
                {batch.map(({ label, value }, index) => (
                  <FormControlLabel
                    key={index.toString()}
                    label={label}
                    value={value}
                    control={<Radio color="primary" />}
                  />
                ))}
              </span>
            ))}
          </RadioGroup>
        </FormControl>
      </Paper>
      <div className={styles["actions-container"]}>
        <Link href="/cancellation">
          <Button variant="contained" color="primary">
            cancelar
          </Button>
        </Link>
        <Button
          variant="contained"
          color="primary"
          disabled={!value || loading}
          onClick={handleNext}
        >
          continuar
        </Button>
      </div>
      <InsufficientFunds handleClose={handleClose} open={open} />
    </div>
  );
};

export default Extraction;

Extraction.propTypes = {
  user: shape({}),
};

Extraction.defaultProps = {
  user: {},
};
