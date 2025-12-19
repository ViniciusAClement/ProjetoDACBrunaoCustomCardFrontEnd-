import React, { useState, useEffect } from 'react'
import { api } from '../api/mockApi'
import './StockPage.css'

function StockPage({ onBack }) {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    imgUrl: ''
  })

  // Carregar produtos
  const loadProducts = async () => {
    try {
      setLoading(true)
      const data = await api.getProducts()
      setProducts(data)
    } catch (err) {
      setError('Erro ao carregar produtos')
      console.error('Load products error:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadProducts()
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      price: '',
      imgUrl: ''
    })
    setEditingProduct(null)
    setShowAddForm(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.name || !formData.price) {
      setError('Nome e preço são obrigatórios')
      return
    }

    try {
      const productData = {
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        imgUrl: formData.imgUrl
      }

      if (editingProduct) {
        await api.updateProduct(editingProduct.id, productData)
      } else {
        await api.createProduct(productData)
      }

      resetForm()
      loadProducts()
    } catch (err) {
      setError('Erro ao salvar produto')
      console.error('Save product error:', err)
    }
  }

  const handleEdit = (product) => {
    setEditingProduct(product)
    setFormData({
      name: product.name,
      description: product.description || '',
      price: product.price.toString(),
      imgUrl: product.imgUrl || ''
    })
    setShowAddForm(true)
  }

  const handleDelete = async (productId) => {
    if (!window.confirm('Tem certeza que deseja excluir este produto?')) {
      return
    }

    try {
      await api.deleteProduct(productId)
      loadProducts()
    } catch (err) {
      setError('Erro ao excluir produto')
      console.error('Delete product error:', err)
    }
  }

  if (loading) {
    return (
      <div className="stock-page">
        <div className="stock-container">
          <h1>Carregando...</h1>
        </div>
      </div>
    )
  }

  return (
    <div className="stock-page">
      <div className="stock-container">
        <div className="stock-header">
          <h1>Gerenciamento de Estoque</h1>
          <div className="stock-actions">
            <button onClick={() => setShowAddForm(true)} className="add-button">
              Adicionar Produto
            </button>
            <button onClick={onBack} className="back-button">
              Voltar
            </button>
          </div>
        </div>

        {error && <div className="stock-error">{error}</div>}

        {showAddForm && (
          <div className="product-form-overlay">
            <div className="product-form">
              <h2>{editingProduct ? 'Editar Produto' : 'Adicionar Produto'}</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Nome *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="description">Descrição</label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows="3"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="price">Preço *</label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    step="0.01"
                    value={formData.price}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="imgUrl">URL da Imagem</label>
                  <input
                    type="url"
                    id="imgUrl"
                    name="imgUrl"
                    value={formData.imgUrl}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-actions">
                  <button type="submit" className="save-button">
                    {editingProduct ? 'Atualizar' : 'Salvar'}
                  </button>
                  <button type="button" onClick={resetForm} className="cancel-button">
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <div className="products-grid">
          {products.length === 0 ? (
            <div className="no-products">
              <p>Nenhum produto cadastrado ainda.</p>
            </div>
          ) : (
            products.map(product => (
              <div key={product.id} className="product-card">
                {product.imgUrl && (
                  <div className="product-image">
                    <img src={product.imgUrl} alt={product.name} />
                  </div>
                )}
                <div className="product-info">
                  <h3>{product.name}</h3>
                  {product.description && <p>{product.description}</p>}
                  <div className="product-price">
                    R$ {product.price.toFixed(2)}
                  </div>
                </div>
                <div className="product-actions">
                  <button onClick={() => handleEdit(product)} className="edit-button">
                    Editar
                  </button>
                  <button onClick={() => handleDelete(product.id)} className="delete-button">
                    Excluir
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default StockPage
