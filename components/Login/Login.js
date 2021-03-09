import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Keyboard from "components/Keyboard";
import styles from "./Login.module.scss";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import useSetTimeout from "hooks/useSetTimeout";
import ProgressContainer from "components/ProgressContainer";

const validateInput = (input, state) => {
  const { document, password } = state;

  switch (input) {
    case "document":
      return document.length < 8;
    case "password":
      return password.length < 4;
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
  const initialState = { document: "", password: "" };
  const [value, setValue] = useState(initialState);
  const [focusedInput, setFocus] = useState("document");
  const [error, setError] = useState({ status: false });
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  useSetTimeout(() => setValue(initialState));

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
    <ProgressContainer loading={loading}>
      <Paper elevation={0} variant="outlined">
        <form id="login" className={styles.form} onSubmit={handleSubmit}>
          <p className={styles["form-title"]}>Ingrese DNI y Clave</p>
          <TextField
            label="DNI"
            type="number"
            name="document"
            onFocus={handleFocus}
            value={document}
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
        formId="login"
        handleClick={handleClick(focusedInput)}
        handleErase={handleErase(focusedInput)}
        disableSubmit={!password || !document || loading}
      />
    </ProgressContainer>
  );
};

export default Index;
