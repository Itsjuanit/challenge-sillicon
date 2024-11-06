import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { Message } from "primereact/message";
import { loginRequest } from "./utils/utils";
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);

  // Expresiones regulares para validación
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^[a-zA-Z0-9]+$/;

  const handleLogin = async () => {
    setMessage(null);

    // Validación de campos
    if (!emailRegex.test(username)) {
      setMessage({ severity: "error", text: "El email no es válido." });
      return;
    }
    if (!passwordRegex.test(password)) {
      setMessage({ severity: "error", text: "La contraseña solo debe contener caracteres alfanuméricos." });
      return;
    }

    const result = await loginRequest(username, password);

    if (result.success) {
      setMessage({ severity: "success", text: "Inicio de sesión exitoso." });
      localStorage.setItem("user", JSON.stringify(result.data));
      window.location.href = "/dashboard";
    } else {
      setMessage({ severity: "error", text: result.data.message || "Credenciales incorrectas." });
    }
  };

  return (
    <div className="p-fluid p-formgrid p-grid" style={{ maxWidth: "400px", margin: "0 auto", padding: "20px" }}>
      <h2 style={{ textAlign: "center" }}>Iniciar Sesión</h2>
      {message && (
        <div className="p-col-12" style={{ marginBottom: "20px" }}>
          <Message severity={message.severity} text={message.text} />
        </div>
      )}
      <div className="p-field p-col-12">
        <label htmlFor="username">Nombre de usuario (email)</label>
        <InputText id="username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="usuario@dominio.com" />
      </div>
      <div className="p-field p-col-12">
        <label htmlFor="password">Contraseña</label>
        <Password id="password" value={password} onChange={(e) => setPassword(e.target.value)} feedback={false} />
      </div>
      <div className="p-col-12">
        <Button label="Iniciar sesión" onClick={handleLogin} className="p-button-primary" style={{ width: "100%", marginTop: "10px" }} />
      </div>
    </div>
  );
};

export default Login;
