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
  slots.forEach((slot, index) => {
    const book = books[(start + index) % books.length];
    const image = slot.querySelector('.partner-books-cover');
    const link = slot.querySelector('.partner-books-link');
    slot.querySelector('.partner-books-title').textContent = book.title;
    slot.querySelector('.partner-books-subtitle').textContent = book.subtitle;
    image.src = book.image;
    image.alt = book.title + ' 표지';
    image.addEventListener('error', () => { image.hidden = true; });
    link.href = book.url;
    link.setAttribute('aria-label', book.title + ' 쿠팡에서 보기 (새 창)');
    slot.dataset.partnerBook = book.id;
  });
})();
