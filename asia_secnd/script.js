// ─── DATA ───────────────────────────────────────────────────────
const dishes = [
  {
    id: 1, name: "Ramen z Kurczakiem",
    desc: "Bogaty bulion z korzeniem imbiru, udko z kurczaka w sosie teriyaki, pszeniczne makarony, jajko na twardo, sałata Romano, suszone algi nori, marynowany imbir...",
    price: 42, weight: "Przybliżona waga: 580 g",
    image: "img/kurcz.png", // <- WSTAW ŚCIEŻKĘ DO ZDJĘCIA (np. "images/ramen-kurczak.png")
    proteins: 24.5, fat: 12.3, carbs: 38.2, calories: 387,
    addons: [
      {name:"cebula",price:0},{name:"pieprz",price:1},
      {name:"zielona cebulka",price:2},{name:"sezam",price:1},
      {name:"chili",price:1},{name:"krewetki",price:2}
    ]
  },
  {
    id: 2, name: "Miso Ramen z Krewetkami",
    desc: "Pszeniczne makarony, krewetki, słodka papryka, baby corn, groszek w strąkach, sos Curry, azjatycki sos Pesto, olej aromatyczny, bulion Tom Yam, edamame...",
    price: 48, weight: "Przybliżona waga: 645 g",
    image: "img/second.png",
    proteins: 6.2, fat: 8.3, carbs: 28.6, calories: 213,
    addons: [
      {name:"cebula",price:0},{name:"pieprz",price:1},
      {name:"zielona cebulka",price:2},{name:"sezam",price:1},
      {name:"chili",price:1},{name:"dodatkowe krewetki",price:4}
    ]
  },
  {
    id: 3, name: "Tonkotsu Ramen",
    desc: "Kremowy bulion wieprzowy gotowany 12 godzin, chashu wieprzowe, jajko marynowane ajitsuke tamago, bambusowe pędy menma, grzyby shiitake, makaron ramen...",
    price: 52, weight: "Przybliżona waga: 620 g",
    image: "img/third.png",
    proteins: 28.4, fat: 18.6, carbs: 32.1, calories: 412,
    addons: [
      {name:"cebula",price:0},{name:"pieprz",price:1},
      {name:"zielona cebulka",price:2},{name:"sezam",price:1},
      {name:"masło Keewpie",price:2},{name:"dodatkowe mięso",price:6}
    ]
  },
  {
    id: 5, name: "Gyoza z Wieprzowiną",
    desc: "Ręcznie lepione pierożki gyoza z mieloną wieprzowiną, kapustą pekińską, imbirem i czosnkiem. Smażone na złoto, podane z dipem ponzu i sos rayu...",
    price: 32, weight: "Przybliżona waga: 320 g (8 szt.)",
    image: "img/fourth.png",
    proteins: 18.4, fat: 16.2, carbs: 22.8, calories: 305,
    addons: [
      {name:"sos ponzu",price:0},{name:"sos chili",price:0},
      {name:"sos sojowy",price:0},{name:"sos sezamowy",price:1},
      {name:"dodatkowe 4 szt.",price:8},{name:"imbir marynowany",price:0}
    ]
  },
  {
    id: 6, name: "Tempura z Krewetek",
    desc: "Krewetki ebi w puszystym cieście tempura, smażone do chrupkości, podane z lekkim bulionem tentsuyu i rzodkwią daikon. Podawane z ryżem lub bez...",
    price: 45, weight: "Przybliżona waga: 380 g (6 szt.)",
    image: "img/fifth.png",
    proteins: 22.6, fat: 10.4, carbs: 28.9, calories: 295,
    addons: [
      {name:"sos tentsuyu",price:0},{name:"sos sweet chili",price:0},
      {name:"daikon tarty",price:1},{name:"sezam",price:1},
      {name:"ryż sushi",price:6},{name:"warzywa tempura",price:6}
    ]
  },
  {
    id: 7, name: "Sushi Moriawase",
    desc: "Zestaw 12 sztuk sushi: nigiri z łososiem, tuńczykiem i krewetką, maki z ogórkiem i awokado, uramaki spicy tuna. Podawane z wasabi, imbirem i sosem sojowym...",
    price: 68, weight: "Przybliżona waga: 420 g (12 szt.)",
    image: "img/sixth.png",
    proteins: 32.1, fat: 8.6, carbs: 52.4, calories: 410,
    addons: [
      {name:"wasabi extra",price:0},{name:"imbir marynowany",price:0},
      {name:"sos sojowy",price:0},{name:"sos unagi",price:1},
      {name:"nigiri +2 szt.",price:10},{name:"sake do zestawu",price:12}
    ]
  },
];

