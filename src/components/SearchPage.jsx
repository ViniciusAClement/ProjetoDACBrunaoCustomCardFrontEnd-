import React, { useState, useEffect } from 'react'
import { useCart } from '../contexts/CartContext'
import { api } from '../api/mockApi'
import './SearchPage.css'

function SearchPage({ searchTerm, category, subcategory, onBack }) {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const { addItem } = useCart()

  useEffect(() => {
    loadFilteredProducts()
  }, [searchTerm, category, subcategory])

  const loadFilteredProducts = async () => {
    try {
      setLoading(true)
      const allProducts = await api.getProducts()
      let filteredProducts = allProducts

      if (searchTerm) {
        filteredProducts = filteredProducts.filter(product =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(searchTerm.toLowerCase())
        )
      }

      if (category) {
        filteredProducts = filteredProducts.filter(product =>
          product.category === category
        )
      }

      if (subcategory) {
        filteredProducts = filteredProducts.filter(product =>
          product.subcategory === subcategory
        )
      }

      setProducts(filteredProducts)
    } catch (err) {
      console.error('Erro ao carregar produtos filtrados:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleProductClick = (product) => {
    setSelectedProduct(product)
  }

  const closeProductDetails = () => {
    setSelectedProduct(null)
  }

  const handleAddToCart = (product) => {
    addItem(product)
    alert(`✅ ${product.name} adicionado ao carrinho!`)
  }

  const getPageTitle = () => {
    if (searchTerm) {
      return `Resultados para "${searchTerm}"`
    }
    if (subcategory) {
      const subcategoryNames = {
        motor: 'Motor',
        admissao: 'Admissão',
        escape: 'Escape',
        transmissao: 'Transmissão',
        suspensao: 'Suspensão',
        limpeza: 'Limpeza',
        acessorios: 'Acessórios',
        aerofolios: 'Aerofólios'
      }
      return subcategoryNames[subcategory] || 'Produtos'
    }
    return 'Produtos'
  }

  if (loading) {
    return (
      <div className="search-page">
        <div className="search-container">
          <div className="loading">Carregando produtos...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="search-page">
      <div className="search-container">
        <div className="search-header">
          <h1 className="search-title">{getPageTitle()}</h1>
          <button onClick={onBack} className="back-button">
            Voltar
          </button>
        </div>

        <div className="search-results">
          {products.length === 0 ? (
            <div className="no-results">
              <h3>Nenhum produto encontrado</h3>
              <p>Tente ajustar sua busca ou categoria.</p>
            </div>
          ) : (
            <>
              <p className="results-count">{products.length} produto{products.length !== 1 ? 's' : ''} encontrado{products.length !== 1 ? 's' : ''}</p>
              <div className="products-grid">
                {products.map(product => (
                  <div
                    key={product.id}
                    className="product-card"
                    onClick={() => handleProductClick(product)}
                    style={{ cursor: 'pointer' }}
                  >
                    {product.imgUrl && (
                      <div className="product-image">
                        <img src={product.imgUrl} alt={product.name} />
                      </div>
                    )}
                    <div className="product-info">
                      <div className="product-price">
                        R$ {product.price.toFixed(2)}
                      </div>
                      <div className="product-name">
                        {product.name}
                      </div>
                      {product.description && (
                        <div className="product-description">
                          {product.description.length > 100
                            ? product.description.substring(0, 100) + '...'
                            : product.description}
                        </div>
                      )}
                      <div className="product-click-hint">
                        Clique para ver detalhes
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {selectedProduct && (
        <div className="product-details-overlay" onClick={closeProductDetails}>
          <div className="product-details-modal" onClick={e => e.stopPropagation()}>
            <div className="product-details-header">
              <h3>{selectedProduct.name}</h3>
              <button className="close-button" onClick={closeProductDetails}>×</button>
            </div>

            {selectedProduct.imgUrl && (
              <div className="product-details-image">
                <img src={selectedProduct.imgUrl} alt={selectedProduct.name} />
              </div>
            )}

            <div className="product-details-info">
              <div className="product-details-price">
                R$ {selectedProduct.price.toFixed(2)}
              </div>

              {selectedProduct.description && (
                <div className="product-details-description">
                  <h4>Descrição:</h4>
                  <p>{selectedProduct.description}</p>
                </div>
              )}

              <div className="product-details-actions">
                <button
                  className="add-to-cart-button"
                  onClick={() => handleAddToCart(selectedProduct)}
                >
                  🛒 Adicionar ao Carrinho
                </button>
                <button className="wishlist-button">
                  Adicionar à Lista de Desejos
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default SearchPage
