/* =========================================
   CLOTTFITS.PAGE - MAIN JAVASCRIPT
========================================= */


/* =========================================
   DATA PRODUK
========================================= */

const products = [
  {
    id: 1,
    name: "Kemeja Boxy Black",
    price: 175000,
    category: "boxy",
    categoryName: "Kemeja Boxy",
    image: "image/produk-01.jpeg",
    description: "Kemeja bekas pilihan yang dikreasikan menjadi model boxy modern dengan potongan nyaman dan stylish.",
    stock: 5
  },
  {
    id: 2,
    name: "Kemeja Cheongsam Vintage",
    price: 185000,
    category: "cheongsam",
    categoryName: "Kemeja Cheongsam",
    image: "image/produk-02.jpeg",
    description: "Kemeja vintage dengan sentuhan kancing Cheongsam yang unik untuk tampilan berbeda dan penuh karakter.",
    stock: 4
  },
  {
    id: 3,
    name: "Earth Brown Boxy",
    price: 165000,
    category: "boxy",
    categoryName: "Kemeja Boxy",
    image: "image/produk-03.jpeg",
    description: "Kemeja boxy bernuansa earth tone yang cocok untuk gaya kasual, minimalis, dan modern.",
    stock: 6
  },
  {
    id: 4,
    name: "Classic White Cheongsam",
    price: 170000,
    category: "cheongsam",
    categoryName: "Kemeja Cheongsam",
    image: "image/produk-04.jpeg",
    description: "Kemeja putih klasik yang dikreasikan dengan detail kancing Cheongsam untuk tampilan minimalis dan elegan.",
    stock: 3
  },
  {
    id: 5,
    name: "Olive Boxy Premium",
    price: 195000,
    category: "boxy",
    categoryName: "Kemeja Boxy",
    image: "image/produk-05.jpeg",
    description: "Kemeja boxy premium berwarna olive dengan desain eksklusif dan potongan modern.",
    stock: 5
  },
  {
    id: 6,
    name: "Blue Stripe Cheongsam",
    price: 180000,
    category: "cheongsam",
    categoryName: "Kemeja Cheongsam",
    image: "image/produk-06.jpeg",
    description: "Kemeja motif garis biru dengan sentuhan kancing Cheongsam yang memberikan karakter unik.",
    stock: 4
  },
  {
    id: 7,
    name: "Monochrome Boxy",
    price: 175000,
    category: "boxy",
    categoryName: "Kemeja Boxy",
    image: "image/produk-07.jpeg",
    description: "Kemeja boxy bergaya monochrome yang mudah dipadukan untuk berbagai gaya outfit.",
    stock: 5
  },
  {
    id: 8,
    name: "Dark Forest Cheongsam",
    price: 190000,
    category: "cheongsam",
    categoryName: "Kemeja Cheongsam",
    image: "image/produk-08.jpeg",
    description: "Kemeja bernuansa dark forest dengan detail kancing Cheongsam untuk tampilan eksklusif.",
    stock: 2
  },
  {
    id: 9,
    name: "Cream Limited Boxy",
    price: 210000,
    category: "limited",
    categoryName: "Limited Edition",
    image: "image/produk-09.jpeg",
    description: "Koleksi terbatas Clottfits.page dengan desain boxy eksklusif dan jumlah produksi terbatas.",
    stock: 2
  },
  {
    id: 10,
    name: "Navy Cheongsam Limited",
    price: 225000,
    category: "limited",
    categoryName: "Limited Edition",
    image: "image/produk-10.jpeg",
    description: "Koleksi limited edition dengan warna navy dan detail kancing Cheongsam yang unik.",
    stock: 1
  },
  {
    id: 11,
    name: "Sandstone Boxy",
    price: 185000,
    category: "boxy",
    categoryName: "Kemeja Boxy",
    image: "image/produk-11.jpeg",
    description: "Kemeja boxy bernuansa sandstone dengan karakter kasual yang mudah dipadukan.",
    stock: 3
  },
  {
    id: 12,
    name: "Midnight Reworked",
    price: 205000,
    category: "limited",
    categoryName: "Limited Edition",
    image: "image/produk-12.jpeg",
    description: "Koleksi reworked bernuansa gelap dengan detail unik untuk tampilan istimewa.",
    stock: 2
  }
];


