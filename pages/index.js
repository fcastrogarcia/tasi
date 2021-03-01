import { useEffect } from "react";
import axios from "axios";

// import Link from "next/link";
// import dbConnect from "utils/dbConnect";

const Index = () => {
  useEffect(() => {
    axios
      .post("/api/users", {
        document: 12345678,
        password: 1234,
      })
      .then(res => console.log(res))
      .catch(err => console.log(err));
  }, []);

  return (
    <>
      <div>Vista inicial - login</div>
    </>
  );
};

// export async function getServerSideProps() {
//   await dbConnect();
//   /* find all the data in our database */
//   const result = await Pet.find({});
//   const pets = result.map(doc => {
//     const pet = doc.toObject();
//     pet._id = pet._id.toString();
//     return pet;
//   });
//   return { props: { pets: pets } };
// }

export default Index;
