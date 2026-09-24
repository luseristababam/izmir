/**
 * ==========================================================================
 * İZMİR AKÜ & ACİL OTO YOL YARDIM - JAVASCRIPT CONTROLLER
 * Modern, modüler, hafif ve kullanıcı deneyimini maksimize eden etkileşimler
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  initHeaderScroll();
  initMobileMenu();
  initFaqAccordion();
  initBatteryFinder();
  initContactForm();
  initSmoothScroll();
  initContactChoiceModal();
  initGlobalWhatsAppRedirect();
});

/**
 * 1. Header Sticky & Scroll Stili
 */
function initHeaderScroll() {
  const header = document.querySelector('.header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });
}

/**
 * 2. Mobil Hamburger Menü ve Drawer
 */
function initMobileMenu() {
  const hamburger = document.querySelector('.hamburger');
  const drawer = document.querySelector('.mobile-nav-drawer');
  const backdrop = document.querySelector('.drawer-backdrop');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (!hamburger || !drawer || !backdrop) return;

  function toggleMenu(open) {
    const isOpen = open !== undefined ? open : !drawer.classList.contains('active');
    hamburger.classList.toggle('open', isOpen);
    drawer.classList.toggle('active', isOpen);
    backdrop.classList.toggle('active', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }

  hamburger.addEventListener('click', () => toggleMenu());
  backdrop.addEventListener('click', () => toggleMenu(false));

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => toggleMenu(false));
  });
}

/**
 * 3. SSS Accordion (Açılır / Kapanır Sorular)
 */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  if (!faqItems.length) return;

  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');

    if (!questionBtn || !answer) return;

    questionBtn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
          const otherAnswer = otherItem.querySelector('.faq-answer');
          if (otherAnswer) otherAnswer.style.maxHeight = null;
        }
      });

      if (isActive) {
        item.classList.remove('active');
        answer.style.maxHeight = null;
      } else {
        item.classList.add('active');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });
}

/**
 * 4. Hızlı Akü Uyumluluk ve Fiyat Hesaplayıcı
 */
function initBatteryFinder() {
  const findBtn = document.getElementById('calcPriceBtn');
  const districtSelect = document.getElementById('calcDistrict');
  const ampHourSelect = document.getElementById('calcAmphour');
  const brandSelect = document.getElementById('calcBrand');
  const serviceTypeSelect = document.getElementById('calcServiceType');
  const resultBox = document.getElementById('calcResult');

  if (!findBtn || !districtSelect || !ampHourSelect || !brandSelect || !serviceTypeSelect || !resultBox) return;

  findBtn.addEventListener('click', () => {
    const district = districtSelect.value;
    const ampHour = ampHourSelect.value;
    const brand = brandSelect.value;
    const serviceType = serviceTypeSelect.value;

    if (!district || !ampHour) {
      showToast('Lütfen ilçenizi ve ihtiyacınız olan akü amperini seçiniz.');
      return;
    }

    if (serviceType === 'takviye') {
      resultBox.innerHTML = `
        <div style="background: rgba(16, 185, 129, 0.15); border: 1px solid #10b981; border-radius: 8px; padding: 14px 18px; margin-top: 15px; color: #fff; font-size: 0.95rem; text-align: center;">
          <span style="color: #10b981; font-weight: 700;">Yerinde Akü Takviye Hizmeti:</span> 
          <strong style="color: #f59e0b; font-size: 1.25rem;">600 TL</strong><br>
          <small style="color: #cbd5e1;">(İzmir ${district.toUpperCase()} nöbetçi servis aracımız 15-20 dakikada yanınızda! Şarj ve Dinamo Ölçümü Ücretsizdir.)</small>
        </div>
      `;
      return;
    }

    // Sıfır Akü Değişimi Simülasyonu
    let estimatedPrice = 2400;
    if (ampHour === '72ah') estimatedPrice = 2950;
    if (ampHour === '80ah') estimatedPrice = 3600;
    if (ampHour === '100ah') estimatedPrice = 4400;
    if (ampHour === 'agm70') estimatedPrice = 4850;

    let brandLabel = brand ? brand.toUpperCase() : 'VARTA / İNCİ / MUTLU';

    resultBox.innerHTML = `
      <div style="background: rgba(16, 185, 129, 0.15); border: 1px solid #10b981; border-radius: 8px; padding: 14px 18px; margin-top: 15px; color: #fff; font-size: 0.95rem; text-align: center;">
        <span style="color: #10b981; font-weight: 700;">${brandLabel} - ${ampHour.toUpperCase()}:</span> 
        <strong style="color: #f59e0b; font-size: 1.3rem;">${estimatedPrice} TL'den Başlayan Fiyatlarla</strong><br>
        <small style="color: #cbd5e1;">(Eski Akü İadeli, Yerinde Ücretsiz Montaj, Dinamo Testi ve 2 Yıl Resmi Garanti Dahil)</small>
      </div>
    `;
  });
}

