// Affiliate links verified for partner AF4265319. Keep the supplied short URLs unchanged.
(() => {
  'use strict';
  const books = [
  {
    "id": "eduwill",
    "title": "2026 에듀윌 한국사능력검정시험 심화 한권끝장",
    "subtitle": "심화 1·2·3급 · 개념과 기출을 한 권으로",
    "url": "https://link.coupang.com/a/hojBQc7WTs",
    "image": "https://thumbnail.coupangcdn.com/thumbnails/remote/640x640ex/image/vendor_inventory/8a1a/7f09afe72c5538638465e3530df6b8e4bd020db015c9fcfa2aa0deb49791.jpg"
  },
  {
    "id": "star",
    "title": "2026 큰별쌤 최태성의 별별한국사 7일의 기적",
    "subtitle": "한국사능력검정시험 심화 1·2·3급",
    "url": "https://link.coupang.com/a/hojCZV7EUS",
    "image": "https://thumbnail.coupangcdn.com/thumbnails/remote/640x640ex/image/retail/images/2024/04/11/15/1/f7d6f578-d39c-4608-8a71-70f866b1ecad.jpg"
  }
];
  const slots = Array.from(document.querySelectorAll('[data-partner-slot]'));
  if (!slots.length) return;
  let start = Math.floor(Math.random() * books.length);
  // Alternate on each page load in this tab. Storage restrictions must not break the quiz.
  try {
    const previous = sessionStorage.getItem('historymaster.partnerBooks.next');
    if (previous === '0' || previous === '1') start = Number(previous);
    sessionStorage.setItem('historymaster.partnerBooks.next', String((start + 1) % books.length));
  } catch (_) {}
  function setBook(slot, index) {
    const book = books[index % books.length];
    const image = slot.querySelector('.partner-books-cover');
    const link = slot.querySelector('.partner-books-link');
    image.src = book.image;
    image.alt = book.title + ' 표지';
    link.href = book.url;
    link.setAttribute('aria-label', book.title + ' 쿠팡에서 보기 (새 창)');
    slot.dataset.partnerBook = book.id;
  }
  slots.forEach((slot, index) => setBook(slot, start + index));

  // Keep the original inline cards as a no-JS and medium-width fallback.
  function copyCard(index) {
    const card = slots[0].cloneNode(true);
    card.removeAttribute('data-partner-slot');
    card.querySelector('.partner-books-cover').hidden = false;
    setBook(card, index);
    return card;
  }
  const rails = document.createElement('div');
  rails.className = 'partner-books-rails';
  rails.hidden = true;
  for (let side = 0; side < books.length; side++) {
    const card = copyCard(start + side);
    card.classList.add(side === 0 ? 'partner-books-left' : 'partner-books-right');
    rails.append(card);
  }
  document.body.append(rails);

  const popup = copyCard(start);
  popup.classList.add('partner-books-popup');
  popup.setAttribute('aria-label', '한국사 교재 광고 팝업');
  popup.hidden = true;
  const popupHeader = document.createElement('div');
  popupHeader.className = 'partner-books-popup-header';
  const popupLabel = document.createElement('span');
  popupLabel.textContent = '광고';
  const closeButton = document.createElement('button');
  closeButton.type = 'button';
  closeButton.className = 'partner-books-close';
  closeButton.textContent = '닫기 ×';
  closeButton.setAttribute('aria-label', '교재 광고 닫기');
  popupHeader.append(popupLabel, closeButton);
  popup.prepend(popupHeader);
  document.body.append(popup);
  document.body.classList.add('partner-books-enhanced');

  const mobile = window.matchMedia('(max-width: 768px)');
  const wide = window.matchMedia('(min-width: 1400px)');
  let ready = false;
  let dismissed = false;
  let previousFocus = null;
  try {
    dismissed = sessionStorage.getItem('historymaster.partnerBooks.popupDismissed') === '1';
  } catch (_) {}

  function learningScreenAllowsAds() {
    const home = document.getElementById('home-screen');
    if (!home) return true;
    return home.classList.contains('active') ||
      Boolean(document.getElementById('result-screen')?.classList.contains('active'));
  }
  function reservePopupSpace() {
    document.body.style.setProperty('--partner-popup-space', popup.hidden ? '0px' : (popup.offsetHeight + 16) + 'px');
  }
  function updatePlacement() {
    const allowed = learningScreenAllowsAds();
    rails.hidden = !wide.matches || !allowed;
    const showPopup = mobile.matches && allowed && ready && !dismissed;
    if (showPopup && popup.hidden) previousFocus = document.activeElement;
    popup.hidden = !showPopup;
    reservePopupSpace();
  }
  function dismissPopup() {
    const restoreFocus = popup.contains(document.activeElement);
    dismissed = true;
    try {
      sessionStorage.setItem('historymaster.partnerBooks.popupDismissed', '1');
    } catch (_) {}
    updatePlacement();
    if (restoreFocus && previousFocus?.isConnected) previousFocus.focus({preventScroll: true});
  }
  closeButton.addEventListener('click', dismissPopup);
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && !popup.hidden) dismissPopup();
  });
  mobile.addEventListener('change', updatePlacement);
  wide.addEventListener('change', updatePlacement);
  const observer = new MutationObserver(updatePlacement);
  document.querySelectorAll('.screen').forEach(screen => {
    observer.observe(screen, {attributes: true, attributeFilter: ['class']});
  });
  if ('ResizeObserver' in window) new ResizeObserver(reservePopupSpace).observe(popup);
  window.addEventListener('pageshow', () => {
    // A page restored from the back/forward cache must respect a later dismissal.
    try {
      dismissed = dismissed || sessionStorage.getItem('historymaster.partnerBooks.popupDismissed') === '1';
    } catch (_) {}
    updatePlacement();
  });
  window.setTimeout(() => { ready = true; updatePlacement(); }, 8000);
  updatePlacement();
})();
