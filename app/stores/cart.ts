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

  return {
    cartItems,
    addToCart,
    removeFromCart,
    isProductInCart,
    clearCart
  }

}, {
  persist: {
    storage: piniaPluginPersistedstate.localStorage()
  }
})