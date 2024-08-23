// Importaciones de React y hooks
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Importaciones de servicios y componentes
import { login } from "../services/api";
import { Link } from "react-router-dom";
import Logo from "../assets/logo.webp";
import Input from "../components/ui/Input";
import Label from "../components/ui/Label";
import Button from "../components/ui/Button";
import LayoutLogin from "../components/login/LayoutLogin";

// Constantes
const TEXTS = {
  submit: "Iniciar sesión",
};

const Login = () => {
  // Estados del componente
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Hooks
  const navigate = useNavigate();
  const { login: authLogin } = useAuth();

  // Manejo de cambios en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Manejo del envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación del formulario
    const newErrors = {};
    if (!formData.username) newErrors.username = "Ingrese el usuario";
    if (!formData.password) newErrors.password = "Ingrese su contraseña";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setIsLoading(true);
      try {
        const { token, role } = await login(
          formData.username,
          formData.password
        );
        authLogin(token, role);
        navigate(
          role === "Administrador" ? "/admin-dashboard" : "/user-dashboard"
        );
      } catch (error) {
        console.error("Error de inicio de sesión:", error);
        setErrors({
          form:
            error.response?.data?.message ||
            "Error al iniciar sesión. Por favor, intenta de nuevo.",
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <LayoutLogin>
      <main className="w-full max-w-sm mx-auto p-6">
        <img
          className="w-52 h-28 mb-6 mx-auto"
          src={Logo}
          alt="Logo"
          loading="lazy"
        />
        <form
          onSubmit={handleSubmit}
          aria-label="Formulario de inicio de sesión"
          className="space-y-4"
        >
          <div>
            <Label name="username" className="text-gray-300">
              Usuario
            </Label>
            <Input
              type="email"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Ingresa tu usuario"
              errorMessage={errors.username}
            />
          </div>

          <div>
            <Label name="password" className="text-gray-300">
              Contraseña
            </Label>
            <Input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Ingresa tu contraseña"
              errorMessage={errors.password}
            />
          </div>

          {errors.form && <p className="text-red-500">{errors.form}</p>}

          <Button className="rounded-md shadow-md shadow-black" type="submit" disabled={isLoading}>
            {isLoading ? "Cargando..." : TEXTS.submit}
          </Button>
        </form>
        <div className="mt-4 text-right">
          <Link
            to="/forgot-password"
            className="text-white font-semibold hover:text-gray-200 inline-block"
          >
            ¿Olvidaste tu contraseña?
          </Link>
        </div>
      </main>
    </LayoutLogin>
  );
};

export default Login;