/* =========================================
   LOCAL STORAGE CART
========================================= */

let cart = JSON.parse(localStorage.getItem("clottfitsCart")) || [];

// Memperbarui keranjang lama agar tetap memakai nama aset baru.
cart.forEach((item) => {
  if (/^images\/produk\d+\.jpg$/.test(item.image || "")) {
    item.image = `image/produk-${String(item.id).padStart(2, "0")}.jpeg`;
  }
});
localStorage.setItem("clottfitsCart", JSON.stringify(cart));


/* =========================================
   FORMAT RUPIAH
========================================= */

function formatRupiah(number) {
  return number.toLocaleString("id-ID");
}


/* =========================================
   RENDER PRODUK
========================================= */

function renderProducts(productList) {

  const container = document.getElementById("productsContainer");
  const noProduct = document.getElementById("noProduct");

  container.innerHTML = "";

  if (productList.length === 0) {

    noProduct.style.display = "block";

    return;

  }

  noProduct.style.display = "none";


  productList.forEach(product => {

    const card = document.createElement("article");

    card.className = "product-card";


    card.innerHTML = `

      <div class="product-image">

        <img
          src="${product.image}"
          alt="${product.name}"
          loading="lazy"
        >

        <span class="product-category">

          ${product.categoryName}

        </span>

      </div>


      <div class="product-info">

        <h3>

          ${product.name}

        </h3>


        <p class="product-description">

          ${product.description}

        </p>


        <p class="product-price">

          Rp ${formatRupiah(product.price)}

        </p>


        <div class="product-buttons">

          <button
            class="detail-button"
            onclick="openProductDetail(${product.id})"
          >

            Detail

          </button>


          <button
            class="add-to-cart"
            onclick="addToCart(${product.id})"
          >

            + Keranjang

          </button>

        </div>

      </div>

    `;


    container.appendChild(card);

  });

}


/* =========================================
   SEARCH & FILTER
========================================= */

function filterProducts() {

  const searchValue =
    document
      .getElementById("searchInput")
      .value
      .toLowerCase();


  const categoryValue =
    document
      .getElementById("categoryFilter")
      .value;


  const priceValue =
    document
      .getElementById("priceFilter")
      .value;


  const filteredProducts = products.filter(product => {


    /* SEARCH */

    const matchSearch =

      product.name
        .toLowerCase()
        .includes(searchValue)

      ||

      product.description
        .toLowerCase()
        .includes(searchValue);


    /* CATEGORY */

    const matchCategory =

      categoryValue === ""

      ||

      product.category === categoryValue;


    /* PRICE */

    let matchPrice = true;


    if (priceValue === "low") {

      matchPrice =
        product.price < 150000;

    }


    if (priceValue === "middle") {

      matchPrice =

        product.price >= 150000

        &&

        product.price <= 200000;

    }


    if (priceValue === "high") {

      matchPrice =
        product.price > 200000;

    }


    return (

      matchSearch

      &&

      matchCategory

      &&

      matchPrice

    );

  });


  renderProducts(filteredProducts);

}


/* EVENT FILTER */

document
  .getElementById("searchInput")
  .addEventListener(
    "input",
    filterProducts
  );


document
  .getElementById("categoryFilter")
  .addEventListener(
    "change",
    filterProducts
  );


document
  .getElementById("priceFilter")
  .addEventListener(
    "change",
    filterProducts
  );


/* =========================================
   PRODUCT DETAIL MODAL
========================================= */

