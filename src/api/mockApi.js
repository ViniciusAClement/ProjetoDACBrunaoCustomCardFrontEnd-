// Mock API para simular as funcionalidades do backend
// Isso permite testar o frontend mesmo sem o backend rodando

// Ícone minimalista com "</>" em laranja sobre fundo preto
const codeIconSvg = `data:image/svg+xml;base64,${btoa(`
<svg width="400" height="300" viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
  <rect width="400" height="300" fill="#000000"/>
  <text x="200" y="180" text-anchor="middle" fill="#FF6B35" font-family="monospace" font-size="80" font-weight="bold">&lt;/&gt;</text>
</svg>
`)}`;

let mockClients = [
  {
    id: 1,
    name: "João Silva",
    email: "joao@email.com",
    password: "123456",
    phone: "11999999999",
    cpf: "12345678901"
  },
  {
    id: 2,
    name: "Maria Santos",
    email: "maria@email.com",
    password: "123456",
    phone: "11888888888",
    cpf: "98765432109"
  }
];

let mockProducts = [
  {
    id: 1,
    name: "Kit Custom Carro Honda Civic",
    description: "Kit completo para customização do Honda Civic com adesivos e acessórios",
    price: 299.99,
    imgUrl: codeIconSvg,
    category: "acessorios",
    subcategory: "custom"
  },
  {
    id: 2,
    name: "Pneu Custom Mitsubishi Eclipse",
    description: "Pneu personalizado para Mitsubishi Eclipse com design exclusivo",
    price: 499.99,
    imgUrl: codeIconSvg,
    category: "acessorios",
    subcategory: "pneus"
  },
  {
    id: 3,
    name: "Filtro de Ar K&N",
    description: "Filtro de ar esportivo K&N para melhor admissão",
    price: 189.99,
    imgUrl: codeIconSvg,
    category: "pecas",
    subcategory: "admissao"
  },
  {
    id: 4,
    name: "Vela de Ignição NGK",
    description: "Vela de ignição NGK de alta performance para motor",
    price: 45.99,
    imgUrl: codeIconSvg,
    category: "pecas",
    subcategory: "motor"
  },
  {
    id: 5,
    name: "Sistema de Escape Esportivo",
    description: "Sistema de escape completo para melhor performance",
    price: 899.99,
    imgUrl: codeIconSvg,
    category: "pecas",
    subcategory: "escape"
  },
  {
    id: 6,
    name: "Embreagem Sachs",
    description: "Embreagem esportiva Sachs para transmissão",
    price: 399.99,
    imgUrl: codeIconSvg,
    category: "pecas",
    subcategory: "transmissao"
  },
  {
    id: 7,
    name: "Amortecedor KYB",
    description: "Amortecedor KYB para suspensão esportiva",
    price: 299.99,
    imgUrl: codeIconSvg,
    category: "pecas",
    subcategory: "suspensao"
  },
  {
    id: 8,
    name: "Aerofólio Carbono",
    description: "Aerofólio de fibra de carbono para melhor aerodinâmica",
    price: 799.99,
    imgUrl: codeIconSvg,
    category: "produtos",
    subcategory: "aerofolios"
  },
  {
    id: 9,
    name: "Shampoo Automotivo",
    description: "Shampoo premium para limpeza completa do veículo",
    price: 29.99,
    imgUrl: codeIconSvg,
    category: "produtos",
    subcategory: "limpeza"
  },
  {
    id: 10,
    name: "Suporte de Telefone",
    description: "Suporte universal para celular no painel",
    price: 19.99,
    imgUrl: codeIconSvg,
    category: "produtos",
    subcategory: "acessorios"
  },
  {
    id: 11,
    name: "Kit Turbo Garrett",
    description: "Kit completo de turbo Garrett para aumento de potência",
    price: 2499.99,
    imgUrl: codeIconSvg,
    category: "pecas",
    subcategory: "motor"
  },
  {
    id: 12,
    name: "Pastilhas de Freio Brembo",
    description: "Pastilhas esportivas Brembo de alta performance",
    price: 299.99,
    imgUrl: codeIconSvg,
    category: "pecas",
    subcategory: "suspensao"
  },
  {
    id: 13,
    name: "Intercooler Performance",
    description: "Intercooler de alto fluxo para motores turbo",
    price: 699.99,
    imgUrl: codeIconSvg,
    category: "pecas",
    subcategory: "admissao"
  },
  {
    id: 14,
    name: "Cera Automotiva Premium",
    description: "Cera de carnaúba premium para proteção da pintura",
    price: 49.99,
    imgUrl: codeIconSvg,
    category: "produtos",
    subcategory: "limpeza"
  },
  {
    id: 15,
    name: "Kit Suspensão Ajustável",
    description: "Kit completo de suspensão ajustável para melhor controle",
    price: 1899.99,
    imgUrl: codeIconSvg,
    category: "pecas",
    subcategory: "suspensao"
  }
];

