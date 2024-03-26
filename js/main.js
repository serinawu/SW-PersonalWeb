//header
const navbar = document.getElementById('navbar');
const sections = document.querySelectorAll('section');
const menu = document.querySelector('.menu_icon');
const closeMenu = document.querySelector('.menuClose_icon');

navbar.addEventListener('click', function(event){
    event.preventDefault();
    if(event.target.tagName === 'A') {
        const aHref = navbar.querySelectorAll('a');

        aHref.forEach(a => a.classList.remove('active'));
        event.target.classList.add('active');

        const targetId = event.target.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);

        if(targetSection) {
            targetSection.scrollIntoView({behavior: 'smooth'});
        }
    } if(event.target.tagName === 'A' && navbar.classList.contains('sideMode')) {
        navbar.classList.remove('sideMode');
    }
});

menu.addEventListener('click', function(event) {
    navbar.classList.add('sideMode');
})

closeMenu.addEventListener('click', function(event) {
    navbar.classList.remove('sideMode');
})

//監聽當前章節
window.addEventListener('scroll', function() {
    const scrollPosition = window.scrollY || window.pageYOffset;
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        const targetId = section.getAttribute('id');
        const activeLink = navbar.querySelector(`a[href="#${targetId}"]`);
        navbar.querySelectorAll('a').forEach(link => link.classList.remove('active'));
        if (activeLink) {
          activeLink.classList.add('active');
        }
      }
    });
  });

//開啟專案
const showProjects = document.querySelectorAll('.project');
showProjects.forEach((project, index) => {
    project.addEventListener('click', function() {
        const projectName = project.querySelector('.info > p').innerText;
        const popup = document.querySelector('.popup');
        const projectNameElement = document.querySelector('.projectName > p');
        projectNameElement.innerText = projectName;
        
        const allOuters = document.querySelectorAll('.outer');
        allOuters.forEach(outer => {
            outer.classList.remove('display');
        })

        if (allOuters[index]) {
            allOuters[index].classList.add('display');
        } else {
            return;
        }

        popup.classList.add('display');
    });
});

//前後一個專案
let currentIndex = 0;
const outers = document.querySelectorAll('.outer');
const prevBtn = document.querySelector('.project-prevBtn');
const nextBtn = document.querySelector('.project-nextBtn');

function updateDisplay() {
    outers.forEach((outers, index)=> {
        outers.classList.toggle('display', index === currentIndex);
    });

    prevBtn.classList.toggle('eventNone', currentIndex === 0);
    nextBtn.classList.toggle('eventNone', currentIndex === outers.length - 1);
}

prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
        updateDisplay();
    }
});

nextBtn.addEventListener('click', ()=> {
    if(currentIndex < outers.length - 1){
        currentIndex++;
        updateDisplay();
    }
})

//關閉專案
const closePopup = document.querySelector('.close_popupBtn');

closePopup.addEventListener('click', function(event){
    const popup = document.querySelector('.popup');
    popup.classList.remove('display');
});

//back-to-topBtn
const backTop = document.getElementById('back-to-topBtn');

backTop.addEventListener('click', function(event){
    scrollToTop();
});

function scrollToTop() {
    window.requestAnimationFrame(function(){
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}
