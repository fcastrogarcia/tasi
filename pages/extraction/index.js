import Layout from "components/Layout";
import Extraction from "components/Extraction";
import useCheckUser from "hooks/useCheckUser";

const ExtractionPage = () => {
  const { user } = useCheckUser();
  return (
    <Layout>
      <Extraction user={user} />
    </Layout>
  );
};

export default ExtractionPage;
