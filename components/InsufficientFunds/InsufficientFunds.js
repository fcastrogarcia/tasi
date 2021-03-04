import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";
import Link from "next/Link";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import { makeStyles } from "@material-ui/core/styles";
import { func, bool } from "prop-types";

const useStyles = makeStyles({
  paper: {
    height: 200,
    justifyContent: "space-between",
  },
  actions: {
    justifyContent: "center",
    padding: "16px 24px",
  },
  title: {
    textAlign: "center",
  },
});

const InsufficientFunds = ({ handleClose, open }) => {
  const classes = useStyles();

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      classes={{
        paper: classes.paper,
      }}
    >
      <DialogTitle className={classes.title}>
        Su saldo es insuficiente. Puede consultar su saldo, probar con otro
        monto o cancelar la operación.
      </DialogTitle>
      <DialogActions className={classes.actions}>
        <Link href="/cancellation">
          <Button variant="contained" color="primary">
            cancelar
          </Button>
        </Link>
        <Link href="/balance">
          <Button variant="contained" color="primary">
            consultar saldo
          </Button>
        </Link>
        <Link href="/different-amount">
          <Button variant="contained" color="primary">
            otro monto
          </Button>
        </Link>
      </DialogActions>
    </Dialog>
  );
};

export default InsufficientFunds;

InsufficientFunds.propTypes = {
  handleClose: func,
  open: bool,
};

InsufficientFunds.defaultProps = {
  handleClose: () => {},
  open: false,
};
