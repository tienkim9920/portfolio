const HOME_PAGE = "./components/homepage.html";
const ABOUT_PAGE = "./components/aboutpage.html";
const RESUME_PAGE = "./components/resumepage.html";
const HOME = "home";
const ABOUT = "about";
const RESUME = "resume";

const handleActiveNavbar = (index) => {
  // Navbar Laptop
  const itemsHeader = document.getElementsByClassName('items-header');
  for (let i = 0; i < itemsHeader.length; i++) {
    itemsHeader[i].classList.remove('active');
  }
  itemsHeader[index].classList.add('active');

  // Navbar Mobile
  const itemsHeaderIcon = document.getElementsByClassName('items-header-icon');
  for (let i = 0; i < itemsHeaderIcon.length; i++) {
    itemsHeaderIcon[i].classList.remove('active');
  }
  itemsHeaderIcon[index].classList.add('active');
}

const gotoComponent = (name, index) => {
  if (name === HOME) {
    loadScript(HOME_PAGE, "body");
  } else if (name === ABOUT) {
    loadScript(ABOUT_PAGE, "body");
  } else if (name === RESUME) {
    loadScript(RESUME_PAGE, "body");
  }
  handleActiveNavbar(index);
};

function loadScript(component, id) {
  fetch(component)
    .then((res) => res.text())
    .then((text) => {
      document.getElementById(id).innerHTML = text;
      if (component === HOME_PAGE) {
        loadPage('item-homepage');
      } else if (component === ABOUT_PAGE) {
        loadPage('item-aboutpage');
      } else if (component === RESUME_PAGE) {
        loadPage('item-resumepage');
      }
    });
}

const loadSection = (element, className) => {
  const eachItems = document.getElementsByClassName(className);
  for (let i = 0; i < eachItems.length; i++) {
    setTimeout(() => {
      eachItems[i].classList.add("active");
      element.removeAttribute(element);
    }, i * 200);
  }
};

const loadPage = (data) => {
  const boxItems = document.querySelectorAll(`[${data}]`);

  let observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        loadSection(entry.target, data);
      }
    });
  });

  boxItems.forEach((element) => {
    observer.observe(element);
  });
};