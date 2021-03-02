import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Keyboard from "components/Keyboard";
import Layout from "components/Layout";
import styles from "./Login.module.scss";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";

// Agregar un setTimeout de 20 segundos a la vista que limpie los campo DNI y Clave, en caso de que
// esta deje de ser usada por el cliente. Tenga en cuenta que cada vez que se realiza una acción en la
// vista se debería inicializar el setTimeout

// redireccionar si está bien a la vista de operaciones
// si está mal mostrar el alert de error que diga Datos incorrectos
// hacer el setTimeout

const validateInput = (input, state) => {
  switch (input) {
    case "document":
      return state.document.length === 8 ? false : true;
    case "password":
      return state.password.length === 4 ? false : true;
    default:
      return true;
  }
};

const validateSubmit = values => {
  const { document, password } = values;

  if (document.length > 8 || document.length < 7) return false;
  if (password.length !== 4) return false;
  return true;
};

const Index = () => {
  const [value, setValue] = useState({ document: "", password: "" });
  const [focusedInput, setFocus] = useState("document");
  const [error, setError] = useState({ status: false });
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleFocus = e => setFocus(e.target.name);

  const handleClick = input => value => () => {
    if (!input) return;

    setValue(prev => {
      if (!validateInput(input, prev)) return prev;

      return {
        ...prev,
        [input]: prev[input].concat(value),
      };
    });
  };

  const handleErase = input => () => {
    if (!input) return;

    setValue(prev => {
      return {
        ...prev,
        [input]: prev[input].slice(0, -1),
      };
    });
  };

  const { document, password } = value;

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      if (!validateSubmit(value)) throw new Error();

      setLoading(true);
      const { data: { user } = {} } = await axios.post("/api/users", {
        document: Number.parseInt(document),
        password: Number.parseInt(password),
      });

      window.localStorage.setItem("user", JSON.stringify(user));
      router.push("/operations");
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.error(err.message);
      setError({ status: true, message: "Datos incorrectos" });
    }
  };

  useEffect(() => {
    if (error.status) {
      window.alert(error.message);
      setError({ status: false });
    }
  }, [error]);

  return (
    <Layout>
      <div className={styles.container}>
        <Paper elevation={0} variant="outlined">
          <form className={styles.form}>
            <p className={styles["form-title"]}>Ingrese DNI y Clave</p>
            <TextField
              label="DNI"
              type="number"
              name="document"
              onFocus={handleFocus}
              value={document}
              autoFocus
              required
              disabled={loading}
            />
            <TextField
              label="Clave"
              type="password"
              name="password"
              onFocus={handleFocus}
              value={password}
              required
              disabled={loading}
            />
          </form>
        </Paper>
        <Keyboard
          handleClick={handleClick(focusedInput)}
          handleErase={handleErase(focusedInput)}
          disableSubmit={!password || !document || loading}
          handleSubmit={handleSubmit}
        />
      </div>
    </Layout>
  );
};

export default Index;
