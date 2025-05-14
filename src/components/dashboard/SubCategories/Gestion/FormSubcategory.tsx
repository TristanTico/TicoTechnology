import { useCategorieStore } from "@/store/categorieStore";
import { useEffect } from "react";
import { useForm } from "./useForm";

interface FormCategoryProps {
  onSuccess: () => void;
}

export const FormSubcategory: React.FC<FormCategoryProps> = ({ onSuccess }) => {
  const fetchBySelect = useCategorieStore((state) => state.fetchBySelect);
  const categoriesSelect = useCategorieStore((state) => state.categoriesSelect);
  const { formData, handleChange, handleSubmit, errors } = useForm({
    nombreSubcategoria: "",
    categorias_id: 0,
  });

  useEffect(() => {
    fetchBySelect();
  }, []);
  return (
    <form onSubmit={(e) => handleSubmit(e, onSuccess)} className="space-y-4">
      <div>
        <label className="block text-gray-700 mb-2">Nombre SubCategoria</label>
        <input
          type="text"
          name="nombreSubcategoria"
          value={formData.nombreSubcategoria}
          onChange={handleChange}
          placeholder="Ingrese el nombre de la subCategoria"
          className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
        />
        {errors.nombreSubcategoria && (
          <p className="mt-1 text-sm text-red-600">
            {errors.nombreSubcategoria}
          </p>
        )}
      </div>
      <div>
        <select
          name="categorias_id"
          value={formData.categorias_id}
          onChange={handleChange}
          className="w-full p-2 border rounded-lg"
        >
          <option value="">Todas las Categorías</option>
          {categoriesSelect.map((cat) => (
            <option key={cat.categorias_id} value={cat.categorias_id}>
              {cat.nombreCategoria}
            </option>
          ))}
        </select>
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
