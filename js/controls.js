/* PRZESUWANIE STRONY DO ELEMENTU Z KLASĄ "góra" */

$(".nav-item").click(function () {
    $('html, body').animate({
        scrollTop: $(".gora").offset().top
    }, 1000);
});

/* WYSUWANIE SIDEBARA PO KLIKNIĘCIU NA IKONĘ Z KLASĄ "sidebar" */

let sidebar = document.querySelector(".sidebar");
let hamburgerLine1 = document.querySelector(".hamburger-line-1");
let hamburgerLine2 = document.querySelector(".hamburger-line-2");
let hamburgerLine3 = document.querySelector(".hamburger-line-3");
function toggleSidebar() {
    sidebar.classList.toggle("active");
    hamburgerLine1.classList.toggle("hamburger-line-1__ACTIVE");
    hamburgerLine2.classList.toggle("hamburger-line-2__ACTIVE");
    hamburgerLine3.classList.toggle("hamburger-line-3__ACTIVE");
}

/*********************
 ****** TOOLTIPS *****
 *********************/

const loadAllTooltips = () => {
    tippy('.element', {
        animation: 'scale',
        inertia: 'true',
        arrow: true,
        hideOnClick: 'false',
        theme: 'honeybee',
        trigger: 'mousemove, mouseleave'
    });

    const allTooltipElements = document.querySelectorAll(".element");
    for (let i = 0; i < allTooltipElements.length; i++) {
        tippy(allTooltipElements[i]); //wywolanie funkcji nadajacej tooltip elementom z tablicy, których selektor przekazany jest jako argument funkcji. Tooltipy nadawane sa wszystkim elementom (w tym przypadku z klasa "element")
    }
};

let tabList = document.querySelectorAll("[data-link*='lessons/01.html_intro']");
for (let i = 0; i < tabList.length; i++) {
    $("#tab" + i).load(tabList[i].getAttribute("data-link"), loadAllTooltips); // (i + 1)
}

const getActiveTabElements = () => {
    return document.querySelector('.tab-content .active').querySelectorAll('.element'); // zwraca liste elementow, które mają posiadać tooltipy, z aktywnego, aktualnie wyswietlanego wezla
};

let activeTabElements = getActiveTabElements();   //pobiera elementy aktualnie wyswietlanego okna do ktorych maja byc przypisane tooltipy

const pokazTooltipy = () => {
    setTimeout(function () {
        activeTabElements = getActiveTabElements();   //po odczekaniu sekundy przypisuje do zmiennej elementy w oknie ktore docelowo zostalo wyswietlone
        for (let i = 0; i < activeTabElements.length; i++) {
            activeTabElements[i]._tippy.show();       //wyswietla tooltipy tych elementow
        }
    }, 1000);
    for (let i = 0; i < activeTabElements.length; i++) {
        activeTabElements[i]._tippy.hide();           // wykonywane przed setTimeout - ukrywa elementy w oknie, ktore jest zamykane
    }
};

pokazTooltipy(); // wywolanie funkcji, aby tooltipy na stronie startowej sie wyswietlily

const linki = document.querySelectorAll(".nav-tabs");
for (let i = 0; i < linki.length; i++) {
    linki[i].addEventListener("click", pokazTooltipy, false);
}


/*********************
 **** TOOLTIPS END ***
 *********************/

/*====================================================================
                         INTERSECTION OBSERVER
====================================================================*/

let observer = new IntersectionObserver( observables => {
    observables.forEach( observable => {
        if (observable.intersectionRatio > 0.5) {
            observable.target.classList.add("animate");
            observer.unobserve(observable.target);
            console.log("tesrt");
        }
    })
},
    {
        threshold: [0.5]
    });

window.onload = () => {
    let observeElements = document.querySelectorAll(".observe");
    observeElements.forEach( element => {
        observer.observe(element);
    } );
};