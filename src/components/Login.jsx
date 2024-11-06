import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { Message } from "primereact/message";

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

    try {
      // Request al servidor
      const response = await fetch("https://test.silicon-access.com/fapi/auth/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Manejo del éxito del login
        setMessage({ severity: "success", text: "Inicio de sesión exitoso." });
        localStorage.setItem("user", JSON.stringify(data));
        // Redirige a la sección privada o muestra datos adicionales si es necesario
        window.location.href = "/dashboard";
      } else {
        setMessage({ severity: "error", text: data.message || "Credenciales incorrectas." });
      }
    } catch (error) {
      setMessage({ severity: "error", text: "Ocurrió un error en la autenticación." });
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
