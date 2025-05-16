import { Eye, EyeClosed } from "lucide-react";
import { useForm } from "./useForm";
import { useState } from "react";

interface FormUserProps {
  onSuccess: () => void;
}
export const FormUser: React.FC<FormUserProps> = ({ onSuccess }) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const { formData, handleChange, handleSubmit, errors } = useForm({
    cedulaUsuario: "",
    nombreUsuario: "",
    correoUsuario: "",
    telefono: "",
    direccion: "",
    rol: "",
    clave: "",
  });
  return (
    <form onSubmit={(e) => handleSubmit(e, onSuccess)} className="space-y-4">
      <div>
        <label className="block text-gray-700 mb-2">Cédula</label>
        <input
          type="text"
          name="cedulaUsuario"
          value={formData.cedulaUsuario}
          onChange={handleChange}
          placeholder="Ingrese la cedula"
          className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
        />
        {errors.cedulaUsuario && (
          <p className="mt-1 text-sm text-red-600">{errors.cedulaUsuario}</p>
        )}
      </div>

      {/* Nombre completo */}
      <div>
        <label className="block text-gray-700 mb-2">Nombre Completo</label>
        <input
          type="text"
          name="nombreUsuario"
          value={formData.nombreUsuario}
          onChange={handleChange}
          placeholder="Ingrese el nombre completo"
          className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
        />
        {errors.nombreUsuario && (
          <p className="mt-1 text-sm text-red-600">{errors.nombreUsuario}</p>
        )}
      </div>

      {/* Correo y Teléfono */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-700 mb-2">Correo</label>
          <input
            type="email"
            name="correoUsuario"
            value={formData.correoUsuario}
            onChange={handleChange}
            placeholder="Ingrese el correo"
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
          />
          {errors.correoUsuario && (
            <p className="mt-1 text-sm text-red-600">{errors.correoUsuario}</p>
          )}
        </div>
        <div>
          <label className="block text-gray-700 mb-2">Teléfono</label>
          <input
            type="text"
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
            placeholder="Ingrese el teléfono"
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
          />
          {errors.telefono && (
            <p className="mt-1 text-sm text-red-600">{errors.telefono}</p>
          )}
        </div>
      </div>

      {/* Dirección */}
      <div>
        <label className="block text-gray-700 mb-2">Dirección</label>
        <textarea
          rows={3}
          name="direccion"
          value={formData.direccion}
          onChange={handleChange}
          placeholder="Ingrese la dirección"
          className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
        ></textarea>
        {errors.direccion && (
          <p className="mt-1 text-sm text-red-600">{errors.direccion}</p>
        )}
      </div>

      <select name="rol" value={formData.rol} onChange={handleChange} className="w-full p-2 border rounded">
        <option value="">Seleccione un rol</option>
        <option value="Admin">Admin</option>
        <option value="Cliente">Cliente</option>
      </select>

      <div>
        <label className="block text-gray-700 mb-2">Contraseña</label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            name="clave"
            value={formData.clave}
            onChange={handleChange}
            placeholder="Ingrese la contraseña"
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
      {/* Submit */}
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors"
      >
        Crear Usuario
      </button>
    </form>
  );
};
