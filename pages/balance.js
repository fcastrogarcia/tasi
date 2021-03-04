import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/Link";
import axios from "axios";
import cx from "classnames";
import NumberFormat from "react-number-format";
import Layout from "components/Layout";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import useSetTimeout from "hooks/useSetTimeout";
import useCheckUser from "hooks/useCheckUser";

const useStyles = makeStyles({
  flexColumn: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center !important",
    alignItems: "center",
  },
  actions: {
    marginTop: 120,
  },
  buttons: {
    display: "flex",
    width: "100%",
    justifyContent: "space-evenly",
    marginTop: 32,
  },
});

const Balance = () => {
  const [funds, setFunds] = useState(null);
  const [loading, setLoading] = useState(false);

  const { user } = useCheckUser();
  const router = useRouter();
  const classes = useStyles();
  // useSetTimeout(() => router.push("/"), 15000);

  useEffect(() => {
    if (!user.id) return;

    setLoading(true);
    axios
      .get(`/api/funds?id=${user.id}`)
      .then(({ data }) => setFunds(data.fund.amount))
      .catch(err => console.log(err))
      .finally(() => setLoading(false));
  }, [user]);

  return (
    <Layout>
      {loading ? (
        <CircularProgress color="primary" />
      ) : (
        <div className={cx(classes.flexColumn, "container")}>
          <div>
            <Typography variant="h4" align="center" gutterBottom>
              Su saldo es
            </Typography>
            <Typography variant="h2" align="center">
              <NumberFormat
                value={funds}
                displayType={"text"}
                decimalSeparator={","}
                thousandSeparator={"."}
                prefix={"$"}
              />
            </Typography>
          </div>
          <div className={cx(classes.actions, classes.flexColumn)}>
            <Typography variant="h5" align="center">
              ¿Desea realizar otra operación?
            </Typography>
            <div className={cx(classes.buttons)}>
              <Link href="/operations">
                <Button variant="contained" color="primary">
                  si
                </Button>
              </Link>
              <Link href="/cancellation">
                <Button variant="contained" color="primary">
                  no
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Balance;
