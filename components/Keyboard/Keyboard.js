import styles from "./Keyboard.module.scss";
import { func, bool } from "prop-types";
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
  { type: "erase", label: "Borrar" },
  { type: "number", label: "0", value: 0 },
  { type: "submit", label: "Continuar" },
];

const Keyboard = ({
  handleClick,
  handleSubmit,
  handleErase,
  disableSubmit,
}) => {
  return (
    <Paper elevation={0} variant="outlined">
      <div className={styles.container}>
        {keys.map(({ type, label, value }, index) => {
          let props = {
            variant: "contained",
            color: "primary",
            className: styles[`button--${type}`],
            onClick: type === "erase" ? handleErase : handleClick(value),
          };

          if (type === "submit") {
            props.type = type;
            props.disabled = disableSubmit;
            props.onClick = handleSubmit;
          }

          return (
            <Button key={index.toString()} {...props}>
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
  handleClick: func,
  handleErase: func,
  handleSubmit: func,
  disableSubmit: bool,
};

Keyboard.defaultProps = {
  handleClick: () => {},
  handleErase: () => {},
  handleSubmit: () => {},
  disableSubmit: false,
};
