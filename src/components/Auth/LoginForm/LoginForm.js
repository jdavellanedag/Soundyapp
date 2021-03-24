import React, { useState } from "react";
import { Button, Icon, Form, Input } from "semantic-ui-react";
import { toast } from "react-toastify";
import { useForm } from "../../../hooks/useForm";
import { validateEmail } from "../../../utils/Validacion";
import firebase from "../../../utils/Firebase";

import "./LoginForm.scss";
import { handleErrors } from "../../../utils/handleError";
import { ButtonResetSendEmailVerification } from "./ButtonResetSendEmailVerification";

const LoginForm = ({ setSelectedForm }) => {
  const [formValues, handleInputChange] = useForm({
    email: "",
    password: "",
  });

  const { email, password } = formValues;

  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userActive, setUserActive] = useState(true);
  const [user, setUser] = useState(null);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setFormError({});
    if (isFormValid()) {
      setIsLoading(true);
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((response) => {
          setUser(response.user);
          setUserActive(response.user.emailVerified);
          if (!response.user.emailVerified) {
            toast.warning("Para usar la cuenta debes verificar el correo.");
          }
        })
        .catch((err) => {
          handleErrors(err.code);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  const isFormValid = () => {
    let errors = {};
    let isValid = true;
    if (!validateEmail(email)) {
      errors.email = true;
      isValid = false;
    }
    if (password.length < 6) {
      errors.password = true;
      isValid = false;
    }
    setFormError(errors);
    return isValid;
  };

  return (
    <div className="login-form">
      <h1>Música para todos.</h1>
      <Form onSubmit={onSubmit} onChange={handleInputChange}>
        <Form.Field>
          <Input
            type="text"
            name="email"
            value={email}
            placeholder="Correo electronico"
            autoComplete="off"
            icon="mail outline"
            error={formError.email}
          />
          {formError.email && (
            <span className="error-text">Introduce un correo válido</span>
          )}
        </Form.Field>
        <Form.Field>
          <Input
            type={showPassword ? "text" : "password"}
            name="password"
            value={password}
            placeholder="Contraseña"
            autoComplete="off"
            icon={
              showPassword ? (
                <Icon
                  name="eye slash outline"
                  link
                  onClick={handleShowPassword}
                />
              ) : (
                <Icon name="eye" link onClick={handleShowPassword} />
              )
            }
            error={formError.password}
          />
          {formError.password && (
            <span className="error-text">
              La contraseña debe ser mayor a 6 caracteres
            </span>
          )}
        </Form.Field>
        <Button type="submit" loading={isLoading}>
          Iniciar sesión
        </Button>
        {!userActive && (
          <ButtonResetSendEmailVerification
            user={user}
            setIsLoading={setIsLoading}
            setUserActive={setUserActive}
          />
        )}
        <div className="form__options">
          <p onClick={() => setSelectedForm(null)}>Volver</p>
          <p>
            ¿No tienes cuenta?
            <span onClick={() => setSelectedForm("register")}>
              {""}
              Registrarte
            </span>
          </p>
        </div>
      </Form>
    </div>
  );
};

export default LoginForm;
