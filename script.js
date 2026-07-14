/* ==========================================================================
   SECURITY LAYER MODULE: Complete Inspections & Terminal Keys Blocking
   ========================================================================== */
document.addEventListener('contextmenu', event => event.preventDefault());
document.addEventListener('keydown', event => {
    if (event.key === "F12") { event.preventDefault(); return false; }
    if (event.ctrlKey && event.shiftKey && (event.key === 'I' || event.key === 'i' || event.key === 'J' || event.key === 'j')) { event.preventDefault(); return false; }
    if (event.ctrlKey && (event.key === 'U' || event.key === 'u')) { event.preventDefault(); return false; }
});

/* ==========================================================================
   INITIALIZATION & CORE ENTERPRISE MEMORY CONFIGURATIONS
   ========================================================================== */
(function() {
    emailjs.init("6LxCSANGoCWnxxb51"); // Initializing Soumyaranjan Muduli's Public Key Parameter
})();

const productsData = [
    { id: 1, title: "Classic Autumn Jacket", price: 129.99, category: "jacket", img: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=400&auto=format&fit=crop", desc: "Featuring premium weather-shielding dynamic woven fabrics. The ultimate statement element.", reviews: [{user:"Aman K.", rating:5, text:"Absolute luxury styling, fits perfectly!"}] },
    { id: 2, title: "Urban Prime Sneakers", price: 89.99, category: "sneakers", img: "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=400&auto=format&fit=crop", desc: "Engineered responsive cushioning layers wrapped in top-tier athletic leather grids.", reviews: [{user:"Vikram P.", rating:5, text:"Most comfortable sleek runners ever."}] },
    { id: 3, title: "Gold Rimmed Aviators", price: 54.99, category: "accessory", img: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=400&auto=format&fit=crop", desc: "Signature 100% UV block optics bounded by elegant geometric micro wire frames.", reviews: [] },
    { id: 4, title: "Minimalist Luxury Chrono", price: 210.00, category: "accessory", img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=400&auto=format&fit=crop", desc: "Waterproof structural steel casing incorporating a scratch-resistant sapphire display dial.", reviews: [{user:"Kabir D.", rating:5, text:"Elite finish craftsmanship."}] }
];

// Valid Coupons Matrix Storage Array Link
const validCouponsEngine = { "LUXORA10": 0.10, "LUXORA15": 0.15, "LUXORA20": 0.20, "LUXORA50": 0.50 };

// Database Arrays Synced parameters
let globalCart = JSON.parse(localStorage.getItem("luxora_secure_cart")) || [];
let globalWishlist = JSON.parse(localStorage.getItem("luxora_secure_wishlist")) || [];
let activeUser = JSON.parse(localStorage.getItem("luxora_active_user")) || null;
let systemUsersList = JSON.parse(localStorage.getItem("luxora_db_users")) || [
    { name: "Arfin Das", email: "arfin@acc.com", phone: "9876543210" } // Baseline mock account parameter
];
let systemInvoicesLogs = JSON.parse(localStorage.getItem("luxora_db_invoices")) || [];
let appliedDiscountRate = 0;
let currentAppliedCouponString = "NONE";

// Currency Multiplier Conversion Configuration Matrix (AI Feature Drop Node)
let currentCurrencySymbol = "$";
let currentCurrencyExchangeRateMultiplier = 1.0;

// DOM Bindings Setup
const productContainer = document.getElementById('product-container');
const cartItemsContainer = document.getElementById('cart-items-container');
const wishlistItemsContainer = document.getElementById('wishlist-items-container');
const cartSubtotalElement = document.getElementById('cart-subtotal-price');
const cartDiscountElement = document.getElementById('cart-discount-value');
const cartTotalElement = document.getElementById('cart-total-price');
const cartCountElement = document.querySelector('.cart-count');
const wishlistCountElement = document.querySelector('.wishlist-count');
const userStatusText = document.getElementById('user-status-text');

document.addEventListener("DOMContentLoaded", () => {
    AOS.init({ once: true });
    renderProducts(productsData);
    updateCartUI();
    updateWishlistUI();
    checkUserAuthStatus();
    attachLiveContactEmailJSEngine();
});

/* ==========================================================================
   GLASSMORPHISM TOAST ALERT ENGINE NOTIFICATION SYSTEMS
   ========================================================================== */
function showGlassmorphismNotification(message, iconClass = "fa-info-circle") {
    const toast = document.getElementById('glass-toast-notification');
    const msgNode = document.getElementById('toast-message-text');
    const iconNode = document.getElementById('toast-icon-indicator');
    const progressNode = toast.querySelector('.toast-progress-bar');
    
    iconNode.className = `fas ${iconClass}`;
    msgNode.textContent = message;
    
    progressNode.style.transition = 'none';
    progressNode.style.width = '100%';
    
    toast.classList.add('active');
    
    setTimeout(() => {
        progressNode.style.transition = 'width 3000ms linear';
        progressNode.style.width = '0%';
    }, 50);
    
    setTimeout(() => {
        toast.classList.remove('active');
    }, 3050);
}

/* ==========================================================================
   AI FEATURE DROP LAYER: Currency Switching Conversion Matrix Node
   ========================================================================== */
document.getElementById('currency-toggle-node').addEventListener('click', () => {
    const node = document.getElementById('currency-toggle-node');
    if (currentCurrencySymbol === "$") {
        currentCurrencySymbol = "₹";
        currentCurrencyExchangeRateMultiplier = 85.0; // Multiplier conversion mapping metrics
        node.innerHTML = `<b>INR (₹)</b>`;
        showGlassmorphismNotification("Currency layout switched to INR (₹) dynamically.", "fa-coins");
    } else {
        currentCurrencySymbol = "$";
        currentCurrencyExchangeRateMultiplier = 1.0;
        node.innerHTML = `<b>USD ($)</b>`;
        showGlassmorphismNotification("Currency layout switched to USD ($) dynamically.", "fa-dollar-sign");
    }
    renderProducts(productsData);
    updateCartUI();
});

function formatPriceValueMetrics(val) {
    return `${currentCurrencySymbol}${(val * currentCurrencyExchangeRateMultiplier).toFixed(2)}`;
}

/* ==========================================================================
   AUTHENTICATION CAPTURING REGISTRY ENGINE (Syncs User Registry Database)
   ========================================================================== */
const authOverlay = document.getElementById('auth-overlay');
const loginCard = document.getElementById('auth-login-card');
const signupCard = document.getElementById('auth-signup-card');

document.getElementById('auth-btn-trigger').addEventListener('click', () => {
    if(activeUser) {
        activeUser = null;
        localStorage.removeItem("luxora_active_user");
        checkUserAuthStatus();
        showGlassmorphismNotification("Session context cleared. User logged out.", "fa-sign-out-alt");
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
    const phone = document.getElementById('signup-phone').value;
    const email = document.getElementById('signup-email').value;
    
    const newUserObj = { name, email, phone };
    systemUsersList.push(newUserObj);
    localStorage.setItem("luxora_db_users", JSON.stringify(systemUsersList));
    
    activeUser = newUserObj;
    localStorage.setItem("luxora_active_user", JSON.stringify(activeUser));
    checkUserAuthStatus();
    authOverlay.classList.remove('open');
    document.getElementById('signup-form').reset();
    showGlassmorphismNotification(`Account created successfully! Welcome ${name}.`, "fa-user-plus");
}

function executeMockLogin(e) {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const matchedUser = systemUsersList.find(u => u.email.toLowerCase() === email.toLowerCase()) || { name: "Arfin Das", email: email, phone: "9876543210" };
    
    activeUser = matchedUser;
    localStorage.setItem("luxora_active_user", JSON.stringify(activeUser));
    checkUserAuthStatus();
    authOverlay.classList.remove('open');
    document.getElementById('login-form').reset();
    showGlassmorphismNotification(`Authenticated successfully as ${activeUser.name}.`, "fa-user-check");
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
   DYNAMIC PRODUCT CORE CATALOG GRID MATRIX
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
                <p class="price">${formatPriceValueMetrics(p.price)}</p>
                <button class="add-to-cart-btn" onclick="addItemToCart(${p.id})">Add to Bag</button>
            </div>
        `;
        productContainer.appendChild(card);
    });
}

/* ==========================================================================
   WISHLIST DATA LOGIC DRAWER SYNC INTERACTION
   ========================================================================== */
function toggleWishlist(event, id) {
    event.stopPropagation();
    const product = productsData.find(p => p.id === id);
    const index = globalWishlist.findIndex(item => item.id === id);
    
    if(index > -1) {
        globalWishlist.splice(index, 1);
        showGlassmorphismNotification("Item removed from wishlist.", "fa-heart-broken");
    } else {
        globalWishlist.push(product);
        showGlassmorphismNotification("Item added to premium wishlist.", "fa-heart");
    }
    
    localStorage.setItem("luxora_secure_wishlist", JSON.stringify(globalWishlist));
    updateWishlistUI();
    renderProducts(productsData);
}

function updateWishlistUI() {
    wishlistItemsContainer.innerHTML = "";
    wishlistCountElement.textContent = globalWishlist.length;
    
    if(globalWishlist.length === 0) {
        wishlistItemsContainer.innerHTML = `<p class="empty-msg" style="text-align:center;opacity:0.5;font-size:13px;margin-top:20px;">Wishlist empty.</p>`;
        return;
    }
    
    globalWishlist.forEach(item => {
        const itemRow = document.createElement('div');
        itemRow.className = "cart-item-card";
        itemRow.innerHTML = `
            <img src="${item.img}" alt="${item.title}">
            <div class="item-details">
                <h4>${item.title}</h4>
                <p>${formatPriceValueMetrics(item.price)}</p>
            </div>
            <button class="remove-item-btn" onclick="toggleWishlist(event, ${item.id})"><i class="fas fa-trash"></i></button>
        `;
        wishlistItemsContainer.appendChild(itemRow);
    });
}

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
   PROMO SYSTEMS ENGINE LOGIC & MULTIPLE CODE ALLOCATIONS
   ========================================================================== */
document.getElementById('apply-coupon-btn').addEventListener('click', () => {
    const code = document.getElementById('coupon-code-input').value.trim().toUpperCase();
    const feedback = document.getElementById('promo-msg-feedback');
    
    if(validCouponsEngine.hasOwnProperty(code)) {
        appliedDiscountRate = validCouponsEngine[code];
        currentAppliedCouponString = code;
        feedback.style.color = "#2ec4b6";
        feedback.textContent = `Coupon ${code} (${appliedDiscountRate*100}% Off) applied to dynamic pipeline total balance!`;
        showGlassmorphismNotification(`Discount code ${code} initialized successfully!`, "fa-tags");
    } else {
        appliedDiscountRate = 0;
        currentAppliedCouponString = "NONE";
        feedback.style.color = "#ff4d4d";
        feedback.textContent = "Invalid or expired authorization code segment.";
        showGlassmorphismNotification("Invalid coupon syntax match parameters entered.", "fa-exclamation-triangle");
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
    showGlassmorphismNotification(`${product.title} appended to bag structural allocation.`, "fa-cart-plus");
}

function removeItemFromCart(id) {
    globalCart = globalCart.filter(item => item.id !== id);
    localStorage.setItem("luxora_secure_cart", JSON.stringify(globalCart));
    updateCartUI();
}

function updateCartUI() {
    cartItemsContainer.innerHTML = "";
    if(globalCart.length === 0) {
        cartItemsContainer.innerHTML = `<p class="empty-msg" style="text-align:center;opacity:0.5;font-size:13px;margin-top:20px;">Bag is empty.</p>`;
        cartSubtotalElement.textContent = formatPriceValueMetrics(0);
        cartTotalElement.textContent = formatPriceValueMetrics(0);
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
                <p>${item.quantity} x ${formatPriceValueMetrics(item.price)}</p>
            </div>
            <button class="remove-item-btn" onclick="removeItemFromCart(${item.id})"><i class="fas fa-trash"></i></button>
        `;
        cartItemsContainer.appendChild(itemRow);
    });
    
    let discountAmount = subtotal * appliedDiscountRate;
    let absoluteFinalTotal = subtotal - discountAmount;
    
    cartCountElement.textContent = itemCount;
    cartSubtotalElement.textContent = formatPriceValueMetrics(subtotal);
    
    if(appliedDiscountRate > 0) {
        document.querySelector('.discount-line').style.display = 'flex';
        cartDiscountElement.textContent = `-${formatPriceValueMetrics(discountAmount)}`;
    } else {
        document.querySelector('.discount-line').style.display = 'none';
    }
    cartTotalElement.textContent = formatPriceValueMetrics(absoluteFinalTotal);
}

/* ==========================================================================
   PRODUCT VISUALS INTERACTIVE EVALUATION ENGINE MOCK USER RATINGS
   ========================================================================== */
let selectedActiveProductIdForRating = null;
function openQuickView(id) {
    const product = productsData.find(p => p.id === id);
    selectedActiveProductIdForRating = id;
    
    document.getElementById('modal-img').src = product.img;
    document.getElementById('modal-category').textContent = product.category;
    document.getElementById('modal-title').textContent = product.title;
    document.getElementById('modal-price').textContent = formatPriceValueMetrics(product.price);
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
        listWrap.innerHTML = `<p style="opacity:0.5; font-size:12px;">No reviews logged yet for this component.</p>`;
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

const starElements = document.querySelectorAll('#interactive-star-row i');
starElements.forEach(star => {
    star.addEventListener('click', () => {
        if(!activeUser) { showGlassmorphismNotification("Authentication error: Please log in first.", "fa-lock"); return; }
        const clickedRating = parseInt(star.getAttribute('data-rating'));
        const product = productsData.find(p => p.id === selectedActiveProductIdForRating);
        
        product.reviews.push({ user: activeUser.name, rating: clickedRating, text: "Verified customer review logged successfully." });
        renderProductReviewsUI(product);
        
        starElements.forEach((s, idx) => {
            s.className = idx < clickedRating ? "fas fa-star" : "far fa-star";
        });
        showGlassmorphismNotification("Product evaluation review logged successfully.", "fa-star-half-alt");
    });
});

function resetStarIconsRowState() { starElements.forEach(s => s.className = "far fa-star"); }

/* ==========================================================================
   PREMIUM LIVE INVOICE GENERATOR & SIMULATED SETTLEMENT SYSTEMS
   ========================================================================== */
const paymentOverlay = document.getElementById('payment-overlay');
const checkoutTriggerBtn = document.getElementById('checkout-trigger-btn');
const pStepForm = document.getElementById('payment-step-form');
const pStepProcessing = document.getElementById('payment-step-processing');
const pStepSuccess = document.getElementById('payment-step-success');

checkoutTriggerBtn.addEventListener('click', () => {
    if(!activeUser) { showGlassmorphismNotification("Security error: Login profile signature missing.", "fa-user-lock"); authOverlay.classList.add('open'); return; }
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
    
    const cardNumRaw = document.getElementById('payment-card-number').value.replace(/\s+/g, '');
    const lastFourDigits = cardNumRaw.slice(-4) || "4444";
    const addressString = document.getElementById('payment-shipping-address').value;
    const clientNameInput = document.getElementById('payment-card-name').value;
    
    // Core transactional reference parameters generation loop block
    const trackingReferenceTokenID = "LUX-" + Math.floor(100000 + Math.random() * 900000);
    const calculatedFinalBillingPillValue = cartTotalElement.textContent;
    const subtotalTextVal = cartSubtotalElement.textContent;
    const discountTextVal = cartDiscountElement.textContent;
    
    // Creating live operational deep snapshot database structural memory mapping references
    const activeInvoiceSnapshotObj = {
        trackingId: trackingReferenceTokenID,
        clientName: clientNameInput,
        clientMobile: activeUser.phone || "7325996774",
        clientEmail: activeUser.email,
        address: addressString,
        cardLastFour: lastFourDigits,
        couponApplied: currentAppliedCouponString,
        subtotal: subtotalTextVal,
        discount: discountTextVal,
        totalPayable: calculatedFinalBillingPillValue,
        purchasedItems: globalCart.map(i => ({ title: i.title, qty: i.quantity, prc: i.price }))
    };
    
    // Push tracking history data references arrays block
    systemInvoicesLogs.push(activeInvoiceSnapshotObj);
    localStorage.setItem("luxora_db_invoices", JSON.stringify(systemInvoicesLogs));
    
    // Injecting customized layout structural engine to markup inner elements node container layer
    injectPremiumInvoiceMarkupTemplateView(activeInvoiceSnapshotObj);

    setTimeout(() => {
        pStepProcessing.style.display = 'none';
        pStepSuccess.style.display = 'block';
        globalCart = [];
        localStorage.removeItem("luxora_secure_cart");
        updateCartUI();
        showGlassmorphismNotification("Simulated transaction approved successfully.", "fa-clipboard-check");
    }, 2500);
}

function injectPremiumInvoiceMarkupTemplateView(inv) {
    const container = document.getElementById('live-invoice-markup-injector-node');
    
    let itemsTableRowsRows = "";
    inv.purchasedItems.forEach(item => {
        itemsTableRowsRows += `
            <tr>
                <td>${item.title}</td>
                <td>${item.qty}</td>
                <td>${currentCurrencySymbol}${(item.prc * currentCurrencyExchangeRateMultiplier).toFixed(2)}</td>
            </tr>
        `;
    });
    
    container.innerHTML = `
        <div class="invoice-branding-row">
            <div class="inv-logo">Luxora<span>.</span></div>
            <div class="inv-title">Official Tax Invoice</div>
        </div>
        <div class="invoice-meta-grid">
            <div>
                <p><b>Billed To:</b></p>
                <p>${inv.clientName}</p>
                <p>Phone: ${inv.clientMobile}</p>
                <p>Email: ${inv.clientEmail}</p>
                <p>Address: ${inv.address}</p>
            </div>
            <div style="text-align: right;">
                <p><b>Invoice Reference:</b></p>
                <p style="color: #c5a850; font-weight:700;">${inv.trackingId}</p>
                <p><b>Payment Token Mask:</b> **** **** **** ${inv.cardLastFour}</p>
                <p><b>Coupon Authorized:</b> ${inv.couponApplied}</p>
            </div>
        </div>
        <table class="invoice-items-table">
            <thead>
                <tr>
                    <th>Product Model Item</th>
                    <th>Qty</th>
                    <th>Unit Price</th>
                </tr>
            </thead>
            <tbody>
                ${itemsTableRowsRows}
            </tbody>
        </table>
        <div class="invoice-totals-wrap">
            <p>Subtotal Amount: ${inv.subtotal}</p>
            <p>Discounts Deductions: ${inv.discount}</p>
            <p class="inv-final-bold">Grand Total Paid: ${inv.totalPayable}</p>
        </div>
    `;
}

function executeSystemInvoicePrintAction() {
    window.print();
}

function resetPaymentSystemState() {
    paymentOverlay.classList.remove('open');
    pStepForm.style.display = 'block';
    pStepProcessing.style.display = 'none';
    pStepSuccess.style.display = 'none';
    document.getElementById('fake-checkout-form').reset();
    appliedDiscountRate = 0;
    currentAppliedCouponString = "NONE";
    document.getElementById('promo-msg-feedback').textContent = "";
    document.getElementById('coupon-code-input').value = "";
}

/* ==========================================================================
   LIVE INTEGRATED PROFESSIONAL EMAILJS CONTACT PIPELINE ENGINE
   ========================================================================== */
function attachLiveContactEmailJSEngine() {
    const form = document.getElementById('live-emailjs-contact-form');
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        
        const nameVal = document.getElementById('contact-user-name').value;
        const emailVal = document.getElementById('contact-user-email').value;
        const msgVal = document.getElementById('contact-user-message').value;
        
        const templateParametersPayload = {
            from_name: nameVal,
            from_email: emailVal,
            message: msgVal,
            to_name: "Soumyaranjan Muduli"
        };
        
        showGlassmorphismNotification("Transmitting network metadata packets to administrator...", "fa-paper-plane");
        
        emailjs.send("service_qu2c3w9", "template_985331c", templateParametersPayload)
            .then((response) => {
                showGlassmorphismNotification("Message delivered directly to Soumyaranjan Muduli's inbox!", "fa-envelope-circle-check");
                form.reset();
            }, (error) => {
                showGlassmorphismNotification("Transmission stream routing critical error failed.", "fa-circle-xmark");
                console.error("EMAILJS ERROR ENGINE BLOCK LOGS:", error);
            });
    });
}

/* ==========================================================================
   SECURE MANAGER ADMIN PORTAL DASHBOARD CANVAS ARCHITECTURE LAYER
   ========================================================================== */
const adminAuthOverlay = document.getElementById('admin-auth-gate-overlay');
const adminMasterCanvas = document.getElementById('admin-master-dashboard-canvas');

document.getElementById('admin-portal-gate-trigger').addEventListener('click', () => {
    adminAuthOverlay.classList.add('open');
});
document.getElementById('close-admin-auth').addEventListener('click', () => adminAuthOverlay.classList.remove('open'));
document.getElementById('exit-admin-canvas-btn').addEventListener('click', () => adminMasterCanvas.classList.remove('open'));

function verifyAdminAuthTokenGate(event) {
    event.preventDefault();
    const userField = document.getElementById('admin-username-field').value;
    const passField = document.getElementById('admin-password-field').value;
    
    if(userField === "SOUMYA" && passField === "Soumya@7890") {
        adminAuthOverlay.classList.remove('open');
        document.getElementById('admin-login-credential-form').reset();
        
        // Fire rendering arrays dynamic functions mapping layers logs
        populateAdminPanelDashboardDataTables();
        
        adminMasterCanvas.classList.add('open');
        showGlassmorphismNotification("Administrative clearance token approved. Welcome root Soumya.", "fa-unlock-keyhole");
    } else {
        showGlassmorphismNotification("Access Denied: Invalid root authorization keys sequence.", "fa-user-shield");
    }
}

function populateAdminPanelDashboardDataTables() {
    const usersContainerNode = document.getElementById('admin-user-rows-injected-node');
    const invoicesContainerNode = document.getElementById('admin-invoice-rows-injected-node');
    
    usersContainerNode.innerHTML = "";
    systemUsersList.forEach(u => {
        const tr = document.createElement('tr');
        tr.innerHTML = `<td><b>${u.name}</b></td><td>${u.email}</td><td>${u.phone || "7325996774"}</td>`;
        usersContainerNode.appendChild(tr);
    });
    
    invoicesContainerNode.innerHTML = "";
    if(systemInvoicesLogs.length === 0) {
        invoicesContainerNode.innerHTML = `<tr><td colspan="4" style="text-align:center; opacity:0.5;">No active transaction invoice streams cached yet.</td></tr>`;
        return;
    }
    
    systemInvoicesLogs.forEach((inv, index) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><code style="color:#c5a850; font-weight:700;">${inv.trackingId}</code></td>
            <td>${inv.clientName}</td>
            <td><b>${inv.totalPayable}</b></td>
            <td><button class="admin-action-mini-btn" onclick="triggerAdminInvoicePrintLookup(${index})"><i class="fas fa-download"></i> Print / View</button></td>
        `;
        invoicesContainerNode.appendChild(tr);
    });
}

function triggerAdminInvoicePrintLookup(idx) {
    const targetInvoiceSelectedData = systemInvoicesLogs[idx];
    injectPremiumInvoiceMarkupTemplateView(targetInvoiceSelectedData);
    
    adminMasterCanvas.classList.remove('open');
    paymentOverlay.classList.add('open');
    pStepForm.style.display = 'none';
    pStepProcessing.style.display = 'none';
    pStepSuccess.style.display = 'block';
    
    showGlassmorphismNotification(`Loaded tracking data stream context for invoice ${targetInvoiceSelectedData.trackingId}`, "fa-folder-open");
}

// Utility styling filters handlers additions mapping layers hooks
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