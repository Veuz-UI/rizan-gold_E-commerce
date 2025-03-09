//jquery

$(function () {
    count = -1; // start with -1
    initText = " all of this ";  //set your init text here
    wordsArray = ["Online Shop ! ", "Online Store !", "Online Collections!"]; //change this text items to your own
    
    $("#word").text(initText).delay(4000);
    
    setInterval(function () {
      count++;
      $("#word").fadeOut(400, function () {
        $(this).text(wordsArray[count % wordsArray.length]).fadeIn(400);
      });
    }, 1500); // set interval time
  });
  
  
  // Navbar text change
  
  
  // header
  const navbar = document.getElementById('navbar');
  
  window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
          navbar.classList.add('scrolled');
      } else {
          navbar.classList.remove('scrolled');
      }
  });
  
  
  // counter
  
  
  document.addEventListener("DOMContentLoaded", () => {
    const counters = document.querySelectorAll('.counter');
    let hasAnimated = false;
  
    function startCount(counter) {
        const target = parseInt(counter.dataset.target);
        const duration = 10000;
        const increment = target / (duration / 32); // 60fps
        let current = 0;
  
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.ceil(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
  
        counter.textContent = '0';
        updateCounter();
    }
  
    // Create Intersection Observer
    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    };
  
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const countersSection = entry.target;
                const counters = countersSection.querySelectorAll('.counter');
                counters.forEach(counter => {
                    startCount(counter);
                });
            } else {
                // Reset counters when out of view
                const counters = entry.target.querySelectorAll('.counter');
                counters.forEach(counter => {
                    counter.textContent = '0';
                });
            }
        });
    }, options);
  
    // Observe the counter section
    const counterSection = document.querySelector('.counter-section');
    if (counterSection) {
        observer.observe(counterSection);
    }
  });
  
  
  // product category
  document.addEventListener('DOMContentLoaded', function() {
      const tabBtns = document.querySelectorAll('.tab-btn');
      const productItems = document.querySelectorAll('.product-item');
      const grid = document.querySelector('.product-grid');
  
      tabBtns.forEach(btn => {
          btn.addEventListener('click', () => {
              // Remove active class from all buttons
              tabBtns.forEach(btn => btn.classList.remove('active'));
              // Add active class to clicked button
              btn.classList.add('active');
  
              const category = btn.getAttribute('data-category');
  
              // Add transition class to grid
              grid.classList.add('transitioning');
  
              productItems.forEach(item => {
                  // First fade out all items
                  item.style.opacity = '0';
                  item.style.transform = 'scale(0.95)';
              });
  
              // Wait for fade out
              setTimeout(() => {
                  productItems.forEach(item => {
                      if (category === 'all' || item.getAttribute('data-category') === category) {
                          item.classList.remove('hide');
                          // Trigger reflow
                          void item.offsetWidth;
                          item.style.opacity = '1';
                          item.style.transform = 'scale(1)';
                      } else {
                          item.classList.add('hide');
                      }
                  });
                  // Remove transition class
                  grid.classList.remove('transitioning');
              }, 300);
          });
      });
  });
  
  
  
  // cart
  
  
  document.addEventListener('DOMContentLoaded', function() {
      const quantityControls = document.querySelectorAll('.quantity-controls');
  
      quantityControls.forEach(control => {
          const input = control.querySelector('.qty-input');
          const plusBtn = control.querySelector('.plus');
          const minusBtn = control.querySelector('.minus');
  
          plusBtn.addEventListener('click', () => {
              input.value = parseInt(input.value) + 1;
              updateCart();
          });
  
          minusBtn.addEventListener('click', () => {
              if (parseInt(input.value) > 1) {
                  input.value = parseInt(input.value) - 1;
                  updateCart();
              }
          });
  
          input.addEventListener('change', updateCart);
      });
  
      function updateCart() {
          // Add your cart update logic here
          console.log('Cart updated');
      }
  
      // Remove item functionality
      const removeButtons = document.querySelectorAll('.remove-btn');
      removeButtons.forEach(button => {
          button.addEventListener('click', function() {
              const cartItem = this.closest('.cart-item');
              cartItem.style.opacity = '0';
              setTimeout(() => {
                  cartItem.remove();
                  updateCart();
              }, 300);
          });
      });
  });
  
  
  // checkout
  
  document.addEventListener('DOMContentLoaded', function() {
      const form = document.querySelector('.checkout-form form');
      const placeOrderBtn = document.querySelector('.place-order-btn');
  
      if (form && placeOrderBtn) {
          placeOrderBtn.addEventListener('click', function(e) {
              e.preventDefault();
              if (form.checkValidity()) {
                  // Add your order processing logic here
                  alert('Order placed successfully!');
              } else {
                  form.reportValidity();
              }
          });
      }
  
      // Optional: Update totals when shipping method changes
      const shippingOptions = document.querySelectorAll('[name="shipping"]');
      shippingOptions.forEach(option => {
          option.addEventListener('change', updateTotals);
      });
  
      function updateTotals() {
          // Add your total calculation logic here
      }
  });
  
  
  
  // product detail
  
  function changeImage(element) {
      document.getElementById('mainImage').src = element.src;
      // Remove active class from all thumbnails
      document.querySelectorAll('.thumb-item').forEach(thumb => {
          thumb.classList.remove('active');
      });
      // Add active class to clicked thumbnail
      element.parentElement.classList.add('active');
  }
  
  // Product Tabs
  document.addEventListener('DOMContentLoaded', function() {
      const tabButtons = document.querySelectorAll('.tab-btn');
      const tabPanes = document.querySelectorAll('.tab-pane');
  
      tabButtons.forEach(button => {
          button.addEventListener('click', () => {
              // Remove active class from all buttons and panes
              tabButtons.forEach(btn => btn.classList.remove('active'));
              tabPanes.forEach(pane => pane.classList.remove('active'));
  
              // Add active class to clicked button and corresponding pane
              button.classList.add('active');
              const tabId = button.getAttribute('data-tab');
              document.getElementById(tabId).classList.add('active');
          });
      });
  
      // Quantity Controls
      const quantityInput = document.querySelector('.qty-input');
      const minusBtn = document.querySelector('.minus');
      const plusBtn = document.querySelector('.plus');
  
      minusBtn.addEventListener('click', () => {
          const currentValue = parseInt(quantityInput.value);
          if (currentValue > 1) {
              quantityInput.value = currentValue - 1;
          }
      });
  
      plusBtn.addEventListener('click', () => {
          const currentValue = parseInt(quantityInput.value);
          quantityInput.value = currentValue + 1;
      });
  });



