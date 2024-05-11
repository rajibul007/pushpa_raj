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
    fetch(`https://rv1psv5feb.execute-api.us-east-1.amazonaws.com?name=${item}&action=vote`)
    .then(data => alert('Your vote submitted successfully !!!'))
    .catch(error => alert('failed'))
  }
  const getLikeButton = (id, type) => ( `
  <div id="vote-button">
    <input type="checkbox" id="checkbox-${id}" ${type==='show' ? "checked disabled" : ""}/>
    <label for="checkbox-${id}">
      <svg id="heart-svg" viewBox="467 392 58 57" xmlns="http://www.w3.org/2000/svg">
        <g id="Group" fill="none" fill-rule="evenodd" transform="translate(467 392)">
          <path d="M29.144 20.773c-.063-.13-4.227-8.67-11.44-2.59C7.63 28.795 28.94 43.256 29.143 43.394c.204-.138 21.513-14.6 11.44-25.213-7.214-6.08-11.377 2.46-11.44 2.59z" id="heart" fill="#AAB8C2"/>
          <circle id="main-circ" fill="#E2264D" opacity="0" cx="29.5" cy="29.5" r="1.5"/>

          <g id="grp7" opacity="0" transform="translate(7 6)">
            <circle id="oval1" fill="#9CD8C3" cx="2" cy="6" r="2"/>
            <circle id="oval2" fill="#8CE8C3" cx="5" cy="2" r="2"/>
          </g>

          <g id="grp6" opacity="0" transform="translate(0 28)">
            <circle id="oval1" fill="#CC8EF5" cx="2" cy="7" r="2"/>
            <circle id="oval2" fill="#91D2FA" cx="3" cy="2" r="2"/>
          </g>

          <g id="grp3" opacity="0" transform="translate(52 28)">
            <circle id="oval2" fill="#9CD8C3" cx="2" cy="7" r="2"/>
            <circle id="oval1" fill="#8CE8C3" cx="4" cy="2" r="2"/>
          </g>

          <g id="grp2" opacity="0" transform="translate(44 6)">
            <circle id="oval2" fill="#CC8EF5" cx="5" cy="6" r="2"/>
            <circle id="oval1" fill="#CC8EF5" cx="2" cy="2" r="2"/>
          </g>

          <g id="grp5" opacity="0" transform="translate(14 50)">
            <circle id="oval1" fill="#91D2FA" cx="6" cy="5" r="2"/>
            <circle id="oval2" fill="#91D2FA" cx="2" cy="2" r="2"/>
          </g>

          <g id="grp4" opacity="0" transform="translate(35 50)">
            <circle id="oval1" fill="#F48EA7" cx="6" cy="5" r="2"/>
            <circle id="oval2" fill="#F48EA7" cx="2" cy="2" r="2"/>
          </g>

          <g id="grp1" opacity="0" transform="translate(24)">
            <circle id="oval1" fill="#9FC7FA" cx="2.5" cy="3" r="2"/>
            <circle id="oval2" fill="#9FC7FA" cx="7.5" cy="2" r="2"/>
          </g>
        </g>
      </svg>
    </label>
  </div>`);

  function generateMenu(data) {
    const menuContainer = document.getElementById('menu-container');

    data.forEach((item, indx) => {
        const menuItem = document.createElement('div');
        const id = item.name.replaceAll(' ', '') + indx;
        menuItem.classList.add('col-lg-6', 'menu-item', `filter-${item.category.toLowerCase()}`);
        menuItem.innerHTML = `
            <div class="menu-content" id=${id}>
                <a href="#">${item.name}</a>
                ${getLikeButton(id)}
            </div>
        `;
        menuContainer.appendChild(menuItem);
        document.getElementById(`checkbox-${id}`).addEventListener('click', () => handleVote(item.name));
    });
};


