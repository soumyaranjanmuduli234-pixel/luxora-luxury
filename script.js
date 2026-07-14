// Premium Mock Product Array (Expanded Collection to 12 Curated Items)
const productsData = [
    { id: 1, title: "Classic Autumn Jacket", price: 129.99, category: "jacket", img: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=400&auto=format&fit=crop", desc: "Featuring premium weather-shielding dynamic woven fabrics. The ultimate statement element for chilly breeze silhouettes." },
    { id: 2, title: "Urban Prime Sneakers", price: 89.99, category: "sneakers", img: "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=400&auto=format&fit=crop", desc: "Engineered responsive cushioning layers wrapped in top-tier dynamic finish athletic leather grids." },
    { id: 3, title: "Gold Rimmed Aviators", price: 54.99, category: "accessory", img: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=400&auto=format&fit=crop", desc: "Signature 100% UV custom dynamic block tinted optics bounded by elegant geometric micro wire frames." },
    { id: 4, title: "Minimalist Luxury Chrono", price: 210.00, category: "accessory", img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=400&auto=format&fit=crop", desc: "Waterproof structural steel casing incorporating a scratch-resistant custom crystal sapphire display dial." },
    { id: 5, title: "Suede Silhouette Overcoat", price: 185.00, category: "jacket", img: "https://images.unsplash.com/photo-1544022613-e87ca75a784a?q=80&w=400&auto=format&fit=crop", desc: "Premium textured tailoring cut cleanly for sharp modern silhouettes across fine urban environments." },
    { id: 6, title: "All-Terrain Carbon Shoes", price: 145.00, category: "sneakers", img: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=400&auto=format&fit=crop", desc: "High kinetic bounce mechanics utilizing dense carbon fiber grid structures for extreme comfort." },
    { id: 7, title: "Elite Leather Handbag", price: 320.00, category: "accessory", img: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=400&auto=format&fit=crop", desc: "Artisanally shaped premium top-grain leather container offering expansive storage layout dynamics." },
    { id: 8, title: "Vintage Leather Bomber", price: 240.00, category: "jacket", img: "https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=400&auto=format&fit=crop", desc: "Distressed authentic design textures equipped with custom insulated inner windbreaking technology layers." },
    { id: 9, title: "Water-Resistant Tech Windbreaker", price: 115.00, category: "jacket", img: "https://images.unsplash.com/photo-1548883354-7622d03aca27?q=80&w=400&auto=format&fit=crop", desc: "Ultralight breathable ripstop shell configuration designed to repel water effortlessly." },
    { id: 10, title: "Monochrome Future Foam Runners", price: 95.00, category: "sneakers", img: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=400&auto=format&fit=crop", desc: "Futuristic ergonomic slip-on footwear shaped using highly sustainable algae EVA compound mixes." },
    { id: 11, title: "Stealth Obsidian Smart Backpack", price: 160.00, category: "accessory", img: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=400&auto=format&fit=crop", desc: "Ballistic nylon composite material offering dynamic anti-theft compartments and built-in USB routing channels." },
    { id: 12, title: "Classic Knit Ivory Sweater", price: 75.00, category: "jacket", img: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=400&auto=format&fit=crop", desc: "Woven using premium premium cotton blend blends. Extremely lightweight yet highly insulating dynamic structure." }
];

// Persistent Cart Memory Initialization Matrix
let globalCart = JSON.parse(localStorage.getItem("luxora_cart")) || [];

// DOM Bindings
const productContainer = document.getElementById('product-container');
const cartItemsContainer = document.getElementById('cart-items-container');
const cartTotalElement = document.getElementById('cart-total-price');
const cartCountElement = document.querySelector('.cart-count');
const searchInput = document.getElementById('search-input');
const filterBtns = document.querySelectorAll('.filter-btn');

// Theme Toggle DOM Elements
const themeBtn = document.getElementById('theme-btn');
const themeIcon = themeBtn.querySelector('i');

// Quick View DOM Elements
const modalOverlay = document.getElementById('modal-overlay');
const modalBox = document.querySelector('.modal-box');
const closeModalBtn = document.getElementById('close-modal');

// Checkout/Payment Gate System DOM Elements
const paymentOverlay = document.getElementById('payment-overlay');
const checkoutTriggerBtn = document.getElementById('checkout-trigger-btn');
const closePaymentBtn = document.getElementById('close-payment');
const paymentPayableAmount = document.getElementById('payment-payable-amount');

const pStepForm = document.getElementById('payment-step-form');
const pStepProcessing = document.getElementById('payment-step-processing');
const pStepSuccess = document.getElementById('payment-step-success');

// Initialize Layout Engine
document.addEventListener("DOMContentLoaded", () => {
    AOS.init({ once: true });
    renderProducts(productsData);
    updateCartUI(); // Initialized local data rendering matrix calculations
});

// Render Dynamic Grid Function
function renderProducts(products) {
    productContainer.innerHTML = "";
    if(products.length === 0) {
        productContainer.innerHTML = `<p style="grid-column: 1/-1; text-align:center; opacity:0.6; padding: 40px 0;">No matching products found.</p>`;
        return;
    }
    
    products.forEach(p => {
        const card = document.createElement('div');
        card.className = "product-card";
        card.innerHTML = `
            <div class="img-container">
                <img src="${p.img}" alt="${p.title}">
                <div class="hover-overlay">
                    <button class="quick-view-btn" onclick="openQuickView(${p.id})">Quick View</button>
                </div>
            </div>
            <div class="product-info">
                <h3>${p.title}</h3>
                <p class="price">$${p.price.toFixed(2)}</p>
                <button class="add-to-cart-btn" onclick="addItemToCart(${p.id})">Add to Bag</button>
            </div>
        `;
        productContainer.appendChild(card);
    });
}

// Dark/Light Mode Engine Toggle
themeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    document.body.classList.toggle('light-theme');
    themeIcon.className = document.body.classList.contains('dark-theme') ? "fas fa-sun" : "fas fa-moon";
});

// Interactive Instant Searching Engine
searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    const filtered = productsData.filter(p => p.title.toLowerCase().includes(query));
    renderProducts(filtered);
});

// Category Filter Mechanism
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filterValue = btn.getAttribute('data-filter');
        const filtered = filterValue === 'all' ? productsData : productsData.filter(p => p.category === filterValue);
        renderProducts(filtered);
    });
});

