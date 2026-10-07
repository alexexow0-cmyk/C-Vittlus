const chatbotKnowledge = {
  history: 'C-Vittlus nació de la pasión por la repostería artesanal, combinando recetas tradicionales con ingredientes de calidad. Hoy es una marca que valora la autenticidad, la dedicación y la experiencia de disfrutar una buena galleta en cada rincón del día.',
  greeting: '¡Hola! Puedo ayudarte con productos, stock, novedades y la historia de C-Vittlus. Si quieres, pregúntame por una galleta concreta o por el estado del inventario.'
};

function findProductByQuery(query) {
  const normalized = query.toLowerCase();

  return window.productCatalog.find((product) => {
    const name = product.name.toLowerCase();
    const category = product.category.toLowerCase();
    return name.includes(normalized) || category.includes(normalized) || normalized.includes(name.replace(/[^a-z]/g, ''));
  });
}

function formatProductResponse(product) {
  const stockStatus = window.getStockStatus(product);
  return `${product.name} está ${stockStatus.label.toLowerCase()}. Tiene ${product.stock} unidades disponibles y cuesta ${product.price.toFixed(2)}€. ${product.description}`;
}

function getStockSummary() {
  return window.productCatalog
    .map((product) => `${product.name}: ${window.getStockStatus(product).label}`)
    .join(' • ');
}

function getNewProducts() {
  return window.productCatalog.filter((product) => product.isNew).map((product) => product.name);
}

function getChatbotReply(input) {
  const text = input.trim();
  if (!text) return 'Escribe una pregunta para ayudarte.';

  const lower = text.toLowerCase();

  if (['hola', 'buenas', 'buenos dias', 'buenas tardes', 'buenas noches'].some((phrase) => lower.includes(phrase))) {
    return chatbotKnowledge.greeting;
  }

  if (lower.includes('historia') || lower.includes('quiénes sois') || lower.includes('quienes sois') || lower.includes('marca')) {
    return chatbotKnowledge.history;
  }

  if (lower.includes('stock') || lower.includes('disponible') || lower.includes('agotada') || lower.includes('quedan pocas')) {
    return `El stock actual es: ${getStockSummary()}.`;
  }

  if (lower.includes('novedad') || lower.includes('novedades') || lower.includes('nuevo') || lower.includes('nuevas')) {
    const news = getNewProducts();
    return news.length ? `Novedades actuales: ${news.join(', ')}.` : 'No hay novedades activas en este momento.';
  }

  const productMatch = findProductByQuery(lower);
  if (productMatch) {
    return formatProductResponse(productMatch);
  }

  if (lower.includes('producto') || lower.includes('galletas') || lower.includes('cookies')) {
    return `Nuestra colección incluye: ${window.productCatalog.map((product) => product.name).join(', ')}.`;
  }

  return 'Puedo ayudarte con productos, stock, novedades y la historia de C-Vittlus. Pregúntame por una galleta concreta o por el inventario.';
}

function setupChatbot() {
  const toggle = document.getElementById('chatbotToggle');
  const container = document.getElementById('chatbotContainer');
  const closeButton = document.getElementById('closeChatbot');
  const input = document.getElementById('chatbotInput');
  const sendBtn = document.getElementById('sendMessage');
  const messages = document.getElementById('chatbotMessages');

  if (!toggle || !container || !input || !sendBtn || !messages) {
    return;
  }

  const appendMessage = (text, role) => {
    const wrapper = document.createElement('div');
    wrapper.className = `message ${role}`;
    wrapper.innerHTML = `<p>${text}</p>`;
    messages.appendChild(wrapper);
    messages.scrollTop = messages.scrollHeight;
  };

  const sendMessage = () => {
    const text = input.value.trim();
    if (!text) {
      return;
    }

    appendMessage(text, 'user');
    input.value = '';

    setTimeout(() => {
      appendMessage(getChatbotReply(text), 'bot');
    }, 250);
  };

  toggle.addEventListener('click', () => {
    container.classList.toggle('hidden');
  });

  closeButton.addEventListener('click', () => {
    container.classList.add('hidden');
  });

  sendBtn.addEventListener('click', sendMessage);
  input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      sendMessage();
    }
  });
}

document.addEventListener('DOMContentLoaded', setupChatbot);