//   dropdown

const locales = ["en-GB", "ar-SA", "zh-CN", "de-DE", "es-ES", "fr-FR", "hi-IN", "it-IT", "in-ID", "ja-JP", "ko-KR", "nl-NL", "no-NO", "pl-PL", "pt-BR", "sv-SE", "fi-FI", "th-TH", "tr-TR", "uk-UA", "vi-VN", "ru-RU", "he-IL", "en-SG"]; 

function getFlagSrc(countryCode) {
  return /^[A-Z]{2}$/.test(countryCode)
       ? `https://flagsapi.com/${countryCode.toUpperCase()}/shiny/64.png`
       : "";
}

const dropdownBtn = document.getElementById("dropdown-btn");
const dropdownContent = document.getElementById("dropdown-content");

function setSelectedLocale(locale) {
  const intlLocale = new Intl.Locale(locale);
  
  // For the selected locale, include both language and region
  let langName = new Intl.DisplayNames([locale], {
    type: "language",
  }).of(intlLocale.language);
  
  // Append region display name for the selected locale only
  if (intlLocale.region) {
    const regionName = new Intl.DisplayNames([locale], {
      type: "region",
    }).of(intlLocale.region);
    langName += ` (${regionName})`;
  }
  
  // Clear current content
  dropdownContent.innerHTML = "";
  
  // Create list items for all other locales except the selected one
  const otherLocales = locales.filter((loc) => loc !== locale);
  otherLocales.forEach((otherLocale) => {
    const otherIntlLocale = new Intl.Locale(otherLocale);
    
    // For other locales, only show language name without region
    let otherLangName = new Intl.DisplayNames([otherLocale], {
      type: "language",
    }).of(otherIntlLocale.language);
    
    // No region name added for options in the dropdown
    
    const listEl = document.createElement("li");
    listEl.innerHTML = `${otherLangName}<img src="${getFlagSrc(otherIntlLocale.region)}" />`;
    listEl.value = otherLocale;
    listEl.addEventListener("mousedown", function () {
      setSelectedLocale(otherLocale);
    });
    dropdownContent.appendChild(listEl);
  });
  
  dropdownBtn.innerHTML = `<img src="${getFlagSrc(intlLocale.region)}" />${langName}<span class="arrow-down"></span>`;
}

