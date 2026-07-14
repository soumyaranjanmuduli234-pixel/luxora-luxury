/* ==========================================================================
   SECURITY MODULE: Absolute DevTools, Right-Click & Source Inspection Block
   ========================================================================== */
document.addEventListener('contextmenu', event => event.preventDefault());

document.addEventListener('keydown', event => {
    // Blocks F12 Key
    if (event.key === "F12") {
        event.preventDefault();
        return false;
    }
    // Blocks Ctrl+Shift+I, Ctrl+Shift+J (Console/Inspect) & Ctrl+U (View Source)
    if (event.ctrlKey && event.shiftKey && (event.key === 'I' || event.key === 'i' || event.key === 'J' || event.key === 'j')) {
        event.preventDefault();
        return false;
    }
    if (event.ctrlKey && (event.key === 'U' || event.key === 'u')) {
        event.preventDefault();
        return false;
    }
});

/* ==========================================================================
   CORE PLATFORM ENGINE & DATA STRUCTS
   ========================================================================== */
const productsData = [
    { id: 1, title: "Classic Autumn Jacket", price: 129.99, category: "jacket", img: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=400&auto=format&fit=crop", desc: "Featuring premium weather-shielding dynamic woven fabrics. The ultimate statement element for chilly breeze silhouettes.", reviews: [{user:"Aman K.", rating:5, text:"Absolute luxury styling, fits perfectly!"}, {user:"Rohan S.", rating:4, text:"Warm and looks premium."}] },
    { id: 2, title: "Urban Prime Sneakers", price: 89.99, category: "sneakers", img: "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=400&auto=format&fit=crop", desc: "Engineered responsive cushioning layers wrapped in top-tier dynamic finish athletic leather grids.", reviews: [{user:"Vikram P.", rating:5, text:"Most comfortable sleek runners ever."}] },
    { id: 3, title: "Gold Rimmed Aviators", price: 54.99, category: "accessory", img: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=400&auto=format&fit=crop", desc: "Signature 100% UV custom dynamic block tinted optics bounded by elegant geometric micro wire frames.", reviews: [] },
    { id: 4, title: "Minimalist Luxury Chrono", price: 210.00, category: "accessory", img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=400&auto=format&fit=crop", desc: "Waterproof structural steel casing incorporating a scratch-resistant custom crystal sapphire display dial.", reviews: [{user:"Kabir D.", rating:5, text:"Elite finish craftsmanship. Heavy weight feel."}] }
];

// Memory Storage States
let globalCart = JSON.parse(localStorage.getItem("luxora_secure_cart")) || [];
let globalWishlist = JSON.parse(localStorage.getItem("luxora_secure_wishlist")) || [];
let activeUser = JSON.parse(localStorage.getItem("luxora_active_user")) || null;
let appliedDiscountRate = 0; // 0 means 0%, 0.20 means 20% off

// DOM Bindings
const productContainer = document.getElementById('product-container');
const cartItemsContainer = document.getElementById('cart-items-container');
const wishlistItemsContainer = document.getElementById('wishlist-items-container');
const cartSubtotalElement = document.getElementById('cart-subtotal-price');
const cartDiscountElement = document.getElementById('cart-discount-value');
const cartTotalElement = document.getElementById('cart-total-price');
const cartCountElement = document.querySelector('.cart-count');
const wishlistCountElement = document.querySelector('.wishlist-count');
const userStatusText = document.getElementById('user-status-text');

// Initialize Engine
document.addEventListener("DOMContentLoaded", () => {
    AOS.init({ once: true });
    renderProducts(productsData);
    updateCartUI();
    updateWishlistUI();
    checkUserAuthStatus();
});

/* ==========================================================================
   AUTHENTICATION ENGINE LAYER (Login/Signup Mock Verification)
   ========================================================================== */
const authOverlay = document.getElementById('auth-overlay');
const loginCard = document.getElementById('auth-login-card');
const signupCard = document.getElementById('auth-signup-card');

document.getElementById('auth-btn-trigger').addEventListener('click', () => {
    if(activeUser) {
        // Simple Logout execution sequence
        activeUser = null;
        localStorage.removeItem("luxora_active_user");
        checkUserAuthStatus();
        alert("Account logged out successfully.");
    } else {
        authOverlay.classList.add('open');
    }
});

document.getElementById('close-auth').addEventListener('click', () => authOverlay.classList.remove('open'));

function toggleAuthCards(showSignup) {
    loginCard.style.display = showSignup ? 'none' : 'block';
    signupCard.style.display = showSignup ? 'block' : 'none';
}

function executeMockSignup(e) {
    e.preventDefault();
    const name = document.getElementById('signup-name').value;
    const email = document.getElementById('signup-email').value;
    
    activeUser = { name: name, email: email };
    localStorage.setItem("luxora_active_user", JSON.stringify(activeUser));
    checkUserAuthStatus();
    authOverlay.classList.remove('open');
    alert(`Welcome to elite tier, ${name}!`);
}

function executeMockLogin(e) {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    
    activeUser = { name: "Arfin Das", email: email };
    localStorage.setItem("luxora_active_user", JSON.stringify(activeUser));
    checkUserAuthStatus();
    authOverlay.classList.remove('open');
    alert("Secure authorization signature logged successfully.");
}

function checkUserAuthStatus() {
    if(activeUser) {
        userStatusText.textContent = activeUser.name;
        document.getElementById('auth-btn-trigger').querySelector('i').className = "fas fa-user-check";
    } else {
        userStatusText.textContent = "Login";
        document.getElementById('auth-btn-trigger').querySelector('i').className = "far fa-user";
    }
}

/* ==========================================================================
   CATALOG GRID RENDERING MATRIX WITH WISHLIST INTERACTION
   ========================================================================== */
function renderProducts(products) {
    productContainer.innerHTML = "";
    products.forEach(p => {
        const isWishlisted = globalWishlist.some(item => item.id === p.id);
        const card = document.createElement('div');
        card.className = "product-card";
        card.innerHTML = `
            <div class="wishlist-heart-btn ${isWishlisted ? 'active' : ''}" onclick="toggleWishlist(event, ${p.id})">
                <i class="${isWishlisted ? 'fas' : 'far'} fa-heart"></i>
            </div>
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

/* ==========================================================================
   WISHLIST STATE STORAGE SYNC LAYER
   ========================================================================== */
function toggleWishlist(event, id) {
    event.stopPropagation();
    const product = productsData.find(p => p.id === id);
    const index = globalWishlist.findIndex(item => item.id === id);
    
    if(index > -1) {
        globalWishlist.splice(index, 1);
    } else {
        globalWishlist.push(product);
    }
    
    localStorage.setItem("luxora_secure_wishlist", JSON.stringify(globalWishlist));
    updateWishlistUI();
    renderProducts(productsData); // Refresh layout heart state fills
}

function updateWishlistUI() {
    wishlistItemsContainer.innerHTML = "";
    wishlistCountElement.textContent = globalWishlist.length;
    
    if(globalWishlist.length === 0) {
        wishlistItemsContainer.innerHTML = `<p class="empty-msg">Your Wishlist is empty.</p>`;
        return;
    }
    
    globalWishlist.forEach(item => {
        const itemRow = document.createElement('div');
        itemRow.className = "cart-item-card";
        itemRow.innerHTML = `
            <img src="${item.img}" alt="${item.title}">
            <div class="item-details">
                <h4>${item.title}</h4>
                <p>$${item.price.toFixed(2)}</p>
            </div>
            <button class="remove-item-btn" onclick="toggleWishlist(event, ${item.id})"><i class="fas fa-trash"></i></button>
        `;
        wishlistItemsContainer.appendChild(itemRow);
    });
}

// Sidebars Dynamic Drawer Toggle Setup
const wishlistSidebar = document.getElementById('wishlist-sidebar');
const cartSidebar = document.getElementById('cart-sidebar');
const cartOverlay = document.getElementById('cart-overlay');

document.getElementById('wishlist-btn-trigger').addEventListener('click', () => { wishlistSidebar.classList.add('open'); cartOverlay.classList.add('open'); });
document.getElementById('close-wishlist').addEventListener('click', () => { wishlistSidebar.classList.remove('open'); cartOverlay.classList.remove('open'); });
document.getElementById('cart-btn').addEventListener('click', () => { cartSidebar.classList.add('open'); cartOverlay.classList.add('open'); });
document.getElementById('close-cart').addEventListener('click', () => { cartSidebar.classList.remove('open'); cartOverlay.classList.remove('open'); });

cartOverlay.addEventListener('click', () => {
    wishlistSidebar.classList.remove('open');
    cartSidebar.classList.remove('open');
    cartOverlay.classList.remove('open');
});

/* ==========================================================================
   PROMO SYSTEM ENGINE & MATHEMATICAL CART SYNC
   ========================================================================== */
document.getElementById('apply-coupon-btn').addEventListener('click', () => {
    const code = document.getElementById('coupon-code-input').value.trim();
    const feedback = document.getElementById('promo-msg-feedback');
    
    if(code === "LUXORA20") {
        appliedDiscountRate = 0.20; // 20% discount valuation parameter
        feedback.style.color = "#2ec4b6";
        feedback.textContent = "Coupon Code LUXORA20 (20% Off) applied successfully!";
    } else {
        appliedDiscountRate = 0;
        feedback.style.color = "#ff4d4d";
        feedback.textContent = "Invalid security coupon sequence parameter.";
    }
    updateCartUI();
});

function addItemToCart(id) {
    const product = productsData.find(p => p.id === id);
    const existingItem = globalCart.find(item => item.id === id);
    if(existingItem) existingItem.quantity += 1;
    else globalCart.push({ ...product, quantity: 1 });
    
    localStorage.setItem("luxora_secure_cart", JSON.stringify(globalCart));
    updateCartUI();
    cartSidebar.classList.add('open');
    cartOverlay.classList.add('open');
}

function removeItemFromCart(id) {
    globalCart = globalCart.filter(item => item.id !== id);
    localStorage.setItem("luxora_secure_cart", JSON.stringify(globalCart));
    updateCartUI();
}

function updateCartUI() {
    cartItemsContainer.innerHTML = "";
    if(globalCart.length === 0) {
        cartItemsContainer.innerHTML = `<p class="empty-msg">Your bag is empty.</p>`;
        cartSubtotalElement.textContent = "$0.00";
        cartTotalElement.textContent = "$0.00";
        cartCountElement.textContent = "0";
        document.querySelector('.discount-line').style.display = 'none';
        return;
    }
    
    let subtotal = 0;
    let itemCount = 0;
    globalCart.forEach(item => { subtotal += (item.price * item.quantity); itemCount += item.quantity; });
    
    globalCart.forEach(item => {
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
    
    let discountAmount = subtotal * appliedDiscountRate;
    let absoluteFinalTotal = subtotal - discountAmount;
    
    cartCountElement.textContent = itemCount;
    cartSubtotalElement.textContent = `$${subtotal.toFixed(2)}`;
    
    if(appliedDiscountRate > 0) {
        document.querySelector('.discount-line').style.display = 'flex';
        cartDiscountElement.textContent = `-$${discountAmount.toFixed(2)}`;
    } else {
        document.querySelector('.discount-line').style.display = 'none';
    }
    
    cartTotalElement.textContent = `$${absoluteFinalTotal.toFixed(2)}`;
}

/* ==========================================================================
   QUICK VIEW ENGINE MOCK USER RATING LAYER INTERACTION
   ========================================================================== */
let selectedActiveProductIdForRating = null;

function openQuickView(id) {
    const product = productsData.find(p => p.id === id);
    selectedActiveProductIdForRating = id;
    
    document.getElementById('modal-img').src = product.img;
    document.getElementById('modal-category').textContent = product.category;
    document.getElementById('modal-title').textContent = product.title;
    document.getElementById('modal-price').textContent = `$${product.price.toFixed(2)}`;
    document.getElementById('modal-desc').textContent = product.desc;
    
    renderProductReviewsUI(product);
    resetStarIconsRowState();
    
    document.getElementById('modal-overlay').classList.add('open');
    document.getElementById('modal-add-btn').onclick = () => { addItemToCart(product.id); closeQuickView(); };
}

function closeQuickView() { document.getElementById('modal-overlay').classList.remove('open'); }
document.getElementById('close-modal').addEventListener('click', closeQuickView);

function renderProductReviewsUI(product) {
    const listWrap = document.getElementById('modal-reviews-list');
    const numericalText = document.getElementById('rating-numerical-status');
    listWrap.innerHTML = "";
    
    if(product.reviews.length === 0) {
        listWrap.innerHTML = `<p style="opacity:0.5; font-size:12px;">No custom reviews logged yet for this element.</p>`;
        numericalText.textContent = "(0.0 / 5)";
        return;
    }
    
    let ratingSum = 0;
    product.reviews.forEach(r => {
        ratingSum += r.rating;
        const rCard = document.createElement('div');
        rCard.className = "review-item-row";
        rCard.innerHTML = `<header><span>${r.user}</span><span>${"★".repeat(r.rating)}</span></header><p>${r.text}</p>`;
        listWrap.appendChild(rCard);
    });
    
    let avg = ratingSum / product.reviews.length;
    numericalText.textContent = `(${avg.toFixed(1)} / 5)`;
}

// User Click Star Add Rating Trigger Mechanism
const starElements = document.querySelectorAll('#interactive-star-row i');
starElements.forEach(star => {
    star.addEventListener('click', () => {
        if(!activeUser) { alert("Please authenticate token access via Login gate before signing reviews."); return; }
        const clickedRating = parseInt(star.getAttribute('data-rating'));
        const product = productsData.find(p => p.id === selectedActiveProductIdForRating);
        
        product.reviews.push({ user: activeUser.name, rating: clickedRating, text: "Mock instant validation feed injection." });
        renderProductReviewsUI(product);
        
        // Dynamic highlight fill update representation
        starElements.forEach((s, idx) => {
            s.className = idx < clickedRating ? "fas fa-star" : "far fa-star";
        });
    });
});

function resetStarIconsRowState() {
    starElements.forEach(s => s.className = "far fa-star");
}

/* ==========================================================================
   GATEWAY SIMULATED PAYMENT CORE CONTROLS
   ========================================================================== */
const paymentOverlay = document.getElementById('payment-overlay');
const checkoutTriggerBtn = document.getElementById('checkout-trigger-btn');
const pStepForm = document.getElementById('payment-step-form');
const pStepProcessing = document.getElementById('payment-step-processing');
const pStepSuccess = document.getElementById('payment-step-success');

checkoutTriggerBtn.addEventListener('click', () => {
    if(!activeUser) { alert("Security Protocol: User Login context missing. Please login to checkout."); authOverlay.classList.add('open'); return; }
    if(globalCart.length === 0) return;
    
    document.getElementById('payment-payable-amount').textContent = cartTotalElement.textContent;
    cartSidebar.classList.remove('open');
    paymentOverlay.classList.add('open');
});

document.getElementById('close-payment').addEventListener('click', () => paymentOverlay.classList.remove('open'));

function handleFakePayment(e) {
    e.preventDefault();
    pStepForm.style.display = 'none';
    pStepProcessing.style.display = 'block';
    
    setTimeout(() => {
        pStepProcessing.style.display = 'none';
        pStepSuccess.style.display = 'block';
        globalCart = [];
        localStorage.removeItem("luxora_secure_cart");
        updateCartUI();
    }, 2500);
}

function resetPaymentSystemState() {
    paymentOverlay.classList.remove('open');
    pStepForm.style.display = 'block';
    pStepProcessing.style.display = 'none';
    pStepSuccess.style.display = 'none';
    document.getElementById('fake-checkout-form').reset();
}

// Theme Mode Switching Engine & Search Filtering Extensions
document.getElementById('theme-btn').addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    document.body.classList.toggle('light-theme');
});
document.getElementById('search-input').addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    renderProducts(productsData.filter(p => p.title.toLowerCase().includes(query)));
});
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const val = btn.getAttribute('data-filter');
        renderProducts(val === 'all' ? productsData : productsData.filter(p => p.category === val));
    });
});