function generateUpcomingMenu(data) {
  const menuContainer = document.getElementById('upcoming-menu');

  data.forEach((item, index) => {
      const menuItem = document.createElement('div');
      const id = item.name.replaceAll(' ', '') + index;
      menuItem.classList.add('col-lg-6', 'mn-item', `filter-${item.day.toLowerCase()}`);
      menuItem.innerHTML = `
          <div class="menu-content" id=${id}>
          <a href="#" style="color: white; font-size: 15px; font-family: Arial, sans-serif;"><span>&#127858;</span> ${item.name}</a> `;
      menuContainer.appendChild(menuItem);
  });
};

function generateAnnouce(data) {
  const menuContainer = document.getElementById('annouce');

  data.forEach((item, index) => {
      const menuItem = document.createElement('div');
      menuItem.classList.add('col-lg-6', 'menu-item');
      menuItem.innerHTML = `
          <span class="menu-content">
          <span class="announcement">&#128227;</span> ${item.message}
          </span>
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
      const menuItem = document.createElement('div');
      menuItem.classList.add('col-lg-6');
      menuItem.innerHTML = `
             <div class="vote-list-content"> 
                <span class="vote-text">${item.name}</span>
                ${getLikeButton(item.name, 'show')}
                <span class="vote-count">${item.vote} Likes</span>
              </div>
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
    const form = document.getElementById(param+"-form");

    form.addEventListener('submit',
    function(event) {
       event.preventDefault();
       form.querySelector('.loading').classList.add('d-block');
       resetMsg(form);
      });
        const formData = new FormData(form);
        let dataString = '';
        console.log(formData)
        formData.forEach((value, key) => {
            dataString += `${key}=${encodeURIComponent(value)}&`;
        });

        // Remove the last '&' character
        dataString = dataString.slice(0, -1);

        const url = 'https://rv1psv5feb.execute-api.us-east-1.amazonaws.com/'+"?" + dataString + "&" +"action="+ param;

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
            //alert(data);
            displaySuccess(form, "Successful Submission!!")
        })
        .catch(error => {
            console.log(error)
            displayError(form, "Fialed Submission!!")
           // alert('There was a problem with your fetch operation:', error);
        });
    //};
    function displayError(thisForm, error) {
      thisForm.querySelector('.loading').classList.remove('d-block');
      thisForm.querySelector('.error-message').innerHTML = error;
      thisForm.querySelector('.error-message').classList.add('d-block');
      setTimeout(() => {
        resetMsg(thisForm)
      }, 2000);
    }
    function displaySuccess(thisForm, msg) {
      thisForm.querySelector('.loading').classList.remove('d-block');
      thisForm.querySelector('.sent-message').innerHTML = msg;
      thisForm.querySelector('.sent-message').classList.add('d-block');
      thisForm.reset(); 
      setTimeout(() => {
        resetMsg(thisForm)
      }, 1000);
    }
    function resetMsg(thisForm) {
      thisForm.querySelector('.error-message').classList.remove('d-block');
      thisForm.querySelector('.sent-message').classList.remove('d-block');
    }
}

document.getElementById("submitFeedback").addEventListener("click", () => submitFormData('submitFeedback'))
document.getElementById("addweeklydish").addEventListener("click", () => submitFormData('addweeklydish'))
document.getElementById("suggest").addEventListener("click", () => submitFormData('suggest'))
document.getElementById("notify-submit").addEventListener("click", () => submitFormData('notify-submit'))




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
   * Upcoming-Menu isotope and filter
   */
  window.addEventListener('load', () => {
    let menuContainer = select('.upcoming-menu');
    if (menuContainer) {
      let menuIsotope = new Isotope(menuContainer, {
        itemSelector: '.mn-item',
        layoutMode: 'fitRows'
      });

      let menuFilters = select('#mn-flters li', true);

      on('click', '#mn-flters li', function(e) {
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
    let mondayBtn = document.getElementById('monday');
    console.log(mondayBtn);
    mondayBtn.click();

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