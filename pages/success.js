import Layout from "components/Layout";
import useSetTimeout from "hooks/useSetTimeout";
import { useRouter } from "next/router";
import Typography from "@material-ui/core/Typography";
import NumberFormat from "react-number-format";

const SuccessPage = () => {
  const router = useRouter();

  const query = router.query;
  const { amount = "", operation = "" } = query;

  useSetTimeout(() => router.push("/"), 10000);

  return (
    <Layout>
      <div className="container" style={{ padding: "0 24px" }}>
        <Typography variant="h5" align="center">
          Su {operation === "extraction" ? "extracción" : "depósito"} de monto{" "}
          {
            <NumberFormat
              value={amount || 0}
              displayType={"text"}
              decimalSeparator={","}
              thousandSeparator={"."}
              prefix={"$"}
            />
          }
          , en la cuenta N° XXXX XXXX XXX, fue realizado con éxito.
        </Typography>
      </div>
    </Layout>
  );
};

export default SuccessPage;
