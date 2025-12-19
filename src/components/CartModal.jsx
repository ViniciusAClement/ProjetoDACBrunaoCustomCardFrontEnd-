import React, { useState } from 'react'
import { useCart } from '../contexts/CartContext'
import './CartModal.css'

function CartModal({ isOpen, onClose }) {
  const { items, totalItems, totalPrice, updateQuantity, removeItem, clearCart } = useCart()
  const [isCheckingOut, setIsCheckingOut] = useState(false)

  if (!isOpen) return null

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity >= 0) {
      updateQuantity(productId, newQuantity)
    }
  }

  const handleCheckout = async () => {
    setIsCheckingOut(true)

    // Simular processamento do pedido
    setTimeout(() => {
      alert(`✅ Pedido realizado com sucesso!\n\nTotal: R$ ${totalPrice.toFixed(2)}\nItens: ${totalItems}`)
      clearCart()
      setIsCheckingOut(false)
      onClose()
    }, 2000)
  }

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <div className="cart-overlay" onClick={handleOverlayClick}>
      <div className="cart-modal">
        <div className="cart-header">
          <h2>Carrinho de Compras</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>

        <div className="cart-content">
          {items.length === 0 ? (
            <div className="empty-cart">
              <div className="empty-cart-icon">🛒</div>
              <p>Seu carrinho está vazio</p>
              <button className="continue-shopping" onClick={onClose}>
                Continuar Comprando
              </button>
            </div>
          ) : (
            <>
              <div className="cart-items">
                {items.map(item => (
                  <div key={item.id} className="cart-item">
                    <div className="item-image">
                      {item.imgUrl ? (
                        <img src={item.imgUrl} alt={item.name} />
                      ) : (
                        <div className="no-image">📦</div>
                      )}
                    </div>

                    <div className="item-details">
                      <h4>{item.name}</h4>
                      <p className="item-price">R$ {item.price.toFixed(2)} cada</p>
                    </div>

                    <div className="item-controls">
                      <div className="quantity-controls">
                        <button
                          className="quantity-btn"
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                        >
                          −
                        </button>
                        <span className="quantity">{item.quantity}</span>
                        <button
                          className="quantity-btn"
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                        >
                          +
                        </button>
                      </div>

                      <div className="item-total">
                        R$ {(item.price * item.quantity).toFixed(2)}
                      </div>

                      <button
                        className="remove-btn"
                        onClick={() => removeItem(item.id)}
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="cart-summary">
                <div className="summary-row">
                  <span>Total de itens:</span>
                  <span>{totalItems}</span>
                </div>
                <div className="summary-row total">
                  <span>Total:</span>
                  <span>R$ {totalPrice.toFixed(2)}</span>
                </div>
              </div>

              <div className="cart-actions">
                <button className="clear-cart-btn" onClick={clearCart}>
                  Limpar Carrinho
                </button>
                <button
                  className="checkout-btn"
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                >
                  {isCheckingOut ? 'Processando...' : `Finalizar Compra (R$ ${totalPrice.toFixed(2)})`}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default CartModal
