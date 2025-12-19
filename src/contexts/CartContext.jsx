import React, { createContext, useContext, useReducer, useEffect } from 'react'

// Estado inicial do carrinho
const initialState = {
  items: [],
  totalItems: 0,
  totalPrice: 0
}

// Tipos de ações
const CART_ACTIONS = {
  ADD_ITEM: 'ADD_ITEM',
  REMOVE_ITEM: 'REMOVE_ITEM',
  UPDATE_QUANTITY: 'UPDATE_QUANTITY',
  CLEAR_CART: 'CLEAR_CART',
  LOAD_CART: 'LOAD_CART'
}

// Reducer para gerenciar o estado do carrinho
function cartReducer(state, action) {
  switch (action.type) {
    case CART_ACTIONS.ADD_ITEM: {
      const { product, quantity = 1 } = action.payload
      const existingItemIndex = state.items.findIndex(item => item.id === product.id)

      let newItems
      if (existingItemIndex >= 0) {
        // Produto já existe, aumenta a quantidade
        newItems = state.items.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      } else {
        // Novo produto
        newItems = [...state.items, { ...product, quantity }]
      }

      const totalItems = newItems.reduce((sum, item) => sum + item.quantity, 0)
      const totalPrice = newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)

      return {
        ...state,
        items: newItems,
        totalItems,
        totalPrice
      }
    }

    case CART_ACTIONS.REMOVE_ITEM: {
      const { productId } = action.payload
      const newItems = state.items.filter(item => item.id !== productId)
      const totalItems = newItems.reduce((sum, item) => sum + item.quantity, 0)
      const totalPrice = newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)

      return {
        ...state,
        items: newItems,
        totalItems,
        totalPrice
      }
    }

    case CART_ACTIONS.UPDATE_QUANTITY: {
      const { productId, quantity } = action.payload

      if (quantity <= 0) {
        // Se quantidade for 0 ou negativa, remove o item
        return cartReducer(state, { type: CART_ACTIONS.REMOVE_ITEM, payload: { productId } })
      }

      const newItems = state.items.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )

      const totalItems = newItems.reduce((sum, item) => sum + item.quantity, 0)
      const totalPrice = newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)

      return {
        ...state,
        items: newItems,
        totalItems,
        totalPrice
      }
    }

    case CART_ACTIONS.CLEAR_CART: {
      return initialState
    }

    case CART_ACTIONS.LOAD_CART: {
      return action.payload
    }

    default:
      return state
  }
}

// Criar o contexto
const CartContext = createContext()

// Provider do contexto
export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState)

  // Carregar carrinho do localStorage ao inicializar
  useEffect(() => {
    const savedCart = localStorage.getItem('cart')
    if (savedCart) {
      try {
        const cartData = JSON.parse(savedCart)
        dispatch({ type: CART_ACTIONS.LOAD_CART, payload: cartData })
      } catch (error) {
        console.error('Erro ao carregar carrinho:', error)
      }
    }
  }, [])

  // Salvar carrinho no localStorage sempre que mudar
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state))
  }, [state])

  // Funções do carrinho
  const addItem = (product, quantity = 1) => {
    dispatch({ type: CART_ACTIONS.ADD_ITEM, payload: { product, quantity } })
  }

  const removeItem = (productId) => {
    dispatch({ type: CART_ACTIONS.REMOVE_ITEM, payload: { productId } })
  }

  const updateQuantity = (productId, quantity) => {
    dispatch({ type: CART_ACTIONS.UPDATE_QUANTITY, payload: { productId, quantity } })
  }

  const clearCart = () => {
    dispatch({ type: CART_ACTIONS.CLEAR_CART })
  }

  const value = {
    ...state,
    addItem,
    removeItem,
    updateQuantity,
    clearCart
  }

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}

// Hook para usar o contexto do carrinho
export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart deve ser usado dentro de um CartProvider')
  }
  return context
}