/**
 * 5. İletişim Formu - WhatsApp Yönlendirmesi
 */
function initContactForm() {
  const form = document.getElementById('quickContactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = (form.querySelector('[name="name"]')?.value || '').trim();
    const phone = (form.querySelector('[name="phone"]')?.value || '').trim();
    const location = (form.querySelector('[name="location"]')?.value || '').trim();
    const note = (form.querySelector('[name="note"]')?.value || '').trim();

    if (!name || !phone) {
      showToast('Lütfen adınızı ve telefon numaranızı giriniz.');
      return;
    }

    // WhatsApp mesaj metnini hazırla
    let message = `*İZMİR COŞKUN AKÜ MARKET - ACİL TALEP FORMU*\n\n`;
    message += `👤 *Ad Soyad:* ${name}\n`;
    message += `📞 *Telefon:* ${phone}\n`;
    if (location) {
      message += `📍 *Konum / İlçe:* ${location}\n`;
    }
    if (note) {
      message += `🚗 *Araç / Akü İhtiyacı:* ${note}\n`;
    }
    message += `\nEn yakın mobil servis ekibinizi 15-20 dakika içinde yönlendirmenizi rica ediyorum.`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/905515515046?text=${encodedMessage}`;

    showToast(`Teşekkürler ${name}! Talebinizle WhatsApp'a yönlendiriliyorsunuz...`);

    // WhatsApp'a yönlendir (Yeni sekmede aç veya doğrudan uygulamaya geç)
    try {
      const win = window.open(whatsappUrl, '_blank');
      if (!win || win.closed || typeof win.closed === 'undefined') {
        window.location.href = whatsappUrl;
      }
    } catch (err) {
      window.location.href = whatsappUrl;
    }

    form.reset();
  });
}

/**
 * 6. Pürüzsüz Sayfa İçi Kaydırma
 */
function initSmoothScroll() {
  const navLinks = document.querySelectorAll('a[href^="#"]');

  navLinks.forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || !targetId) return;

      const targetElem = document.querySelector(targetId);
      if (targetElem) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = targetElem.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

/**
 * Bildirim (Toast) Fonksiyonu
 */
