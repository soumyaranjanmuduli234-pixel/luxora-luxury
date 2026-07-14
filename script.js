// Premium Mock Product Array (8 Curated Items)
const productsData = [
    { id: 1, title: "Classic Autumn Jacket", price: 129.99, category: "jacket", img: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=400&auto=format&fit=crop", desc: "Crafted with dynamic weather shielding technology and a premium comfort interior wrap." },
    { id: 2, title: "Urban Prime Sneakers", price: 89.99, category: "sneakers", img: "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=400&auto=format&fit=crop", desc: "High elastic response mesh combined with top-tier aesthetic leather highlights." },
    { id: 3, title: "Gold Rimmed Aviators", price: 54.99, category: "accessory", img: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=400&auto=format&fit=crop", desc: "Signature luxury eye accessory presenting distinct 100% UV custom dynamic block glare protection." },
    { id: 4, title: "Minimalist Luxury Chrono", price: 210.00, category: "accessory", img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=400&auto=format&fit=crop", desc: "Waterproof sapphire dial watch meticulously aligned with fine metallic detailing." },
    { id: 5, title: "Suede Silhouette Overcoat", price: 185.00, category: "jacket", img: "https://images.unsplash.com/photo-1544022613-e87ca75a784a?q=80&w=400&auto=format&fit=crop", desc: "Long silhouette premium suede piece designed for bold urban environments." },
    { id: 6, title: "All-Terrain Carbon Shoes", price: 145.00, category: "sneakers", img: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=400&auto=format&fit=crop", desc: "Lightweight aerospace carbon fiber structure inner cushion engineered for endless stride velocity." },
    { id: 7, title: "Elite Leather Handbag", price: 320.00, category: "accessory", img: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=400&auto=format&fit=crop", desc: "Genuine top-grain hand-stitched artisan design container radiating luxurious elegance." },
    { id: 8, title: "Vintage Leather Bomber", price: 240.00, category: "jacket", img: "https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=400&auto=format&fit=crop", desc: "Distressed retro premium lining leather jacket exhibiting absolute rugged aesthetics." }
];

// Cart Memory Array State
let globalCart = [];

// DOM Elements
const productContainer = document.getElementById('product-container');
const cartItemsContainer = document.getElementById('cart-items-container');
const cartTotalElement = document.getElementById('cart-total-price');
const cartCountElement = document.querySelector('.cart-count');
const searchInput = document.getElementById('search-input');
const filterBtns = document.querySelectorAll('.filter-btn');

// Theme Switcher Elements
const themeBtn = document.getElementById('theme-btn');
const themeIcon = themeBtn.querySelector('i');

// Modal Elements
const modalOverlay = document.getElementById('modal-overlay');
const modalBox = document.querySelector('.modal-box');
const closeModalBtn = document.getElementById('close-modal');

// Initialize Website View
document.addEventListener("DOMContentLoaded", () => {
    AOS.init({ once: true });
    renderProducts(productsData);
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
        card.setAttribute("data-aos", "fade-up");
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

// 1. Dark/Light Mode Engine Toggle
themeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    document.body.classList.toggle('light-theme');
    
    if(document.body.classList.contains('dark-theme')) {
        themeIcon.className = "fas fa-sun";
    } else {
        themeIcon.className = "fas fa-moon";
    }
});

// 2. Interactive Instant Searching Engine
searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    const filtered = productsData.filter(p => p.title.toLowerCase().includes(query));
    renderProducts(filtered);
});

// 3. Category Filter Mechanism
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const filterValue = btn.getAttribute('data-filter');
        if(filterValue === 'all') {
            renderProducts(productsData);
        } else {
            const filtered = productsData.filter(p => p.category === filterValue);
            renderProducts(filtered);
        }
    });
});

// 4. Live Dynamic Working Cart Logic
function addItemToCart(id) {
    const product = productsData.find(p => p.id === id);
    const existingItem = globalCart.find(item => item.id === id);
    
    if(existingItem) {
        existingItem.quantity += 1;
    } else {
        globalCart.push({ ...product, quantity: 1 });
    }
    
    updateCartUI();
    openCartSidebar();
}

function removeItemFromCart(id) {
    globalCart = globalCart.filter(item => item.id !== id);
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

// Sidebar Open/Close Actions
const cartSidebar = document.getElementById('cart-sidebar');
const cartOverlay = document.getElementById('cart-overlay');

function openCartSidebar() {
    cartSidebar.classList.add('open');
    cartOverlay.classList.add('open');
}
function closeCartSidebar() {
    cartSidebar.classList.remove('open');
    cartOverlay.classList.remove('open');
}

document.getElementById('cart-btn').addEventListener('click', openCartSidebar);
document.getElementById('close-cart').addEventListener('click', closeCartSidebar);
cartOverlay.addEventListener('click', closeCartSidebar);

// 5. Product Quick View Modal Configuration
function openQuickView(id) {
    const product = productsData.find(p => p.id === id);
    
    document.getElementById('modal-img').src = product.img;
    document.getElementById('modal-category').textContent = product.category;
    document.getElementById('modal-title').textContent = product.title;
    document.getElementById('modal-price').textContent = `$${product.price.toFixed(2)}`;
    document.getElementById('modal-desc').textContent = product.desc;
    
    // Modal execution trigger configuration
    modalOverlay.style.display = 'block';
    modalBox.style.display = 'block';
    
    // Action trigger overlay handling binding for item injection
    document.getElementById('modal-add-btn').onclick = () => {
        addItemToCart(product.id);
        closeQuickView();
    };
}

function closeQuickView() {
    modalOverlay.style.display = 'none';
    modalBox.style.display = 'none';
}

closeModalBtn.addEventListener('click', closeQuickView);
modalOverlay.addEventListener('click', closeQuickView);