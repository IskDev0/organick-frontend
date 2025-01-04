import type {
  IProduct,
  IProductFull,
  IProductWithPagination,
  PaginationInfo,
} from "~/types/IProduct";

export const useProductsStore = defineStore("products", () => {
  const { $apiClient } = useNuxtApp();

  const products = ref<IProduct[]>([]);
  const productsPaginationInfo = ref<PaginationInfo>({
    currentPage: 1,
    totalPages: 1,
    totalProducts: 1,
    limit: 10,
  });
  const newProduct = ref<IProduct>({
    name: "",
    price: "",
    discount: "",
    categoryId: null,
    rating: "",
    image: "",
    category: "",
    description: "",
  });
  const updatingProduct = ref<IProduct>({
    name: "",
    price: "",
    discount: "",
    categoryId: null,
    rating: "",
    image: "",
    category: "",
    description: "",
  });
  const filters = ref({
    name: null,
    categoryId: null,
  });

  const getProducts = async (): Promise<void> => {
    try {
      const { data, pagination } = await $apiClient<IProductWithPagination>(
        `/products?page=${productsPaginationInfo.value?.currentPage || 1}&limit=${productsPaginationInfo.value?.limit || 12}`,
      );

      if (data?.length > 0) {
        products.value = data;
        productsPaginationInfo.value = {
          ...pagination,
          limit: pagination.limit.toString(),
        };
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
    const formData = new FormData();

    if (newProduct.value) {
      formData.append("name", newProduct.value.name);
      formData.append("price", String(newProduct.value.price));
      formData.append(
        "discount",
        newProduct.value.discount ? newProduct.value.discount : 0
      );
      formData.append(
        "rating",
        newProduct.value.rating ? newProduct.value.rating : 0,
      );

      formData.append('stock', newProduct.value.stock)

      if (newProduct.value.image) {
        formData.append("image", newProduct.value.image);
      } else {
        console.error("Image file is missing");
      }

      formData.append("categoryId", newProduct.value.categoryId);
      formData.append("description", newProduct.value.description);
    }

    try {
      await $apiClient("/products", {
        method: "POST",
        body: formData,
      });
    } catch (error) {
      console.error("Request error:", error);
    }
  };

  const updateProduct = async (id: string): Promise<void> => {

    let formData = new FormData();
    if (updatingProduct.value) {
      formData.append("name", updatingProduct.value.name);
      formData.append("price", String(updatingProduct.value.price));
      formData.append(
        "discount",
        updatingProduct.value.discount ? updatingProduct.value.discount : 0,
      );
      formData.append(
        "rating",
        updatingProduct.value.rating ? updatingProduct.value.rating : 0,
      );

      formData.append('stock', updatingProduct.value.stock)

      if (updatingProduct.value.image) {
        formData.append("image", updatingProduct.value.image);
      } else {
        console.error("Image file is missing");
      }

      formData.append("categoryId", String(updatingProduct.value.categoryId));
      formData.append("description", updatingProduct.value.description);
    }

    try {
      await $apiClient(`/products/${id}`, {
        method: "PUT",
        body: formData,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const deleteProduct = async (id: string): Promise<void> => {
    try {
      await $apiClient(`/products/${id}`, {
        method: "DELETE",
      });
    } catch (error) {
      console.error(error);
    }
  };

  const searchProducts = async (): Promise<void> => {
    const params = new URLSearchParams();

    if (filters.value.name) {
      params.append("name", filters.value.name);
    }

    if (filters.value.categoryId) {
      params.append("categoryId", filters.value.categoryId);
    }

    if (productsPaginationInfo.value?.currentPage) {
      params.append(
        "page",
        productsPaginationInfo.value.currentPage.toString(),
      );
    }

    try {
      const { data, pagination } = await $apiClient<IProductWithPagination>(
        `/products/search?${params.toString()}`,
      );
      if (data?.length > 0) {
        products.value = data;
        productsPaginationInfo.value = pagination;
      }
    } catch (error) {
      console.error(error);
    }
  };

  return {
    products,
    productsPaginationInfo,
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