// Persistent Cart Framework Core Functions
function addItemToCart(id) {
    const product = productsData.find(p => p.id === id);
    const existingItem = globalCart.find(item => item.id === id);
    
    if(existingItem) {
        existingItem.quantity += 1;
    } else {
        globalCart.push({ ...product, quantity: 1 });
    }
    
    saveCartAndRefresh();
    openCartSidebar();
}

function removeItemFromCart(id) {
    globalCart = globalCart.filter(item => item.id !== id);
    saveCartAndRefresh();
}

function saveCartAndRefresh() {
    localStorage.setItem("luxora_cart", JSON.stringify(globalCart));
    updateCartUI();
}

function updateCartUI() {
    cartItemsContainer.innerHTML = "";
    if(globalCart.length === 0) {
        cartItemsContainer.innerHTML = `<p class="empty-msg">Your bag is empty.</p>`;
        cartTotalElement.textContent = "$0.00";
        cartCountElement.textContent = "0";
        return;
    }
    
    let total = 0;
    let itemCount = 0;
    
    globalCart.forEach(item => {
        total += (item.price * item.quantity);
        itemCount += item.quantity;
        
        const itemRow = document.createElement('div');
        itemRow.className = "cart-item-card";
        itemRow.innerHTML = `
            <img src="${item.img}" alt="${item.title}">
            <div class="item-details">
                <h4>${item.title}</h4>
                <p>${item.quantity} x $${item.price.toFixed(2)}</p>
            </div>
            <button class="remove-item-btn" onclick="removeItemFromCart(${item.id})"><i class="fas fa-trash"></i></button>
        `;
        cartItemsContainer.appendChild(itemRow);
    });
    
    cartTotalElement.textContent = `$${total.toFixed(2)}`;
    cartCountElement.textContent = itemCount;
}

// Sidebar View Engine Routing Config
const cartSidebar = document.getElementById('cart-sidebar');
const cartOverlay = document.getElementById('cart-overlay');

function openCartSidebar() { cartSidebar.classList.add('open'); cartOverlay.classList.add('open'); }
function closeCartSidebar() { cartSidebar.classList.remove('open'); cartOverlay.classList.remove('open'); }

document.getElementById('cart-btn').addEventListener('click', openCartSidebar);
document.getElementById('close-cart').addEventListener('click', closeCartSidebar);
cartOverlay.addEventListener('click', closeCartSidebar);

// Product Quick View Modal Configuration Engine
function openQuickView(id) {
    const product = productsData.find(p => p.id === id);
    document.getElementById('modal-img').src = product.img;
    document.getElementById('modal-category').textContent = product.category;
    document.getElementById('modal-title').textContent = product.title;
    document.getElementById('modal-price').textContent = `$${product.price.toFixed(2)}`;
    
    // Dynamic Description Injection Layer Active
    document.getElementById('modal-desc').textContent = product.desc;
    
    modalOverlay.classList.add('open');
    modalBox.style.display = 'block';
    
    document.getElementById('modal-add-btn').onclick = () => {
        addItemToCart(product.id);
        closeQuickView();
    };
}

function closeQuickView() { modalOverlay.classList.remove('open'); modalBox.style.display = 'none'; }
closeModalBtn.addEventListener('click', closeQuickView);
modalOverlay.addEventListener('click', closeQuickView);

// ==========================================================================
// NEW FEATURES: Activated Checkout Handler & Simulated Payment Flow Engine
// ==========================================================================
checkoutTriggerBtn.addEventListener('click', () => {
    if(globalCart.length === 0) {
        alert("Your bag is currently empty. Add products before checkout processing.");
        return;
    }
    
    // Calculate final total text value to dynamic summary overlay container
    let finalTotal = 0;
    globalCart.forEach(item => finalTotal += (item.price * item.quantity));
    paymentPayableAmount.textContent = `$${finalTotal.toFixed(2)}`;
    
    closeCartSidebar();
    paymentOverlay.classList.add('open');
});

function closePaymentSystemModal() {
    paymentOverlay.classList.remove('open');
    setTimeout(resetPaymentSystemState, 400); // Wait for modal fade out transition
}

closePaymentBtn.addEventListener('click', closePaymentSystemModal);

// Submit form intercept logic handler
function handleFakePayment(event) {
    event.preventDefault(); // Stop native HTML page redirection mechanics
    
    // Switch views to Processing State Animation screen
    pStepForm.style.display = 'none';
    pStepProcessing.style.display = 'block';
    
    // Simulate 3 seconds payment gateway network latency response
    setTimeout(() => {
        pStepProcessing.style.display = 'none';
        pStepSuccess.style.display = 'block';
        
        // Clear Persistent Memory Cart upon authorization completion
        globalCart = [];
        saveCartAndRefresh();
    }, 3000);
}

function resetPaymentSystemState() {
    paymentOverlay.classList.remove('open');
    pStepForm.style.display = 'block';
    pStepProcessing.style.display = 'none';
    pStepSuccess.style.display = 'none';
    document.getElementById('fake-checkout-form').reset();
}