const beverages = [
  {name:"Herbata Matcha Latte",price:14},
  {name:"Ramune Melon",price:8},
  {name:"Sake Ciepłe",price:18},
  {name:"Miso Soup",price:10},
  {name:"Piwo Sapporo",price:16},
  {name:"Zielona Herbata Sencha",price:10},
];

const mochis = [
  {name:"Mochi Truskawkowe",price:8},
  {name:"Mochi Matcha",price:8},
  {name:"Mochi Mango",price:8},
  {name:"Mochi Czekoladowe",price:10},
  {name:"Daifuku z Czerwoną Fasolą",price:9},
  {name:"Zestaw 3 Mochi (wybór)",price:22},
];

// ─── MARQUEE ────────────────────────────────────────────────────
const SVG_STAR = `<svg class="m-svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>`;
const SVG_FLOWER = `<svg class="m-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.93 4.93l2.12 2.12M16.95 16.95l2.12 2.12M4.93 19.07l2.12-2.12M16.95 7.05l2.12-2.12"/></svg>`;
const SVG_BOWL = `<svg class="m-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 11c0 5.5 4 9 9 9s9-3.5 9-9"/><path d="M3 11h18"/><path d="M9 4c0 0 .5 2-1 3M13 3c0 0 .5 2-1 3"/></svg>`;
const SVG_LEAF = `<svg class="m-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`;
const SVG_TORII = `<svg class="m-svg" viewBox="0 0 24 24" fill="currentColor" opacity=".8"><rect x="1" y="5" width="22" height="2.5" rx="1.25"/><rect x="3" y="9" width="18" height="2" rx="1"/><rect x="5.5" y="11" width="2.2" height="12" rx="1.1"/><rect x="16.3" y="11" width="2.2" height="12" rx="1.1"/></svg>`;
const marqItems = [
  "Z MIŁOŚCIĄ", SVG_STAR, "おいしい", SVG_FLOWER, "JAPOŃSKA KUCHNIA", SVG_LEAF,
  "和食", SVG_TORII, "AUTENTYCZNY SMAK", SVG_STAR, "ありがとう", SVG_FLOWER,
  "SAKURA HOUSE", SVG_LEAF, "桜", SVG_BOWL, "ŚWIEŻE SKŁADNIKI", SVG_STAR,
  "麺", SVG_TORII, "TOKYO STYLE", SVG_FLOWER, "旨い", SVG_LEAF
];
const track = document.getElementById('marqueeTrack');
[...marqItems, ...marqItems].forEach(t => {
  const el = document.createElement('span');
  el.className = 'm-item';
  el.innerHTML = t.startsWith('<svg') ? t : `${t}<span class="m-dot"></span>`;
  track.appendChild(el);
});

// ─── CART STATE ──────────────────────────────────────────────────
let cart = [];
let activeDish = null;

// ─── RENDER DISHES ───────────────────────────────────────────────
const grid = document.getElementById('dishesGrid');
dishes.forEach((dish, i) => {
  const card = document.createElement('div');
  card.className = 'dish-card';
  card.style.transitionDelay = `${i * 0.07}s`;
  card.innerHTML = `
    <div class="dish-img-wrap">
      <img class="dish-img" src="${dish.image}" alt="${dish.name}" loading="lazy" onerror="this.style.background='#F0C4BA'">
    </div>
    <div class="dish-body">
      <div class="dish-name">${dish.name}</div>
      <div class="dish-desc">${dish.desc}</div>
      <div class="dish-foot">
        <span class="dish-price-tag">${dish.price} zł</span>
        <div class="dish-foot-divider"></div>
        <button class="add-to-cart-btn" data-id="${dish.id}">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          DODAJ DO KOSZYKA
        </button>
      </div>
    </div>`;
  card.querySelector('.add-to-cart-btn').addEventListener('click', e => {
    e.stopPropagation();
    addToCart(dish, []);
    flashBtn(e.currentTarget);
  });
  card.addEventListener('click', () => openModal(dish));
  grid.appendChild(card);
});

