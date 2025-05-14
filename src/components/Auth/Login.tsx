import { Eye, EyeClosed } from "lucide-react";
import { useState } from "react";
import { useForm } from "./useFormLogin";

interface LoginProps {
  onSuccess: () => void;
}
export const Login: React.FC<LoginProps> = ({ onSuccess }) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const { formData, handleChange, handleSubmit, errors } = useForm({
    correoUsuario: "",
    clave: "",
  });
  return (
    <form onSubmit={(e) => handleSubmit(e, onSuccess)} className="space-y-4">
      <div>
        <label className="block text-gray-700 mb-2">Correo</label>
        <input
          type="email"
          name="correoUsuario"
          value={formData.correoUsuario}
          onChange={handleChange}
          placeholder="Ingrese su correo"
          className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
        />
        {errors.correoUsuario && (
          <p className="mt-1 text-sm text-red-600">{errors.correoUsuario}</p>
        )}
      </div>
      <div>
        <label className="block text-gray-700 mb-2">Contraseña</label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            name="clave"
            value={formData.clave}
            onChange={handleChange}
            placeholder="Ingrese su contraseña"
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-2 top-2 text-gray-500 hover:text-gray-700"
          >
            {showPassword ? <EyeClosed size={20} /> : <Eye size={20} />}
          </button>
          {errors.clave && (
            <p className="mt-1 text-sm text-red-600">{errors.clave}</p>
          )}
        </div>
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors"
      >
        Login
      </button>
      <button
        type="button"
        className="w-full text-sm text-blue-500 hover:text-blue-600 mt-2"
      >
        Forgot Password?
      </button>
    </form>
  );
};
