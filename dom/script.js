document.addEventListener("DOMContentLoaded", function () {
  const items = document.querySelectorAll(".item");
  const cartItems = document.getElementById("cart-items");
  const totalElement = document.getElementById("total");
  const clearCartButton = document.getElementById("clear-cart");

  let total = 0;

  items.forEach((item) => {
    const btnAdd = item.querySelector(".btn-add");
    const btnRemove = item.querySelector(".btn-remove");
    const quantityElement = item.querySelector(".quantity");
    const likeButton = item.querySelector(".btn-like");
    const itemName = item.dataset.name;
    const itemPrice = parseFloat(item.dataset.price);

    btnAdd.addEventListener("click", function () {
      let quantity = parseInt(quantityElement.textContent);
      quantity++;
      quantityElement.textContent = quantity;
      updateTotal();
      addToCart(itemName, itemPrice, quantity);
    });

    btnRemove.addEventListener("click", function () {
      let quantity = parseInt(quantityElement.textContent);
      if (quantity > 0) {
        quantity--;
        quantityElement.textContent = quantity;
        updateTotal();
        removeFromCart(itemName, itemPrice, quantity);
      }
    });

    likeButton.addEventListener("click", function () {
      likeButton.classList.toggle("active");
    });
  });

  function updateTotal() {
    let newTotal = 0;
    items.forEach((item) => {
      const quantity = parseInt(item.querySelector(".quantity").textContent);
      const price = parseFloat(item.dataset.price);
      newTotal += quantity * price;
    });
    total = newTotal;
    totalElement.textContent = `Total: $${total.toFixed(2)}`;
  }

  function addToCart(itemName, itemPrice, quantity) {
    const cartItem = document.createElement("div");
    cartItem.textContent = `${itemName} x${quantity} - $${(
      itemPrice * quantity
    ).toFixed(2)}`;
    cartItems.appendChild(cartItem);
  }

  function removeFromCart(itemName, itemPrice, quantity) {
    const cartItem = Array.from(cartItems.children).find((item) =>
      item.textContent.includes(itemName)
    );
    if (quantity === 0) {
      cartItems.removeChild(cartItem);
    } else {
      cartItem.textContent = `${itemName} x${quantity} - $${(
        itemPrice * quantity
      ).toFixed(2)}`;
    }
  }

  clearCartButton.addEventListener("click", function () {
    cartItems.innerHTML = "";
    total = 0;
    totalElement.textContent = `Total: $${total.toFixed(2)}`;
  });
});