// ─── MODAL ───────────────────────────────────────────────────────
function openModal(dish) {
  activeDish = dish;
  document.getElementById('mImg').src = dish.image;
  document.getElementById('mName').textContent = dish.name;
  document.getElementById('mDesc').textContent = dish.desc;
  document.getElementById('mWeight').textContent = dish.weight;
  document.getElementById('mPrice').textContent = `${dish.price} zł`;
  document.getElementById('mNutrition').innerHTML = `
    <div class="nut-box"><div class="nut-lbl">Białka</div><div class="nut-val">${dish.proteins} g</div></div>
    <div class="nut-box"><div class="nut-lbl">Tłuszcze</div><div class="nut-val">${dish.fat} g</div></div>
    <div class="nut-box"><div class="nut-lbl">Węglowodany</div><div class="nut-val">${dish.carbs} g</div></div>
    <div class="nut-box"><div class="nut-lbl">Kalorie</div><div class="nut-val">${dish.calories} kcal</div></div>`;
  buildAddonGrid('gridDodatki', dish.addons);
  buildAddonGrid('gridNapoje', beverages);
  buildAddonGrid('gridMochi', mochis);
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
  document.querySelector('[data-tab="dodatki"]').classList.add('active');
  document.getElementById('tab-dodatki').classList.add('active');
  document.getElementById('overlay').classList.add('open');
  document.getElementById('modal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function buildAddonGrid(id, items) {
  document.getElementById(id).innerHTML = items.map(a => `
    <label class="addon-row">
      <input type="checkbox" value="${a.name}" data-price="${a.price}">
      <span class="addon-name">${a.name}</span>
      <span class="addon-price">${a.price === 0 ? 'gratis' : `+${a.price}`}</span>
    </label>`).join('');
}

function closeModal() {
  document.getElementById('overlay').classList.remove('open');
  document.getElementById('modal').classList.remove('open');
  document.body.style.overflow = '';
  activeDish = null;
}

document.getElementById('modalClose').addEventListener('click', closeModal);
document.getElementById('overlay').addEventListener('click', closeModal);
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

document.getElementById('mAddBtn').addEventListener('click', () => {
  if (!activeDish) return;
  const addons = [...document.querySelectorAll('#modal input[type="checkbox"]:checked')]
    .map(cb => ({ name: cb.value, price: parseFloat(cb.dataset.price) }));
  addToCart(activeDish, addons);
  closeModal();
});

document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById('tab-' + btn.dataset.tab).classList.add('active');
  });
});

// ─── CART ────────────────────────────────────────────────────────
function addToCart(dish, addons) {
  const addonsTotal = addons.reduce((s, a) => s + a.price, 0);
  const key = dish.id + '|' + addons.map(a => a.name).join(',');
  const existing = cart.find(i => i._key === key);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({ ...dish, addons, addonsTotal, qty: 1, _key: key });
  }
  renderCart();
  updateBadge();
  showToast(`${dish.name} dodano do koszyka!`);
}

function renderCart() {
  const body = document.getElementById('cartBody');
  const foot = document.getElementById('cartFoot');
  if (!cart.length) {
    body.innerHTML = '<div class="cart-empty-state"><svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--red)" stroke-width="1.4" opacity=".4"><path d="M3 11c0 5.5 4 9 9 9s9-3.5 9-9"/><path d="M3 11h18"/><path d="M9 4c0 0 .5 2-1 3M13 3c0 0 .5 2-1 3"/></svg><p>Koszyk jest pusty</p></div>';
    foot.style.display = 'none';
    return;
  }
  foot.style.display = 'block';
  body.innerHTML = cart.map((item, i) => `
    <div class="c-item">
      <img class="c-item-img" src="${item.image}" alt="${item.name}" onerror="this.style.background='#F0C4BA'">
      <div class="c-item-info">
        <div class="c-item-name">${item.name}</div>
        ${item.addons.length ? `<div class="c-item-addons">${item.addons.map(a=>a.name).join(', ')}</div>` : ''}
        <div class="c-item-controls">
          <button class="qty-btn" onclick="changeQty(${i},-1)">−</button>
          <span class="qty-val">${item.qty}</span>
          <button class="qty-btn" onclick="changeQty(${i},1)">+</button>
        </div>
      </div>
      <div class="c-item-price">${(item.price + item.addonsTotal) * item.qty} zł</div>
    </div>`).join('');
  const sub = cart.reduce((s, i) => s + (i.price + i.addonsTotal) * i.qty, 0);
  const del = sub >= 80 ? 0 : 8;
  document.getElementById('sumProducts').textContent = `${sub} zł`;
  document.getElementById('sumDelivery').textContent = del ? `${del} zł` : 'Gratis 🎉';
  document.getElementById('sumTotal').textContent = `${sub + del} zł`;
}

