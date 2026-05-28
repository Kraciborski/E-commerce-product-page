const menuOpen = document.getElementById('menuOpen');
const menuClose = document.getElementById('menuClose');
const navLinks = document.getElementById('navLinks');
const menuOverlay = document.getElementById('menuOverlay');

function toggleMenu() {
  navLinks.classList.toggle('active');
  menuOverlay.classList.toggle('active');
}

menuOpen.addEventListener('click', toggleMenu);
menuClose.addEventListener('click', toggleMenu);
menuOverlay.addEventListener('click', toggleMenu);

const cartToggle = document.getElementById('cartToggle');
const cartDropdown = document.getElementById('cartDropdown');

cartToggle.addEventListener('click', (e) => {
  cartDropdown.classList.toggle('active');
  e.stopPropagation();
});

document.addEventListener('click', (e) => {
  if (!cartDropdown.contains(e.target) && !cartToggle.contains(e.target)) {
    cartDropdown.classList.remove('active');
  }
});

let currentImageIndex = 1;
const mainImg = document.getElementById('mainImg');
const thumbnailBtns = document.querySelectorAll('.thumbnail-btn');
const mobilePrev = document.getElementById('mobilePrev');
const mobileNext = document.getElementById('mobileNext');

function updateGallery(index) {
  currentImageIndex = index;
  mainImg.src = `./images/image-product-${currentImageIndex}.jpg`;
  
  thumbnailBtns.forEach(btn => {
    if (parseInt(btn.dataset.index) === currentImageIndex) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
}

thumbnailBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    updateGallery(parseInt(btn.dataset.index));
  });
});

mobilePrev.addEventListener('click', () => {
  let index = currentImageIndex - 1 < 1 ? 4 : currentImageIndex - 1;
  updateGallery(index);
});

mobileNext.addEventListener('click', () => {
  let index = currentImageIndex + 1 > 4 ? 1 : currentImageIndex + 1;
  updateGallery(index);
});

const lightbox = document.getElementById('lightbox');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxMainImg = document.getElementById('lightboxMainImg');
const lightboxThumbs = document.querySelectorAll('.lightbox-thumb');
const lightboxPrev = document.getElementById('lightboxPrev');
const lightboxNext = document.getElementById('lightboxNext');
let currentLightboxIndex = 1;

function updateLightbox(index) {
  currentLightboxIndex = index;
  lightboxMainImg.src = `./images/image-product-${currentLightboxIndex}.jpg`;
  
  lightboxThumbs.forEach(thumb => {
    if (parseInt(thumb.dataset.index) === currentLightboxIndex) {
      thumb.classList.add('active');
    } else {
      thumb.classList.remove('active');
    }
  });
}

mainImg.addEventListener('click', () => {
  if (window.innerWidth >= 850) {
    updateLightbox(currentImageIndex);
    lightbox.classList.add('active');
  }
});

lightboxClose.addEventListener('click', () => {
  lightbox.classList.remove('active');
});

lightboxThumbs.forEach(thumb => {
  thumb.addEventListener('click', () => {
    updateLightbox(parseInt(thumb.dataset.index));
  });
});

lightboxPrev.addEventListener('click', () => {
  let index = currentLightboxIndex - 1 < 1 ? 4 : currentLightboxIndex - 1;
  updateLightbox(index);
});

lightboxNext.addEventListener('click', () => {
  let index = currentLightboxIndex + 1 > 4 ? 1 : currentLightboxIndex + 1;
  updateLightbox(index);
});

lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) {
    lightbox.classList.remove('active');
  }
});

let localQty = 0;
let cartQty = 0;
const qtyValue = document.getElementById('qtyValue');
const qtyMinus = document.getElementById('qtyMinus');
const qtyPlus = document.getElementById('qtyPlus');
const addToCartBtn = document.getElementById('addToCart');
const cartBadge = document.getElementById('cartBadge');
const cartContent = document.getElementById('cartContent');

qtyPlus.addEventListener('click', () => {
  localQty++;
  qtyValue.textContent = localQty;
});

qtyMinus.addEventListener('click', () => {
  if (localQty > 0) {
    localQty--;
    qtyValue.textContent = localQty;
  }
});

function updateCartDOM() {
  if (cartQty === 0) {
    cartBadge.style.display = 'none';
    cartContent.innerHTML = '<p class="cart-empty">Your cart is empty.</p>';
  } else {
    cartBadge.style.display = 'block';
    cartBadge.textContent = cartQty;
    
    const totalPrice = (125.00 * cartQty).toFixed(2);
    cartContent.innerHTML = `
      <div class="cart-item">
        <img src="./images/image-product-1-thumbnail.jpg" alt="" class="cart-item__thumb">
        <div>
          <p class="cart-item__title">Fall Limited Edition Sneakers</p>
          <p>$125.00 x ${cartQty}<span class="cart-item__total">$${totalPrice}</span></p>
        </div>
        <button class="cart-item__delete" id="deleteCartItem" aria-label="Delete item">
          <img src="./images/icon-delete.svg" alt="">
        </button>
      </div>
      <button class="checkout-btn">Checkout</button>
    `;
    
    document.getElementById('deleteCartItem').addEventListener('click', () => {
      cartQty = 0;
      updateCartDOM();
    });
  }
}

addToCartBtn.addEventListener('click', () => {
  if (localQty > 0) {
    cartQty += localQty;
    localQty = 0;
    qtyValue.textContent = localQty;
    updateCartDOM();
  }
});
