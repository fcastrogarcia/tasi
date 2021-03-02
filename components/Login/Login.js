import { useEffect } from "react";
import axios from "axios";
import Keyboard from "components/Keyboard";
import Layout from "components/Layout";
import styles from "./Login.module.scss";

// import Link from "next/link";
// import dbConnect from "utils/dbConnect";

// useEffect(() => {
//   axios
//     .post("/api/users", {
//       document: 12345678,
//       password: 1234,
//     })
//     .then(res => console.log(res))
//     .catch(err => console.log(err));
// }, []);

const Index = () => {
  return (
    <Layout>
      <div className={styles.container}>
        <div>Form</div>
        <Keyboard />
      </div>
    </Layout>
  );
};

export default Index;
