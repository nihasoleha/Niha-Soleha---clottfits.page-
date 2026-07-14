/* =========================================
   CLOTTFITS.PAGE - ADMIN JAVASCRIPT
========================================= */


/* =========================================
   DEFAULT PRODUCTS
========================================= */

const defaultProducts = [
  {
    id: 1,
    name: "Kemeja Boxy Black",
    price: 175000,
    category: "boxy",
    categoryName: "Kemeja Boxy",
    image: "image/produk-01.jpeg",
    description: "Kemeja bekas pilihan yang dikreasikan menjadi model boxy modern.",
    stock: 5
  },
  {
    id: 2,
    name: "Kemeja Cheongsam Vintage",
    price: 185000,
    category: "cheongsam",
    categoryName: "Kemeja Cheongsam",
    image: "image/produk-02.jpeg",
    description: "Kemeja vintage dengan sentuhan kancing Cheongsam yang unik.",
    stock: 4
  },
  {
    id: 3,
    name: "Earth Brown Boxy",
    price: 165000,
    category: "boxy",
    categoryName: "Kemeja Boxy",
    image: "image/produk-03.jpeg",
    description: "Kemeja boxy bernuansa earth tone dengan gaya modern.",
    stock: 6
  },
  {
    id: 4,
    name: "Classic White Cheongsam",
    price: 170000,
    category: "cheongsam",
    categoryName: "Kemeja Cheongsam",
    image: "image/produk-04.jpeg",
    description: "Kemeja putih klasik dengan detail kancing Cheongsam.",
    stock: 3
  },
  {
    id: 5,
    name: "Olive Boxy Premium",
    price: 195000,
    category: "boxy",
    categoryName: "Kemeja Boxy",
    image: "image/produk-05.jpeg",
    description: "Kemeja boxy premium dengan warna olive.",
    stock: 5
  },
  {
    id: 6,
    name: "Blue Stripe Cheongsam",
    price: 180000,
    category: "cheongsam",
    categoryName: "Kemeja Cheongsam",
    image: "image/produk-06.jpeg",
    description: "Kemeja motif garis dengan sentuhan kancing Cheongsam.",
    stock: 4
  },
  {
    id: 7,
    name: "Monochrome Boxy",
    price: 175000,
    category: "boxy",
    categoryName: "Kemeja Boxy",
    image: "image/produk-07.jpeg",
    description: "Kemeja boxy bergaya monochrome yang modern.",
    stock: 5
  },
  {
    id: 8,
    name: "Dark Forest Cheongsam",
    price: 190000,
    category: "cheongsam",
    categoryName: "Kemeja Cheongsam",
    image: "image/produk-08.jpeg",
    description: "Kemeja dengan nuansa dark forest dan detail unik.",
    stock: 2
  },
  {
    id: 9,
    name: "Cream Limited Boxy",
    price: 210000,
    category: "limited",
    categoryName: "Limited Edition",
    image: "image/produk-09.jpeg",
    description: "Koleksi terbatas dengan desain boxy eksklusif.",
    stock: 2
  },
  {
    id: 10,
    name: "Navy Cheongsam Limited",
    price: 225000,
    category: "limited",
    categoryName: "Limited Edition",
    image: "image/produk-10.jpeg",
    description: "Koleksi limited edition dengan detail Cheongsam.",
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
   GET DATA FROM LOCAL STORAGE
========================================= */

let products =
  JSON.parse(
    localStorage.getItem("clottfitsProducts")
  ) || defaultProducts;

// Memperbarui data katalog lama ke lokasi gambar yang baru.
products.forEach((product) => {
  if (/^images\/produk\d+\.jpg$/.test(product.image || "")) {
    product.image = `image/produk-${String(product.id).padStart(2, "0")}.jpeg`;
  }
});
localStorage.setItem("clottfitsProducts", JSON.stringify(products));

/* Lengkapi sekali katalog lama yang dibuat sebelum produk 11-12 ditambahkan. */
if (localStorage.getItem("clottfitsCatalogVersion") !== "2") {
  const savedIds = new Set(products.map((product) => Number(product.id)));
  const restoredProducts = defaultProducts.filter(
    (product) => !savedIds.has(Number(product.id))
  );

  products = [...products, ...restoredProducts];
  localStorage.setItem("clottfitsProducts", JSON.stringify(products));
  localStorage.setItem("clottfitsCatalogVersion", "2");
}


let orders =
  JSON.parse(
    localStorage.getItem("clottfitsOrders")
  ) || [];


/* SAVE DEFAULT PRODUCTS */

if (
  !localStorage.getItem(
    "clottfitsProducts"
  )
) {

  localStorage.setItem(
    "clottfitsProducts",
    JSON.stringify(products)
  );

}


/* =========================================
   FORMAT RUPIAH
========================================= */

function formatRupiah(number) {

  return Number(number)
    .toLocaleString("id-ID");

}


/* =========================================
   SAVE PRODUCTS
========================================= */

function saveProducts() {

  localStorage.setItem(

    "clottfitsProducts",

    JSON.stringify(products)

  );

}


/* =========================================
   SAVE ORDERS
========================================= */

function saveOrders() {

  localStorage.setItem(

    "clottfitsOrders",

    JSON.stringify(orders)

  );

}


/* =========================================
   SIDEBAR NAVIGATION
========================================= */

const menuItems =
  document.querySelectorAll(
    ".menu-item"
  );


const sections =
  document.querySelectorAll(
    ".admin-section"
  );


menuItems.forEach(item => {

  item.addEventListener(
    "click",
    function() {

      openSection(
        this.dataset.section
      );

    }
  );

});


function openSection(sectionId) {

  sections.forEach(section => {

    section.classList.remove(
      "active"
    );

  });


  menuItems.forEach(item => {

    item.classList.remove(
      "active"
    );

  });


  document
    .getElementById(sectionId)
    .classList.add("active");


  const activeMenu =
    document.querySelector(
      `[data-section="${sectionId}"]`
    );


  if (activeMenu) {

    activeMenu.classList.add(
      "active"
    );

  }


  const titles = {

    dashboard:
      "Dashboard",

    products:
      "Manajemen Produk",

    orders:
      "Pesanan",

    customers:
      "Pelanggan"

  };


  document
    .getElementById(
      "pageTitle"
    )
    .textContent =

    titles[sectionId];


  document
    .getElementById(
      "sidebar"
    )
    .classList
    .remove("open");


  if (
    sectionId === "dashboard"
  ) {

    renderDashboard();

  }


  if (
    sectionId === "products"
  ) {

    renderProducts();

  }


  if (
    sectionId === "orders"
  ) {

    renderOrders();

  }


  if (
    sectionId === "customers"
  ) {

    renderCustomers();

  }

}


/* =========================================
   MOBILE SIDEBAR
========================================= */

document
  .getElementById(
    "mobileMenuBtn"
  )
  .addEventListener(
    "click",
    function() {

      document
        .getElementById(
          "sidebar"
        )
        .classList
        .toggle("open");

    }
  );


/* =========================================
   DASHBOARD STATISTICS
========================================= */

function renderDashboard() {

  orders =
    JSON.parse(
      localStorage.getItem(
        "clottfitsOrders"
      )
    ) || [];


  document
    .getElementById(
      "totalProducts"
    )
    .textContent =

    products.length;


  document
    .getElementById(
      "totalOrders"
    )
    .textContent =

    orders.length;


  /* UNIQUE CUSTOMERS */

  const uniqueCustomers =
    new Set(

      orders.map(

        order =>
          order.customer.email

      )

    );


  document
    .getElementById(
      "totalCustomers"
    )
    .textContent =

    uniqueCustomers.size;


  /* TOTAL REVENUE */

  const totalRevenue =

    orders.reduce(

      (total, order) =>

        total + Number(order.total),

      0

    );


  document
    .getElementById(
      "totalRevenue"
    )
    .textContent =

    "Rp " +
    formatRupiah(
      totalRevenue
    );


  renderRecentOrders();

}


/* =========================================
   RECENT ORDERS
========================================= */

function renderRecentOrders() {

  const table =
    document.getElementById(
      "recentOrdersTable"
    );


  table.innerHTML = "";


  if (
    orders.length === 0
  ) {

    table.innerHTML = `

      <tr>

        <td
          colspan="5"
          class="empty-data"
        >

          Belum ada pesanan.

        </td>

      </tr>

    `;

    return;

  }


  const recentOrders =

    [...orders]
      .reverse()
      .slice(0, 5);


  recentOrders.forEach(order => {

    const row =
      document.createElement(
        "tr"
      );


    row.innerHTML = `

      <td>
        <strong>
          ${order.id}
        </strong>
      </td>


      <td>

        ${order.customer.name}

      </td>


      <td>

        Rp ${formatRupiah(
          order.total
        )}

      </td>


      <td>

        ${order.payment}

      </td>


      <td>

        ${createStatusBadge(
          order.status
        )}

      </td>

    `;


    table.appendChild(row);

  });

}


/* =========================================
   STATUS BADGE
========================================= */

function createStatusBadge(status) {

  const statusClass =

    status
      .toLowerCase()
      .replaceAll(
        " ",
        "-"
      );


  return `

    <span
      class="
        status
        status-${statusClass}
      "
    >

      ${status}

    </span>

  `;

}


/* =========================================
   RENDER PRODUCTS
========================================= */

function renderProducts() {

  products =
    JSON.parse(
      localStorage.getItem(
        "clottfitsProducts"
      )
    ) || defaultProducts;


  const table =
    document.getElementById(
      "productTable"
    );


  table.innerHTML = "";


  products.forEach(product => {

    const row =
      document.createElement(
        "tr"
      );


    row.innerHTML = `

      <td>

        <div
          class="product-table-info"
        >

          <img
            src="${product.image}"
            alt="${product.name}"
          >


          <div>

            <strong>

              ${product.name}

            </strong>


            <span>

              ID: ${product.id}

            </span>

          </div>

        </div>

      </td>


      <td>

        ${product.categoryName}

      </td>


      <td>

        Rp ${formatRupiah(
          product.price
        )}

      </td>


      <td>

        ${product.stock}

      </td>


      <td>

        <button
          class="edit-button"
          onclick="
            editProduct(${product.id})
          "
        >

          Edit

        </button>


        <button
          class="delete-button"
          onclick="
            deleteProduct(${product.id})
          "
        >

          Hapus

        </button>

      </td>

    `;


    table.appendChild(row);

  });

}


/* =========================================
   PRODUCT MODAL
========================================= */

const productModal =
  document.getElementById(
    "productModal"
  );


const productForm =
  document.getElementById(
    "productForm"
  );


document
  .getElementById(
    "addProductBtn"
  )
  .addEventListener(
    "click",
    function() {

      productForm.reset();


      document
        .getElementById(
          "productId"
        )
        .value = "";


      document
        .getElementById(
          "modalTitle"
        )
        .textContent =

        "Tambah Produk";


      productModal
        .classList
        .add("active");

    }
  );


document
  .getElementById(
    "closeProductModal"
  )
  .addEventListener(
    "click",
    closeProductModal
  );


function closeProductModal() {

  productModal
    .classList
    .remove("active");

}


/* =========================================
   SAVE PRODUCT
========================================= */

productForm.addEventListener(

  "submit",

  function(event) {

    event.preventDefault();


    const idValue =
      document
        .getElementById(
          "productId"
        )
        .value;


    const category =
      document
        .getElementById(
          "productCategory"
        )
        .value;


    const categoryNames = {

      boxy:
        "Kemeja Boxy",

      cheongsam:
        "Kemeja Cheongsam",

      limited:
        "Limited Edition"

    };


    const productData = {

      id:
        idValue

          ? Number(idValue)

          : Date.now(),


      name:
        document
          .getElementById(
            "productName"
          )
          .value,


      price:
        Number(
          document
            .getElementById(
              "productPrice"
            )
            .value
        ),


      stock:
        Number(
          document
            .getElementById(
              "productStock"
            )
            .value
        ),


      category:
        category,


      categoryName:
        categoryNames[
          category
        ],


      image:
        document
          .getElementById(
            "productImage"
          )
          .value,


      description:
        document
          .getElementById(
            "productDescription"
          )
          .value

    };


    if (idValue) {

      const index =

        products.findIndex(

          product =>
            product.id ===
            Number(idValue)

        );


      if (index === -1) {
        products.push(productData);
      } else {
        products[index] = productData;
      }


      showToast(
        "Produk berhasil diperbarui."
      );

    }

    else {

      products.push(
        productData
      );


      showToast(
        "Produk berhasil ditambahkan."
      );

    }


    saveProducts();

    renderProducts();

    renderDashboard();

    closeProductModal();

  }

);


/* =========================================
   EDIT PRODUCT
========================================= */

function editProduct(productId) {

  const product =

    products.find(

      product =>
        product.id === productId

    );


  if (!product) {
    showToast(
      "Produk tidak ditemukan. Silakan muat ulang halaman."
    );

    return;
  }


  document
    .getElementById(
      "productId"
    )
    .value =

    product.id;


  document
    .getElementById(
      "productName"
    )
    .value =

    product.name;


  document
    .getElementById(
      "productPrice"
    )
    .value =

    product.price;


  document
    .getElementById(
      "productStock"
    )
    .value =

    product.stock;


  document
    .getElementById(
      "productCategory"
    )
    .value =

    product.category;


  document
    .getElementById(
      "productImage"
    )
    .value =

    product.image;


  document
    .getElementById(
      "productDescription"
    )
    .value =

    product.description;


  document
    .getElementById(
      "modalTitle"
    )
    .textContent =

    "Edit Produk";


  productModal
    .classList
    .add("active");

}


/* =========================================
   DELETE PRODUCT
========================================= */

function deleteProduct(productId) {

  const confirmDelete =

    confirm(
      "Apakah Anda yakin ingin menghapus produk ini?"
    );


  if (!confirmDelete) {

    return;

  }


  products =

    products.filter(

      product =>
        product.id !== productId

    );


  saveProducts();

  renderProducts();

  renderDashboard();


  showToast(
    "Produk berhasil dihapus."
  );

}


/* =========================================
   RENDER ORDERS
========================================= */

function renderOrders(
  filterStatus = ""
) {

  orders =
    JSON.parse(
      localStorage.getItem(
        "clottfitsOrders"
      )
    ) || [];


  const table =
    document.getElementById(
      "ordersTable"
    );


  table.innerHTML = "";


  let filteredOrders =
    orders;


  if (filterStatus) {

    filteredOrders =

      orders.filter(

        order =>
          order.status ===
          filterStatus

      );

  }


  if (
    filteredOrders.length === 0
  ) {

    table.innerHTML = `

      <tr>

        <td
          colspan="7"
          class="empty-data"
        >

          Belum ada pesanan.

        </td>

      </tr>

    `;

    return;

  }


  [...filteredOrders]
    .reverse()
    .forEach(order => {


      const productCount =

        order.products.reduce(

          (total, item) =>
            total +
            item.quantity,

          0

        );


      const row =
        document.createElement(
          "tr"
        );


      row.innerHTML = `

        <td>

          <strong>
            ${order.id}
          </strong>

        </td>


        <td>

          ${order.customer.name}

        </td>


        <td>

          ${productCount} Produk

        </td>


        <td>

          Rp ${formatRupiah(
            order.total
          )}

        </td>


        <td>

          ${order.shipping}

        </td>


        <td>

          <select
            class="status-select"
            onchange="
              updateOrderStatus(
                '${order.id}',
                this.value
              )
            "
          >

            ${createStatusOptions(
              order.status
            )}

          </select>

        </td>


        <td>

          <button
            class="detail-button"
            onclick="
              viewOrder(
                '${order.id}'
              )
            "
          >

            Detail

          </button>

        </td>

      `;


      table.appendChild(row);

    });

}


/* =========================================
   STATUS OPTIONS
========================================= */

function createStatusOptions(
  currentStatus
) {

  const statuses = [

    "Menunggu Pembayaran",

    "Diproses",

    "Dikirim",

    "Selesai"

  ];


  return statuses
    .map(status => `

      <option
        value="${status}"

        ${
          status === currentStatus

            ? "selected"

            : ""
        }
      >

        ${status}

      </option>

    `)
    .join("");

}


/* =========================================
   UPDATE ORDER STATUS
========================================= */

function updateOrderStatus(
  orderId,
  newStatus
) {

  const order =

    orders.find(

      order =>
        order.id === orderId

    );


  if (order) {

    order.status =
      newStatus;


    saveOrders();

    renderDashboard();


    showToast(

      `Status pesanan diubah menjadi ${newStatus}.`

    );

  }

}


/* =========================================
   ORDER FILTER
========================================= */

document
  .getElementById(
    "orderFilter"
  )
  .addEventListener(
    "change",
    function() {

      renderOrders(
        this.value
      );

    }
  );


/* =========================================
   VIEW ORDER DETAIL
========================================= */

function viewOrder(orderId) {

  const order =

    orders.find(

      order =>
        order.id === orderId

    );


  if (!order) {

    return;

  }


  const content =

    document.getElementById(
      "orderDetailContent"
    );


  const productsHTML =

    order.products
      .map(item => `

        <div class="order-product">

          <img
            src="${item.image}"
            alt="${item.name}"
          >


          <div
            class="order-product-info"
          >

            <h4>

              ${item.name}

            </h4>


            <p>

              ${item.quantity}
              ×
              Rp ${formatRupiah(
                item.price
              )}

            </p>

          </div>


          <strong>

            Rp ${formatRupiah(
              item.price *
              item.quantity
            )}

          </strong>

        </div>

      `)
      .join("");


  content.innerHTML = `

    <div
      class="order-detail-grid"
    >

      <div
        class="order-detail-card"
      >

        <h3>
          Informasi Pelanggan
        </h3>

        <p>
          <strong>Nama:</strong>
          ${order.customer.name}
        </p>

        <p>
          <strong>WhatsApp:</strong>
          ${order.customer.phone}
        </p>

        <p>
          <strong>Email:</strong>
          ${order.customer.email}
        </p>

      </div>


      <div
        class="order-detail-card"
      >

        <h3>
          Informasi Pengiriman
        </h3>

        <p>
          ${order.customer.address}
        </p>

        <p>
          ${order.customer.district},
          ${order.customer.city}
        </p>

        <p>
          ${order.customer.province}
          ${order.customer.postalCode}
        </p>

        <p>
          <strong>Kurir:</strong>
          ${order.shipping}
        </p>

      </div>

    </div>


    <div
      class="order-detail-card"
    >

      <h3>
        Produk Pesanan
      </h3>

      ${productsHTML}


      <div
        class="order-total"
      >

        <span>
          Total
        </span>

        <span>

          Rp ${formatRupiah(
            order.total
          )}

        </span>

      </div>

    </div>


    <div
      class="order-detail-grid"
      style="margin-top:20px;"
    >

      <div
        class="order-detail-card"
      >

        <h3>
          Pembayaran
        </h3>

        <p>
          <strong>Metode:</strong>
          ${order.payment}
        </p>

        <p>
          <strong>Status:</strong>
          ${order.status}
        </p>

      </div>


      <div
        class="order-detail-card"
      >

        <h3>
          Informasi Pesanan
        </h3>

        <p>
          <strong>ID:</strong>
          ${order.id}
        </p>

        <p>
          <strong>Tanggal:</strong>
          ${order.date}
        </p>

      </div>

    </div>

  `;


  document
    .getElementById(
      "orderModal"
    )
    .classList
    .add("active");

}


/* =========================================
   CLOSE ORDER MODAL
========================================= */

document
  .getElementById(
    "closeOrderModal"
  )
  .addEventListener(
    "click",
    function() {

      document
        .getElementById(
          "orderModal"
        )
        .classList
        .remove("active");

    }
  );


/* =========================================
   RENDER CUSTOMERS
========================================= */

function renderCustomers() {

  orders =
    JSON.parse(
      localStorage.getItem(
        "clottfitsOrders"
      )
    ) || [];


  const table =
    document.getElementById(
      "customersTable"
    );


  table.innerHTML = "";


  const customers = {};


  orders.forEach(order => {

    const email =
      order.customer.email;


    if (!customers[email]) {

      customers[email] = {

        ...order.customer,

        totalOrders: 0

      };

    }


    customers[email]
      .totalOrders++;

  });


  const customerList =

    Object.values(
      customers
    );


  if (
    customerList.length === 0
  ) {

    table.innerHTML = `

      <tr>

        <td
          colspan="5"
          class="empty-data"
        >

          Belum ada data pelanggan.

        </td>

      </tr>

    `;

    return;

  }


  customerList.forEach(
    customer => {


      const row =

        document.createElement(
          "tr"
        );


      row.innerHTML = `

        <td>

          <strong>

            ${customer.name}

          </strong>

        </td>


        <td>

          ${customer.phone}

        </td>


        <td>

          ${customer.email}

        </td>


        <td>

          ${customer.city}

        </td>


        <td>

          ${customer.totalOrders}

        </td>

      `;


      table.appendChild(
        row
      );

    }
  );

}


/* =========================================
   TOAST NOTIFICATION
========================================= */

let toastTimer;


function showToast(message) {

  const toast =
    document.getElementById(
      "adminToast"
    );


  document
    .getElementById(
      "adminToastMessage"
    )
    .textContent =

    message;


  toast
    .classList
    .add("show");


  clearTimeout(
    toastTimer
  );


  toastTimer =

    setTimeout(
      function() {

        toast
          .classList
          .remove("show");

      },

      3000

    );

}


/* =========================================
   CLOSE MODAL WHEN CLICKING OUTSIDE
========================================= */

window.addEventListener(

  "click",

  function(event) {


    if (
      event.target ===
      productModal
    ) {

      closeProductModal();

    }


    const orderModal =

      document.getElementById(
        "orderModal"
      );


    if (
      event.target ===
      orderModal
    ) {

      orderModal
        .classList
        .remove("active");

    }

  }

);


/* =========================================
   ESCAPE KEY
========================================= */

document.addEventListener(

  "keydown",

  function(event) {

    if (
      event.key === "Escape"
    ) {

      closeProductModal();


      document
        .getElementById(
          "orderModal"
        )
        .classList
        .remove("active");

    }

  }

);


/* =========================================
   INITIALIZATION
========================================= */

document.addEventListener(

  "DOMContentLoaded",

  function() {

    renderDashboard();

    renderProducts();

  }

);
