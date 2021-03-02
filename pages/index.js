import { useEffect } from "react";
import axios from "axios";

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
    <div className="layout">
      <div className="container">
        <div>Vista inicial - login</div>
      </div>
    </div>
  );
};

export default Index;