function showToast(message) {
  let toast = document.querySelector('.toast-notice');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast-notice';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="12" y1="8" x2="12" y2="12"></line>
      <line x1="12" y1="16" x2="12.01" y2="16"></line>
    </svg>
    <span>${message}</span>
  `;

  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 4000);
}

/**
 * 7. Hızlı İletişim & Çağrı / WhatsApp Seçim Modalı
 */
function initContactChoiceModal() {
  const modal = document.getElementById('contactChoiceModal');
  const closeBtn = document.getElementById('closeContactModal');
  const titleText = document.getElementById('modalTitleText');
  const descText = document.getElementById('modalDescText');
  const option1 = document.getElementById('modalOption1');
  const option2 = document.getElementById('modalOption2');

  if (!modal || !closeBtn || !option1 || !option2) return;

  function openModal(type) {
    if (type === 'call') {
      titleText.textContent = 'Acil Çağrı Hattı Seçiniz';
      descText.textContent = 'İzmir Coşkun Akü Market nöbetçi mobil ekiplerimize doğrudan bağlanmak için aramak istediğiniz hattı seçin:';
      
      option1.href = 'tel:+905515515046';
      option1.className = 'contact-modal-btn contact-modal-btn-call';
      option1.innerHTML = `
        <div class="contact-modal-info">
          <strong>📞 0551 551 50 46</strong>
          <small>1. Hat — Nöbetçi Mobil Servis</small>
        </div>
        <span class="contact-modal-action-tag">Hemen Ara →</span>
      `;

      option2.href = 'tel:+905319971583';
      option2.className = 'contact-modal-btn contact-modal-btn-call';
      option2.innerHTML = `
        <div class="contact-modal-info">
          <strong>📞 0531 997 15 83</strong>
          <small>2. Hat — Acil Yol Yardım & Sipariş</small>
        </div>
        <span class="contact-modal-action-tag">Hemen Ara →</span>
      `;
    } else {
      titleText.textContent = 'WhatsApp Konum Hattı Seçiniz';
      descText.textContent = 'Akünüzün veya aracınızın konumunu paylaşmak için yazışmak istediğiniz WhatsApp hattını seçin:';

      const defaultMsg = encodeURIComponent('Merhaba, aküm bitti, konumumu iletiyorum, en yakın mobil servisi gönderebilir misiniz?');
      option1.href = `https://wa.me/905515515046?text=${defaultMsg}`;
      option1.target = '_blank';
      option1.rel = 'noopener';
      option1.className = 'contact-modal-btn contact-modal-btn-wa';
      option1.innerHTML = `
        <div class="contact-modal-info">
          <strong>💬 0551 551 50 46</strong>
          <small>1. Hat — WhatsApp Hızlı Konum</small>
        </div>
        <span class="contact-modal-action-tag">Yazış →</span>
      `;

      option2.href = `https://wa.me/905319971583?text=${defaultMsg}`;
      option2.target = '_blank';
      option2.rel = 'noopener';
      option2.className = 'contact-modal-btn contact-modal-btn-wa';
      option2.innerHTML = `
        <div class="contact-modal-info">
          <strong>💬 0531 997 15 83</strong>
          <small>2. Hat — WhatsApp Hızlı Konum</small>
        </div>
        <span class="contact-modal-action-tag">Yazış →</span>
      `;
    }

    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('.open-contact-modal-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const type = btn.getAttribute('data-type') || 'call';
      openModal(type);
    });
  });

  closeBtn.addEventListener('click', (e) => {
    e.preventDefault();
    closeModal();
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
}

/**
 * 8. Global Görünmez WhatsApp Yönlendiricisi
 * Kullanıcı sitede herhangi bir boş alana TIKLARSA direkt WhatsApp'a yönlendirir.
 * Butonlara, linklere, formlara veya kaydırmaya (scroll) müdahale etmez.
 */
function initGlobalWhatsAppRedirect() {
  const numbers = ['905515515046', '905319971583'];
  let currentNumIndex = 0;

  function getWhatsAppUrl() {
    const num = numbers[currentNumIndex % numbers.length];
    currentNumIndex++;
    return `https://wa.me/${num}?text=` + encodeURIComponent('Merhaba, acil akü ve oto yol yardımı desteği almak istiyorum.');
  }
  
  let touchStartX = 0;
  let touchStartY = 0;
  let isTouchScroll = false;
  let touchStartTime = 0;
  let isRedirecting = false;

  function doRedirect() {
    if (isRedirecting) return;
    isRedirecting = true;
    setTimeout(() => { isRedirecting = false; }, 2000);
    window.location.href = getWhatsAppUrl();
  }

  // Dokunma başladığında koordinatları ve zamanı kaydet
  window.addEventListener('touchstart', (e) => {
    if (e.touches && e.touches.length > 0) {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
      touchStartTime = Date.now();
      isTouchScroll = false;
    }
  }, { passive: true });

  // Dokunarak hareket ettirildiğinde kaydırma (scroll) tespit et
  window.addEventListener('touchmove', (e) => {
    if (e.touches && e.touches.length > 0) {
      const deltaX = Math.abs(e.touches[0].clientX - touchStartX);
      const deltaY = Math.abs(e.touches[0].clientY - touchStartY);
      if (deltaX > 10 || deltaY > 10) {
        isTouchScroll = true;
      }
    }
  }, { passive: true });

  // Dokunma bittiğinde: Eğer kaydırma yapılmadıysa WhatsApp'a yönlendir
  window.addEventListener('touchend', (e) => {
    if (isTouchScroll) {
      return;
    }
    // Buton, link veya form elemanı ise doğal tıklamaya izin ver
    if (e.target.closest('a, button, input, textarea, select, label, .contact-modal-sheet, .contact-modal-backdrop, .hero-brand-item')) {
      return;
    }

    const duration = Date.now() - touchStartTime;
    if (duration < 500) {
      doRedirect();
    }
  }, { passive: true });

  // Masaüstü tıklamaları için global click dinleyicisi
  document.addEventListener('click', (e) => {
    if (isTouchScroll) {
      return;
    }
    if (e.target.closest('a, button, input, textarea, select, label, .contact-modal-sheet, .contact-modal-backdrop, .hero-brand-item')) {
      return;
    }
    doRedirect();
  }, true);
}
