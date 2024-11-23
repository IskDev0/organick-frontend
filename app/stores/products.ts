import type {
  IProduct, IProductFull,
  IProductWithPagination,
  PaginationInfo
} from "~/types/IProduct";

export const useProductsStore = defineStore("products", () => {
  const { $apiClient } = useNuxtApp();

  const products = ref<IProduct[]>([]);
  const paginationInfo = ref<PaginationInfo>({
    currentPage: 1,
    totalPages: 1,
    totalProducts: 1,
    limit: 12,
  });
  const newProduct = ref<IProduct | null>(null);
  const updatingProduct = ref<IProduct | null>(null);
  const filters = ref({
    name: null,
    category_id: null,
  });

  const getProducts = async (): Promise<void> => {
    try {
      const { data, pagination } = await $apiClient<IProductWithPagination>(
        `/products?page=${paginationInfo.value?.currentPage || 1}&limit=12`,
      );

      if (data?.length > 0) {
        products.value = data
        paginationInfo.value = pagination;
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getProduct = async (id: number): Promise<IProductFull> => {
    try {
      return $apiClient<IProductFull>(`/products/${id}`);
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const addProduct = async () => {
    try {
      await $apiClient("/products", {
        method: "POST",
        body: newProduct.value,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const updateProduct = async (id: number) => {
    try {
      await $apiClient(`/products/${id}`, {
        method: "PUT",
        body: updatingProduct.value,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const deleteProduct = async (id: number) => {
    try {
      await $apiClient(`/products/${id}`, {
        method: "DELETE",
      });
    } catch (error) {
      console.error(error);
    }
  };

  const searchProducts = async () => {
    const params = new URLSearchParams();

    if (filters.value.name) {
      params.append("name", filters.value.name);
    }

    if (filters.value.category_id) {
      params.append("category_id", filters.value.category_id);
    }

    if (paginationInfo.value?.currentPage) {
      params.append("page", paginationInfo.value.currentPage.toString());
    }

    try {
      const { data, pagination } = await $apiClient<IProductWithPagination>(
        `/products/search?${params.toString()}`,
      );
      if (data?.length > 0) {
        products.value = data;
        paginationInfo.value = pagination;
      }
    } catch (error) {
      console.error(error);
    }
  };

  return {
    products,
    paginationInfo,
    newProduct,
    updatingProduct,
    filters,
    getProducts,
    getProduct,
    addProduct,
    updateProduct,
    deleteProduct,
    searchProducts,
  };
});
