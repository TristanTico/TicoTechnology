import { useForm } from "./useForm";

interface FormCategoryProps {
  onSuccess: () => void;
}
export const FormCategory: React.FC<FormCategoryProps> = ({ onSuccess }) => {
  const { formData, handleChange, handleSubmit, errors } = useForm({
    nombreCategoria: "",
  });
  return (
    <form onSubmit={(e) => handleSubmit(e, onSuccess)} className="space-y-4">
      <div>
        <label className="block text-gray-700 mb-2">Nombre Categoria</label>
        <input
          type="text"
          name="nombreCategoria"
          value={formData.nombreCategoria}
          onChange={handleChange}
          placeholder="Ingrese el nombre de la categoria"
          className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
        />
        {errors.nombreCategoria && (
          <p className="mt-1 text-sm text-red-600">{errors.nombreCategoria}</p>
        )}
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded transition-colors cursor-pointer"
      >
        Guardar
      </button>
    </form>
  );
};
