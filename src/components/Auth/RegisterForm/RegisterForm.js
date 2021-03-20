import React, { useState } from "react";
import {Button, Icon, Form, Input} from 'semantic-ui-react';
import "firebase/auth";
import firebase from "../../../utils/Firebase";
import { useForm } from "../../../hooks/useForm";
import { validateEmail } from "../../../utils/Validacion";

import "./RegisterForm.scss";

const RegisterForm = ({setSelectedForm}) => {

  const [formValues, handleInputChange] = useForm({
    email: "",
    password: "",
    username: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const {email, password, username} = formValues;

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  }

  const onSubmit = (e) => {
    e.preventDefault();
    setFormError({});
    if(isFormValid()){
      console.log("Formulario valido");
    }
  }

  const isFormValid = () => {
    let errors = {};
    let isValid = true;
    if(!validateEmail(email)){
      errors.email = true;
      isValid = false;
    }
    if(password.length < 6){
      errors.password = true;
      isValid = false;
    }
    if(username.trim().length === 0){
      errors.username = true;
      isValid = false;
    }
    setFormError(errors);
    return isValid;
  }

  return (
    <div className="register-form">
      <h1>Empieza a escuchar música con una cuenta gratis de Soundy</h1>
      <Form onSubmit={onSubmit} onChange={handleInputChange}>
        <Form.Field>
          <Input
            type="text"
            name="email"
            value={email}
            placeholder="Correo electronico"
            icon="mail outline"
            autoComplete="off" 
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
            icon={showPassword ? (
              <Icon name="eye slash outline" link onClick={handleShowPassword} />
            ) : (
              <Icon name="eye" link onClick={handleShowPassword} />
            )}
            autoComplete="off" 
            error={formError.password}
          />
          {formError.password && (
            <span className="error-text">La contraseña debe ser mayor a 6 caracteres</span>
          )}
        </Form.Field>
        <Form.Field>
          <Input
            type="text"
            name="username"
            value={username}
            placeholder="¿Como deberíamos llamarte?"
            icon="user circle outline"
            autoComplete="off" 
            error={formError.username}
          />
          {formError.username && (
            <span className="error-text">El usuario no puede estar vacío</span>
          )}
          <Button type="submit">Continuar</Button>
        </Form.Field>
      </Form>
      <div className="register-form__options">
        <p onClick={()=>setSelectedForm(null)}>Volver</p>
        <p>¿Ya tienes Soundy? <span onClick={()=>setSelectedForm("login")}>Iniciar sesión</span></p>    
      </div>
    </div>
  );
};

export default RegisterForm;