function openProductDetail(productId) {

  const product =
    products.find(
      item => item.id === productId
    );


  const modal =
    document.getElementById(
      "productModal"
    );


  const modalBody =
    document.getElementById(
      "modalBody"
    );


  modalBody.innerHTML = `

    <div class="modal-product">


      <img
        src="${product.image}"
        alt="${product.name}"
      >


      <div class="modal-product-info">


        <span class="section-label">

          ${product.categoryName}

        </span>


        <h2>

          ${product.name}

        </h2>


        <p>

          ${product.description}

        </p>


        <h3>

          Rp ${formatRupiah(product.price)}

        </h3>


        <br>


        <p>

          <strong>
            Detail Produk:
          </strong>

        </p>


        <p>

          ♻ Upcycle Fashion

          <br>

          ✦ Desain Unik

          <br>

          ✂ Handmade

          <br>

          ◇ Limited Stock

          <br>

          📦 Stok: ${product.stock}

        </p>


        <button
          class="add-to-cart"
          onclick="
            addToCart(${product.id});
            closeProductModal();
          "
        >

          Tambah ke Keranjang

        </button>


      </div>

    </div>

  `;


  modal.classList.add("active");


  document.body.style.overflow =
    "hidden";

}


/* CLOSE MODAL */

function closeProductModal() {

  document
    .getElementById(
      "productModal"
    )
    .classList
    .remove("active");


  document.body.style.overflow =
    "auto";

}


/* CLOSE BUTTON */

document
  .getElementById("closeModal")
  .addEventListener(
    "click",
    closeProductModal
  );


/* CLICK OUTSIDE MODAL */

document
  .getElementById("productModal")
  .addEventListener(
    "click",
    function(event) {

      if (
        event.target === this
      ) {

        closeProductModal();

      }

    }
  );


/* =========================================
   ADD TO CART
========================================= */

function addToCart(productId) {

  const product =
    products.find(
      item => item.id === productId
    );


  const existingItem =
    cart.find(
      item => item.id === productId
    );


  if (existingItem) {

    if (
      existingItem.quantity
      <
      product.stock
    ) {

      existingItem.quantity++;

    }

    else {

      showToast(
        "Jumlah produk sudah mencapai batas stok."
      );

      return;

    }

  }

  else {

    cart.push({

      ...product,

      quantity: 1

    });

  }


  saveCart();


  updateCartCount();


  showToast(

    `${product.name} ditambahkan ke keranjang!`

  );

}


/* =========================================
   SAVE CART
========================================= */

function saveCart() {

  localStorage.setItem(

    "clottfitsCart",

    JSON.stringify(cart)

  );

}


/* =========================================
   UPDATE CART COUNT
========================================= */

function updateCartCount() {

  const totalItems =

    cart.reduce(

      (total, item) =>
        total + item.quantity,

      0

    );


  document
    .getElementById("cartCount")
    .textContent =
    totalItems;

}


/* =========================================
   RENDER CART
========================================= */

function renderCart() {

  const cartItems =
    document.getElementById(
      "cartItems"
    );


  const emptyCart =
    document.getElementById(
      "emptyCart"
    );


  const cartFooter =
    document.getElementById(
      "cartFooter"
    );


  cartItems.innerHTML = "";


  /* CART EMPTY */

  if (cart.length === 0) {

    emptyCart.style.display =
      "block";


    cartFooter.style.display =
      "none";


    return;

  }


  emptyCart.style.display =
    "none";


  cartFooter.style.display =
    "block";


  let total = 0;


  cart.forEach(item => {


    const subtotal =

      item.price
      *
      item.quantity;


    total += subtotal;


    const cartItem =
      document.createElement(
        "div"
      );


    cartItem.className =
      "cart-item";


    cartItem.innerHTML = `


      <img
        src="${item.image}"
        alt="${item.name}"
      >


      <div>


        <h4>

          ${item.name}

        </h4>


        <p>

          Rp ${formatRupiah(item.price)}

        </p>


        <div class="cart-actions">


          <button
            onclick="decreaseQuantity(${item.id})"
          >

            −

          </button>


          <span>

            ${item.quantity}

          </span>


          <button
            onclick="increaseQuantity(${item.id})"
          >

            +

          </button>


          <button
            class="remove-item"
            onclick="removeFromCart(${item.id})"
          >

            Hapus

          </button>


        </div>


      </div>


    `;


    cartItems.appendChild(
      cartItem
    );

  });


  document
    .getElementById(
      "cartTotal"
    )
    .textContent =

    formatRupiah(total);

}


