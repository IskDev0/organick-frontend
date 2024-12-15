import type { IProductFull } from "~/types/IProduct";

export const useCartStore = defineStore('cart', () => {

  const cartItems = ref<IProductFull[]>([])

  const addToCart = (product: IProductFull, quantity: number) => {
      cartItems.value.push({...product, quantity})
  }

  const removeFromCart = (id: number) => {
    cartItems.value = cartItems.value.filter(item => item.id !== id)
  }


  const clearCart = () => {
    cartItems.value = []
  }

  const isProductInCart = computed(() => {
    return (id: number) => {
      return cartItems.value.some(item => item.id === id)
    }
  })

  function countTotalItem(id: number, quantity: number): number {
    let item = cartItems.value.find((item) => item.id === id);
    if (item) {
      return parseInt(item.price) * quantity;
    }
    return 0;
  }

  const totalPrice = computed(() => {
    let total = 0;
    cartItems.value.forEach((item) => {
      total += countTotalItem(item.id, item.quantity);
    });
    return total.toFixed(2);
  });

  return {
    cartItems,
    addToCart,
    removeFromCart,
    isProductInCart,
    clearCart,
    countTotalItem,
    totalPrice
  }

}, {
  persist: {
    storage: piniaPluginPersistedstate.localStorage()
  }
})