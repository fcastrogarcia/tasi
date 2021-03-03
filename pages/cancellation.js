import Layout from "components/Layout";
import Typography from "@material-ui/core/Typography";
import useSetTimeout from "hooks/useSetTimeout";
import { useRouter } from "next/router";

const Cancellation = () => {
  const router = useRouter();
  useSetTimeout(() => router.push("/"), 5000);

  return (
    <Layout>
      <div
        className="container"
        style={{ flexDirection: "column", justifyContent: "center" }}
      >
        <Typography variant="h4" gutterBottom>
          La operación ha sido cancelada.
        </Typography>
      </div>
    </Layout>
  );
};

export default Cancellation;
