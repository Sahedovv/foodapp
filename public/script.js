class Cart {
  constructor() {
    this.items = JSON.parse(localStorage.getItem('cart')) || [];
    this.render();
  }

  addItem(name, price) {
    this.items.push({ name, price });
    this.saveToStorage();
    this.render();
  }

  removeItem(index) {
    this.items.splice(index, 1);
    this.saveToStorage();
    this.render();
  }

  saveToStorage() {
    localStorage.setItem("cart", JSON.stringify(this.items));
  }

  render() {
    const cartItemsList = document.getElementById('cart_items');
    const totalElement = document.getElementById('total');
    cartItemsList.innerHTML = '';

    let total = 0;

    this.items.forEach((item, index) => {
      const listItem = document.createElement('li');
      listItem.textContent = `${item.name} - ${item.price}$`;
      total += item.price;

      const removeButton = document.createElement('button');
      removeButton.textContent = 'Delete';
      removeButton.classList.add('remove_btn');
      removeButton.onclick = () => this.removeItem(index);

      listItem.appendChild(removeButton);
      cartItemsList.appendChild(listItem);
    });

    totalElement.textContent = total;
  }
}

const cart = new Cart();

// html onlick
function addToCart(name, price) {
  cart.addItem(name, price);
}

function submitOrder(event) {
  event.preventDefault();

  const inputs = event.target.querySelectorAll('input');
  const name = inputs[0].value;
  const phone = inputs[1].value;
  const address = inputs[2].value;

  if (!name || !phone || !address) {
    alert('Fill in all fields, pls!');
    return;
  }

  alert(`Thanks for your order, ${name}!\nWe will delivery ypur order to this adress: ${address}`);

  cart.items = [];
  cart.saveToStorage();
  cart.render();
}


// 
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').then((registration) => {
      console.log('Service Worker зарегистрирован с областью: ', registration.scope);
    }).catch((error) => {
      console.log('Ошибка регистрации Service Worker: ', error);
    });
  });
}