function changeQty(i, d) {
  cart[i].qty += d;
  if (cart[i].qty <= 0) cart.splice(i, 1);
  renderCart();
  updateBadge();
}

function updateBadge() {
  const total = cart.reduce((s, i) => s + i.qty, 0);
  const badge = document.getElementById('cartBadge');
  badge.textContent = total;
  badge.classList.toggle('show', total > 0);
}

function placeOrder() {
  showToast('🎉 Dziękujemy! Zamówienie przyjęte. Dostawa za ~35 min.');
  cart = [];
  renderCart();
  updateBadge();
  document.getElementById('cartSidebar').classList.remove('open');
}

document.getElementById('cartToggle').addEventListener('click', () => {
  document.getElementById('cartSidebar').classList.toggle('open');
});
document.getElementById('cartClose').addEventListener('click', () => {
  document.getElementById('cartSidebar').classList.remove('open');
});

// ─── TOAST ───────────────────────────────────────────────────────
let toastTimer;
function showToast(msg) {
  const t = document.getElementById('toast');
  document.getElementById('toastMsg').textContent = msg;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 2800);
}

// ─── FLASH BUTTON ────────────────────────────────────────────────
function flashBtn(btn) {
  const orig = btn.innerHTML;
  btn.innerHTML = '✓ DODANO';
  btn.style.background = 'var(--red)';
  btn.style.color = '#fff';
  setTimeout(() => {
    btn.innerHTML = orig;
    btn.style.background = '';
    btn.style.color = '';
  }, 1600);
}

// ─── HAMBURGER ───────────────────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
});
function closeMobileMenu() {
  hamburger.classList.remove('open');
  mobileMenu.classList.remove('open');
}

// ─── NAV SCROLL ──────────────────────────────────────────────────
window.addEventListener('scroll', () => {
  document.getElementById('nav').classList.toggle('scrolled', scrollY > 40);
});

// ─── SCROLL REVEAL ───────────────────────────────────────────────
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in'); });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal, .dish-card').forEach(el => revealObs.observe(el));

// ─── DELIVERY / TAKEAWAY SELECTOR ───────────────────────────────
function selectDelivery(type) {
  document.getElementById('optDelivery')?.classList.toggle('active', type === 'delivery');
  document.getElementById('optTakeaway')?.classList.toggle('active', type === 'takeaway');
  document.getElementById('optDineIn')?.classList.toggle('active', type === 'dinein');
  if (type === 'dinein') openReservation();
}
// default selection
selectDelivery('delivery');

// ─── RESERVATION MODAL ───────────────────────────────────────────
const resModal = document.getElementById('resModal');
const resOverlay = document.getElementById('overlay');

function openReservation() {
  resModal.classList.add('open');
  resOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeReservation() {
  resModal.classList.remove('open');
  resOverlay.classList.remove('open');
  document.body.style.overflow = '';
  document.getElementById('resFullMsg').style.display = 'none';
  document.getElementById('resSubmitBtn').style.display = '';
}

document.getElementById('resClose').addEventListener('click', closeReservation);
resOverlay.addEventListener('click', () => {
  closeReservation();
  if (document.getElementById('modal').classList.contains('open')) closeModal();
});
document.addEventListener('keydown', e => { if (e.key === 'Escape') { closeReservation(); } });

document.getElementById('resDate').min = new Date().toISOString().split('T')[0];

document.getElementById('resSubmitBtn').addEventListener('click', () => {
  document.getElementById('resFullMsg').style.display = 'block';
  document.getElementById('resSubmitBtn').style.display = 'none';
});

// ─── GUEST PICKER (modal) ─────────────────────────────────────────
let guests2 = 2;
const guestCount2 = document.getElementById('guestCount2');
document.getElementById('guestMinus2')?.addEventListener('click', () => {
  if (guests2 > 1) { guests2--; guestCount2.textContent = guests2; }
});
document.getElementById('guestPlus2')?.addEventListener('click', () => {
  if (guests2 < 20) { guests2++; guestCount2.textContent = guests2; }
});
