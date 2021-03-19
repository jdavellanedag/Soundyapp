import React from "react";
import {Button, Icon, Form, Input} from 'semantic-ui-react';
import "firebase/auth";
import firebase from "../../../utils/Firebase";

import "./RegisterForm.scss";

const RegisterForm = ({setSelectedForm}) => {

  const onSubmit = () => {
    console.log("Formulario enviado");
  }

  return (
    <div className="register-form">
      <h1>Empieza a escuchar música con una cuenta gratis de Soundy</h1>
      <Form onSubmit={onSubmit} autocomplete="off">
        <Form.Field>
          <Input
            type="text"
            name="email"
            placeholder="Correo electronico"
            icon="mail outline"
            // onChange={}
            // error={}
          />
        </Form.Field>
        <Form.Field>
          <Input
            type="password"
            name="password"
            placeholder="Contraseña"
            icon="eye"
            // onChange={}
            // error={}
          />
        </Form.Field>
        <Form.Field>
          <Input
            type="text"
            name="username"
            placeholder="¿Como deberíamos llamarte?"
            icon="user circle outline"
            // onChange={}
            // error={}
          />
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
