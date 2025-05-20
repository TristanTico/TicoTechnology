export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  category: string;
  image: string;
  inStock: boolean;
  quantity: number;
}

export interface ProductCart {
  productos_id: number;
  nombreProducto: string;
  precioProducto: number;
  imagenPrincipal: string;
  slug: string;
  destacado: boolean;
  stockProducto: number;
  cantidad: number;
}

export interface ProductoConSubcategoria extends ProductCart {
  subcategorias: {
    nombreSubcategoria: string;
  };
}

interface ProductosResponse {
  ProductosDestacados: ProductoConSubcategoria[];
  ProductosPorSubcategoria: {
    [subcategoria: string]: ProductCart[];
  };
}

export interface CartStore {
  items: ProductCart[];
  addToCart: (product: ProductCart) => void;
  removeFromCart: (productos_id: number) => void;
  clearCart: () => void;
  increaseQuantity: (productos_id: number) => void;
  decreaseQuantity: (productos_id: number) => void;
}

export interface User {
  cedulaUsuario: string;
  nombreUsuario: string;
  correoUsuario: string;
  telefono: string | number;
  direccion: string;
  rol: string;
  estado: string;
}

export interface SubCategoriaCreate {
  nombreSubcategoria: string;
  categorias_id: number;
}

export interface SubCategoriaTable {
  nombreSubcategoria: string;
  categorias: CategoriaTable;
}
export interface CategoriaTable {
  nombreCategoria: string;
}

export interface Pro {
  productos_id: number;
  nombreProducto: string;
  precioProducto: number;
  stockProducto: number;
  imagenPrincipal: string;
  nombreCategoria: string;
  subcategorias: SubCategoriaTable;
}

export interface ProductoCreate {
  nombreProducto: string;
  precioProducto: number;
  stockProducto: number;
  descripcionProducto: string;
  destacado: boolean;
  datosPropios: object;
  subcategorias_id: number;
}

export interface Categoria {
  categorias_id: number;
  nombreCategoria: string;
}

export interface SubCategoria {
  subCategorias_id: number;
  nombreSubcategoria: string;
  categorias_id: number;
}

export interface Orden {
  ordenes_id: number;
  fechaOrden: string;
  totalOrden: number;
  estadoOrden: string;
  cedulaUsuario: string;
}

export interface RegisterUser {
  cedulaUsuario: string;
  nombreUsuario: string;
  correoUsuario: string;
  telefono: string | number;
  direccion: string;
  clave: string;
}

export interface CreateUser {
  cedulaUsuario: string;
  nombreUsuario: string;
  correoUsuario: string;
  telefono: string | number;
  direccion: string;
  rol: string;
  clave: string;
}

export interface AuthUser {
  correoUsuario: string;
  clave: string;
}

export interface AuthState {
  userLogin: any | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  login: (authUser: AuthUser) => Promise<boolean>;
  loadUserRole: () => Promise<void>;
  logout: () => void;
  register: (registerUser: RegisterUser) => Promise<boolean>;
}

export interface QueryPagination {
  page: number;
  limit: number;
}

export interface UserState {
  users: User[];
  isLoading: boolean;
  error: string | null;
  page: number;
  limit: number;
  totalPages: number;
  fetchUsers: (query: QueryPagination) => Promise<void>;
  createUser: (user: CreateUser) => Promise<boolean>;
  setPage: (page: number) => void;
  setLimit: (limit: number) => void;
}

export interface ProductState {
  products: Pro[];
  productsHome: ProductosResponse | null;
  isLoading: boolean;
  error: string | null;
  page: number;
  limit: number;
  totalPages: number;
  fetchProducts: (query: QueryPagination) => Promise<void>;
  createProduct: (formData: FormData) => Promise<boolean>;
  fetchProductsHome: () => Promise<void>;
  setPage: (page: number) => void;
  setLimit: (limit: number) => void;
}

export interface CategorieState {
  categories: Categoria[];
  categoriesSelect: Categoria[];
  isLoading: boolean;
  error: string | null;
  page: number;
  limit: number;
  totalPages: number;
  fetchCategories: (query: QueryPagination) => Promise<void>;
  createCategory: (category: CategoriaTable) => Promise<boolean>;
  fetchBySelect: () => Promise<void>;
  setPage: (page: number) => void;
  setLimit: (limit: number) => void;
}

export interface SubcategorieState {
  subcategories: SubCategoria[];
  isLoading: boolean;
  error: string | null;
  page: number;
  limit: number;
  totalPages: number;
  fetchSubCategories: (query: QueryPagination) => Promise<void>;
  createSubCategory: (category: SubCategoriaCreate) => Promise<boolean>;
  setPage: (page: number) => void;
  setLimit: (limit: number) => void;
}

interface DetalleOrden {
  productos_id: number;
  precioUnitario: number;
  cantidad: number;
}

export interface OrdenCreate {
  detalles: DetalleOrden[];
}

export interface OrderState {
  orders: Orden[];
  isLoading: boolean;
  error: string | null;
  page: number;
  limit: number;
  totalPages: number;
  fetchOrders: (query: QueryPagination) => Promise<void>;
  createOrder: (order: OrdenCreate) => Promise<boolean>;
  setPage: (page: number) => void;
  setLimit: (limit: number) => void;
}