// Force initial selection to Singapore ("en-SG")
setSelectedLocale("en-SG");

// Optionally, if you still want to check for browser language and update the selection:
const browserLang = new Intl.Locale(navigator.language).language;
for (const locale of locales) {
  const localeLang = new Intl.Locale(locale).language;
  if (localeLang === browserLang) {
    // Uncomment the next line if you want to change the default when the browser language matches one of the locales
    // setSelectedLocale(locale);
  }
}

// currency


const currencies = [
    { code: 'USD', symbol: '$', name: 'US Dollar' },
    { code: 'EUR', symbol: '€', name: 'Euro' },
    { code: 'GBP', symbol: '£', name: 'British Pound' },
    { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
    { code: 'AUD', symbol: 'A$', name: 'Australian Dollar' },
    { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar' },
    { code: 'CHF', symbol: 'Fr', name: 'Swiss Franc' },
    { code: 'CNY', symbol: '¥', name: 'Chinese Yuan' },
    { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
  ];
  
  class CurrencyDropdown {
    constructor() {
      this.currentCurrency = currencies[0];
      this.init();
    }
  
    init() {
      this.createDropdown();
      this.addEventListeners();
      this.updateDisplay();
    }
  
    createDropdown() {
      const dropdown = document.createElement('div');
      dropdown.className = 'currency-dropdown';
      dropdown.innerHTML = `
        <button id="currency-btn" class="currency-btn">
          <span class="currency-symbol"></span>
          <span class="currency-code"></span>
          <span class="arrow-down"></span>
        </button>
        <ul id="currency-list" class="currency-list"></ul>
      `;
      
      document.querySelector('.nav-right').prepend(dropdown);
      
      this.btn = document.getElementById('currency-btn');
      this.list = document.getElementById('currency-list');
    }
  
    addEventListeners() {
      this.btn.addEventListener('click', () => {
        this.list.classList.toggle('show');
      });
  
      document.addEventListener('click', (e) => {
        if (!e.target.closest('.currency-dropdown')) {
          this.list.classList.remove('show');
        }
      });
  
      this.populateCurrencyList();
    }
  
    populateCurrencyList() {
      this.list.innerHTML = currencies.map(currency => `
        <li data-currency="${currency.code}">
          <span class="currency-symbol">${currency.symbol}</span>
          <span class="currency-name">${currency.name}</span>
          <span class="currency-code">${currency.code}</span>
        </li>
      `).join('');
  
      this.list.querySelectorAll('li').forEach(item => {
        item.addEventListener('click', () => {
          const code = item.dataset.currency;
          this.changeCurrency(code);
          this.list.classList.remove('show');
        });
      });
    }
  
    changeCurrency(code) {
      this.currentCurrency = currencies.find(c => c.code === code);
      this.updateDisplay();
      this.updatePrices();
    }
  
    updateDisplay() {
      this.btn.innerHTML = `
        <span class="currency-symbol">${this.currentCurrency.symbol}</span>
        <span class="currency-code">${this.currentCurrency.code}</span>
        <span class="arrow-down"></span>
      `;
    }
  
    updatePrices() {
      // Add your price conversion logic here
      console.log(`Currency changed to ${this.currentCurrency.code}`);
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    new CurrencyDropdown();
  });


//   profile


document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.profile-nav .nav-link');
    const contentPanes = document.querySelectorAll('.profile-content');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Remove active class from all links and panes
            navLinks.forEach(l => l.classList.remove('active'));
            contentPanes.forEach(p => p.classList.remove('active'));

            // Add active class to clicked link and corresponding pane
            link.classList.add('active');
            const tabId = link.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });
});

// aos
  AOS.init();



  // navbar



  document.addEventListener('DOMContentLoaded', function() {
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');

    navbarCollapse.addEventListener('show.bs.collapse', function () {
        navbarToggler.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
    });

    navbarCollapse.addEventListener('hide.bs.collapse', function () {
        navbarToggler.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = ''; // Restore scrolling
    });
});