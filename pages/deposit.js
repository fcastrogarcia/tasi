import Layout from "components/Layout";
import useCheckUser from "hooks/useCheckUser";
import Deposit from "components/Deposit";

const DepositPage = () => {
  const { user } = useCheckUser();
  return (
    <Layout>
      <Deposit user={user} />
    </Layout>
  );
};

export default DepositPage;
