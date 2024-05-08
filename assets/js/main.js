/**
* Template Name: Restaurantly
* Template URL: https://bootstrapmade.com/restaurantly-restaurant-template/
* Updated: Mar 17 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/


(function() {
  "use strict";
  
  function loadJSON(path, callback) {
    fetch(path) // Adjust the path to your JSON file
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
          callback(data);
        })
        .catch(error => {
            console.error('There was a problem with your fetch operation:', error);
        });
  };

  const handleVote = (item) => {
    console.log(item)
    fetch(`http://voting_url?${item}`)
    .then(data => alert('Your vote submitted successfully !!!'))
    .catch(error => console.log(error))
  }

  function generateMenu(data) {
    const menuContainer = document.getElementById('menu-container');

    data.forEach(item => {
        const menuItem = document.createElement('div');
        menuItem.classList.add('col-lg-6', 'menu-item', `filter-${item.category.toLowerCase()}`);
        menuItem.innerHTML = `
            <div class="menu-content">
                <a href="#">${item.name}</a>
                <button id="vote-button">like</button>
            </div>
            <div class="menu-ingredients">
                Lorem ipsum dolor sit amet
            </div>
        `;
        menuItem.addEventListener('click', () => handleVote(item.name));
        menuContainer.appendChild(menuItem);
    });
};


function generateUpcomingMenu(data) {
  const menuContainer = document.getElementById('upcoming-menu');

  data.forEach((item, index) => {
      const menuItem = document.createElement('ul');
      menuItem.classList.add('col-lg-6', 'menu-item');
      menuItem.innerHTML = `
          <li class="menu-content">
              <a href="#">${item.name}</a>
          </li>
      `;
      menuContainer.appendChild(menuItem);
  });
};
function generateAnnouce(data) {
  const menuContainer = document.getElementById('annouce');

  data.forEach((item, index) => {
      const menuItem = document.createElement('div');
      // menuItem.classList.add('col-lg-6', 'menu-item');
      menuItem.innerHTML = `
          <p class="menu-content">
               ${item.message}
          </p>
      `;
      menuContainer.appendChild(menuItem);
  });
};
function generatefeedback(data) {
  const menuContainer = document.getElementById('feedback-list');

  data.forEach((item, index) => {
      const menuItem = document.createElement('li');
      // menuItem.classList.add('col-lg-6', 'menu-item');
      menuItem.innerHTML = `
      <i class="bi bi-check-circled"></i>
               ${item.message}
      `;
      menuContainer.appendChild(menuItem);
  });
};
function generateSuggest(data) {
  const menuContainer = document.getElementById('suggest-list');

  data.forEach((item, index) => {
      const menuItem = document.createElement('li');
      // menuItem.classList.add('col-lg-6', 'menu-item');
      menuItem.innerHTML = `
      <i class="bi bi-check-circled"></i>
               ${item.name}
      `;
      menuContainer.appendChild(menuItem);
  });
};
function generateVotedMenu(data) {
  const menuContainer = document.getElementById('vote-list');

  data.forEach((item, index) => {
      const menuItem = document.createElement('li');
      // menuItem.classList.add('col-lg-6', 'menu-item');
      menuItem.innerHTML = `
      <i class="bi bi-check-circled"></i>
               ${item.name}---${item.vote}
      `;
      menuContainer.appendChild(menuItem);
  });
};

loadJSON("data/menuData.json", generateMenu);
loadJSON("data/UpcomingMenuData.json", generateUpcomingMenu);
loadJSON("data/announce.json", generateAnnouce);
loadJSON("data/feedbacks.json", generatefeedback);
loadJSON("data/suggest.json", generateSuggest);
loadJSON("data/vote.json", generateVotedMenu);







  function submitFormData(param) {
    console.log(param);
    const form = document.querySelector('.php-email-form');
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const formData = new FormData(form);
        let dataString = '';

        formData.forEach((value, key) => {
            dataString += `${key}=${encodeURIComponent(value)}&`;
        });

        // Remove the last '&' character
        dataString = dataString.slice(0, -1);

        const url = 'YOUR_API_ENDPOINT?' + dataString;

        // Send GET request to the API endpoint
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Handle the response data here if needed
            alert(data);
        })
        .catch(error => {
            console.log(error)
            alert('There was a problem with your fetch operation:', error);
        });
    });
}

document.getElementById("submitFeedback").addEventListener("click", () => submitFormData('feedback'))
document.getElementById("addweeklydish").addEventListener("click", () => submitFormData('addweeklydish'))
document.getElementById("suggest").addEventListener("click", () => submitFormData('suggestdish'))



  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select('#header')
    let offset = header.offsetHeight

    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    })
  }

  /**
   * Toggle .header-scrolled class to #header when page is scrolled
   */
  let selectHeader = select('#header')
  let selectTopbar = select('#topbar')
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add('header-scrolled')
        if (selectTopbar) {
          selectTopbar.classList.add('topbar-scrolled')
        }
      } else {
        selectHeader.classList.remove('header-scrolled')
        if (selectTopbar) {
          selectTopbar.classList.remove('topbar-scrolled')
        }
      }
    }
    window.addEventListener('load', headerScrolled)
    onscroll(document, headerScrolled)
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Mobile nav dropdowns activate
   */
  on('click', '.navbar .dropdown > a', function(e) {
    if (select('#navbar').classList.contains('navbar-mobile')) {
      e.preventDefault()
      this.nextElementSibling.classList.toggle('dropdown-active')
    }
  }, true)

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let navbar = select('#navbar')
      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Preloader
   */
  let preloader = select('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove()
    });
  }

  /**
   * Menu isotope and filter
   */
  window.addEventListener('load', () => {
    let menuContainer = select('.menu-container');
    if (menuContainer) {
      let menuIsotope = new Isotope(menuContainer, {
        itemSelector: '.menu-item',
        layoutMode: 'fitRows'
      });

      let menuFilters = select('#menu-flters li', true);

      on('click', '#menu-flters li', function(e) {
        e.preventDefault();
        menuFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        menuIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        menuIsotope.on('arrangeComplete', function() {
          AOS.refresh()
        });
      }, true);
    }

  });

  /**
   * Initiate glightbox 
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Events slider
   */
  new Swiper('.events-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Testimonials slider
   */
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20
      },

      1200: {
        slidesPerView: 3,
        spaceBetween: 20
      }
    }
  });

  /**
   * Initiate gallery lightbox 
   */
  const galleryLightbox = GLightbox({
    selector: '.gallery-lightbox'
  });

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    })
  });

})()