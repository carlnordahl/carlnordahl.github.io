document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});


// code for dark/light mode switch

const modeToggle = document.getElementById('mode-toggle');
const currentTheme = localStorage.getItem('theme');
const darkActive = document.getElementById('dark-active');
const lightActive = document.getElementById('light-active');

if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);
}
if (currentTheme == 'dark') {
    darkActive.classList.add('active');
    lightActive.classList.remove('active');
}
if (currentTheme == 'light') {
    lightActive.classList.add('active');
    darkActive.classList.remove('active');
}
modeToggle.addEventListener('click', () => {
    if (darkActive.classList.contains('active')) {
        lightActive.classList.add('active');
        darkActive.classList.remove('active');
    }
    else {
        darkActive.classList.add('active');
        lightActive.classList.remove('active');
    }
    if (document.documentElement.getAttribute('data-theme') == 'dark') {
        newTheme = 'light'
    }
    else {
        newTheme = 'dark'
    }
    document.documentElement.setAttribute('data-theme', newTheme)
    localStorage.setItem('theme', newTheme)
});


// Make elements appear as user scrolls down page

const hiddenElements = document.querySelectorAll('.hidden');

const hiddenElementsObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show')
        }
        else {
            entry.target.classList.remove('show')
        }
    });
});

hiddenElements.forEach((el) => hiddenElementsObserver.observe(el));

// Change sidebar link's color when it's corresponding section is visible on screen

const sectionsAndArticles = document.querySelectorAll('.section-article')
const navLinks = document.querySelectorAll('nav ul li a')

const pixelThreshold = window.innerHeight * 0.49;

const options = {
    rootMargin: `-${pixelThreshold}px 0px -${pixelThreshold}px 0px`
}

const sectionVisibilityObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const targetId = entry.target.getAttribute('id');
            navLinks.forEach(link => {
                if (link.getAttribute('href') === `#${targetId}`) {
                    link.classList.add('active')
                } else {
                    link.classList.remove('active')
                }
            });
        }
    });
}, options)

sectionsAndArticles.forEach(sectionArticle => {
    sectionVisibilityObserver.observe(sectionArticle);
})

