import Layout from "components/Layout";
import useCheckUser from "hooks/useCheckUser";
import DifferentAmount from "components/DifferentAmount";

const DifferentAmountPage = () => {
  const { user } = useCheckUser();
  return (
    <Layout>
      <DifferentAmount user={user} />
    </Layout>
  );
};

export default DifferentAmountPage;
