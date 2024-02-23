//header
const navbar = document.getElementById('navbar');
const sections = document.querySelectorAll('section');

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
    }
});

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

showProjects.forEach(project => {
    project.addEventListener('click', function(event) {
        const popup = document.querySelector('.popup');
        popup.classList.add('display');
    });
});

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
