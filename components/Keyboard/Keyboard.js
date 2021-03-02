import styles from "./Keyboard.module.scss";
import { func } from "prop-types";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";

const keys = [
  { type: "number", label: "1", value: 1 },
  { type: "number", label: "2", value: 2 },
  { type: "number", label: "3", value: 3 },
  { type: "number", label: "4", value: 4 },
  { type: "number", label: "5", value: 5 },
  { type: "number", label: "6", value: 6 },
  { type: "number", label: "7", value: 7 },
  { type: "number", label: "8", value: 8 },
  { type: "number", label: "9", value: 9 },
  { type: "action", label: "Borrar" },
  { type: "number", label: "0", value: 0 },
  { type: "action", label: "Continuar" },
];

const Keyboard = ({ handleChange, handleNext, handleCancellation }) => {
  return (
    <Paper elevation={0} variant="outlined">
      <div className={styles.container}>
        {keys.map(({ type, label, value }, index) => {
          return (
            <Button
              variant="contained"
              color="primary"
              key={index.toString()}
              className={styles[`button--${type}`]}
            >
              {label}
            </Button>
          );
        })}
      </div>
    </Paper>
  );
};

export default Keyboard;

Keyboard.propTypes = {
  handleChange: func,
  handleNext: func,
  handleCancellation: func,
};

Keyboard.defaultProps = {
  handleChange: () => {},
  handleNext: () => {},
  handleCancellation: () => {},
};
