const productCatalog = [
  {
    id: 1,
    name: 'Cookies Clásicas',
    category: 'Clásicas',
    price: 7.9,
    stock: 18,
    isNew: false,
    description: 'Galletas suaves con mantequilla, vainilla y un toque crujiente en los bordes.',
    image: 'https://images.unsplash.com/photo-1499636136210-6d4eea2d469a?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 2,
    name: 'Chocolate Intenso',
    category: 'Premium',
    price: 8.5,
    stock: 4,
    isNew: false,
    description: 'Chocolate negro de alta calidad y un centro ligeramente fundido para un sabor intenso.',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 3,
    name: 'Brownie Mini',
    category: 'Especial',
    price: 6.5,
    stock: 0,
    isNew: false,
    description: 'Porciones pequeñas de brownie con textura húmeda y un equilibrio perfecto entre dulce y cacao.',
    image: 'https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 4,
    name: 'Naranja & Canela',
    category: 'Temporada',
    price: 7.4,
    stock: 11,
    isNew: true,
    description: 'Notas cítricas con canela y un aroma cálido ideal para tardes de invierno.',
    image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 5,
    name: 'Almendra y Miel',
    category: 'Tradicional',
    price: 8.2,
    stock: 2,
    isNew: false,
    description: 'Un perfil más aromático y mantecoso, con almendra tostada y un ligero toque de miel.',
    image: 'https://images.unsplash.com/photo-1542826438-bd32f43d626f?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 6,
    name: 'Cookies de Navidad',
    category: 'Navidad',
    price: 9.1,
    stock: 9,
    isNew: true,
    description: 'Galletas festivas con especias suaves y un acabado visual perfecto para celebraciones.',
    image: 'https://images.unsplash.com/photo-1517433670267-08bbd4be890f?auto=format&fit=crop&w=900&q=80'
  }
];

function getStockStatus(product) {
  if (product.stock <= 0) {
    return {
      label: 'Agotada',
      tone: 'sold-out',
      statusText: 'Sin stock disponible'
    };
  }

  if (product.stock <= 5) {
    return {
      label: 'Quedan pocas',
      tone: 'low',
      statusText: `${product.stock} unidades disponibles`
    };
  }

  if (product.isNew) {
    return {
      label: 'Disponible · recién añadida',
      tone: 'new',
      statusText: `${product.stock} unidades disponibles`
    };
  }

  return {
    label: 'Disponible',
    tone: 'available',
    statusText: `${product.stock} unidades disponibles`
  };
}

function formatPrice(value) {
  return `${value.toFixed(2)}€`;
}

function renderProducts() {
  const grid = document.getElementById('productsGrid');

  if (!grid) {
    return;
  }

  grid.innerHTML = productCatalog
    .map((product) => {
      const stockData = getStockStatus(product);

      return `
        <article class="product-card" aria-label="${product.name}">
          <div class="product-image" style="background-image:url('${product.image}')"></div>
          <div class="product-body">
            <div class="product-header">
              <div>
                <h3 class="product-name">${product.name}</h3>
                <span class="product-category">${product.category}</span>
              </div>
              <span class="product-price">${formatPrice(product.price)}</span>
            </div>

            <p class="product-description">${product.description}</p>

            <div class="product-footer">
              <span class="stock-badge ${stockData.tone}">${stockData.label}</span>
              <div class="stock-meta">
                <span>${stockData.statusText}</span>
                <span>${product.isNew ? 'Nuevo' : 'Clásico'}</span>
              </div>
            </div>
          </div>
        </article>
      `;
    })
    .join('');
}

window.productCatalog = productCatalog;
window.getStockStatus = getStockStatus;

document.addEventListener('DOMContentLoaded', renderProducts);