/* =========================================
   INCREASE QUANTITY
========================================= */

function increaseQuantity(productId) {

  const item =
    cart.find(
      item => item.id === productId
    );


  const product =
    products.find(
      product => product.id === productId
    );


  if (
    item.quantity
    <
    product.stock
  ) {

    item.quantity++;

  }

  else {

    showToast(
      "Jumlah produk sudah mencapai batas stok."
    );

    return;

  }


  saveCart();

  renderCart();

  updateCartCount();

}


/* =========================================
   DECREASE QUANTITY
========================================= */

function decreaseQuantity(productId) {

  const item =
    cart.find(
      item => item.id === productId
    );


  if (
    item.quantity > 1
  ) {

    item.quantity--;

  }

  else {

    removeFromCart(productId);

    return;

  }


  saveCart();

  renderCart();

  updateCartCount();

}


/* =========================================
   REMOVE FROM CART
========================================= */

function removeFromCart(productId) {

  cart = cart.filter(

    item =>
      item.id !== productId

  );


  saveCart();

  renderCart();

  updateCartCount();


  showToast(
    "Produk dihapus dari keranjang."
  );

}


/* =========================================
   OPEN CART
========================================= */

function openCart() {

  document
    .getElementById(
      "cartSidebar"
    )
    .classList
    .add("open");


  document
    .getElementById(
      "cartOverlay"
    )
    .classList
    .add("active");


  document.body.style.overflow =
    "hidden";


  renderCart();

}


/* =========================================
   CLOSE CART
========================================= */

function closeCart() {

  document
    .getElementById(
      "cartSidebar"
    )
    .classList
    .remove("open");


  document
    .getElementById(
      "cartOverlay"
    )
    .classList
    .remove("active");


  document.body.style.overflow =
    "auto";

}


/* CART BUTTON */

document
  .getElementById("cartBtn")
  .addEventListener(
    "click",
    openCart
  );


/* CLOSE CART BUTTON */

document
  .getElementById("closeCart")
  .addEventListener(
    "click",
    closeCart
  );


/* CART OVERLAY */

document
  .getElementById("cartOverlay")
  .addEventListener(
    "click",
    closeCart
  );


/* CONTINUE SHOPPING */

document
  .getElementById(
    "continueShopping"
  )
  .addEventListener(
    "click",
    closeCart
  );


/* =========================================
   TOAST NOTIFICATION
========================================= */

let toastTimer;


function showToast(message) {

  const toast =
    document.getElementById(
      "toast"
    );


  const toastMessage =
    document.getElementById(
      "toastMessage"
    );


  toastMessage.textContent =
    message;


  toast.classList.add(
    "show"
  );


  clearTimeout(
    toastTimer
  );


  toastTimer =
    setTimeout(
      () => {

        toast
          .classList
          .remove("show");

      },

      3000

    );

}


/* =========================================
   MOBILE MENU
========================================= */

const menuToggle =
  document.getElementById(
    "menuToggle"
  );


const navMenu =
  document.getElementById(
    "navMenu"
  );


menuToggle.addEventListener(

  "click",

  function() {

    navMenu.classList.toggle(
      "active"
    );

  }

);


/* =========================================
   CLOSE MOBILE MENU AFTER CLICK
========================================= */

document
  .querySelectorAll(
    ".nav-menu a"
  )
  .forEach(link => {


    link.addEventListener(

      "click",

      function() {

        navMenu.classList.remove(
          "active"
        );

      }

    );


  });


/* =========================================
   ESC KEY
========================================= */

document.addEventListener(

  "keydown",

  function(event) {


    if (
      event.key === "Escape"
    ) {

      closeCart();

      closeProductModal();

    }


  }

);


/* =========================================
   INITIALIZATION
========================================= */

document.addEventListener(

  "DOMContentLoaded",

  function() {


    renderProducts(
      products
    );


    updateCartCount();


  }

);