let nextClientId = 3;
let nextProductId = 16;

// Simular delay de rede
const delay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms));

// API de Clientes
export const mockApi = {
  // Clientes
  getClients: async () => {
    await delay();
    return [...mockClients];
  },

  createClient: async (clientData) => {
    await delay();
    // Verificar se email ou CPF já existe
    const existingClient = mockClients.find(client =>
      client.email === clientData.email || client.cpf === clientData.cpf
    );

    if (existingClient) {
      throw new Error('Email ou CPF já cadastrado');
    }

    const newClient = {
      id: nextClientId++,
      ...clientData
    };

    mockClients.push(newClient);
    return newClient;
  },

  // Produtos
  getProducts: async () => {
    await delay();
    return [...mockProducts];
  },

  createProduct: async (productData) => {
    await delay();
    const newProduct = {
      id: nextProductId++,
      ...productData
    };

    mockProducts.push(newProduct);
    return newProduct;
  },

  updateProduct: async (id, productData) => {
    await delay();
    const index = mockProducts.findIndex(product => product.id === id);
    if (index === -1) {
      throw new Error('Produto não encontrado');
    }

    mockProducts[index] = { ...mockProducts[index], ...productData };
    return mockProducts[index];
  },

  deleteProduct: async (id) => {
    await delay();
    const index = mockProducts.findIndex(product => product.id === id);
    if (index === -1) {
      throw new Error('Produto não encontrado');
    }

    mockProducts.splice(index, 1);
  }
};

// Wrapper para usar mock ou API real baseado na configuração
const USE_MOCK_API = true; // Mude para false quando o backend estiver funcionando

export const api = {
  // Clientes
  getClients: async () => {
    if (USE_MOCK_API) {
      return mockApi.getClients();
    }
    const response = await fetch('http://localhost:8080/clients');
    if (!response.ok) throw new Error('Erro ao buscar clientes');
    return response.json();
  },

  createClient: async (clientData) => {
    if (USE_MOCK_API) {
      return mockApi.createClient(clientData);
    }
    const response = await fetch('http://localhost:8080/clients', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(clientData)
    });
    if (!response.ok) {
      if (response.status === 409) throw new Error('Email ou CPF já cadastrado');
      throw new Error('Erro ao criar cliente');
    }
    return response.json();
  },

  // Produtos
  getProducts: async () => {
    if (USE_MOCK_API) {
      return mockApi.getProducts();
    }
    const response = await fetch('http://localhost:8080/products');
    if (!response.ok) throw new Error('Erro ao buscar produtos');
    return response.json();
  },

  createProduct: async (productData) => {
    if (USE_MOCK_API) {
      return mockApi.createProduct(productData);
    }
    const response = await fetch('http://localhost:8080/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(productData)
    });
    if (!response.ok) throw new Error('Erro ao criar produto');
    return response.json();
  },

  updateProduct: async (id, productData) => {
    if (USE_MOCK_API) {
      return mockApi.updateProduct(id, productData);
    }
    const response = await fetch(`http://localhost:8080/products/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(productData)
    });
    if (!response.ok) throw new Error('Erro ao atualizar produto');
    return response.json();
  },

  deleteProduct: async (id) => {
    if (USE_MOCK_API) {
      return mockApi.deleteProduct(id);
    }
    const response = await fetch(`http://localhost:8080/products/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) throw new Error('Erro ao excluir produto');
  }
};
