;(function () {
    "use strict"

    // selector  function
    const select = (el, all = false) => {
        el = el.trim()
        if (all) {
            return [...document.querySelectorAll(el)]
        } else {
            return document.querySelector(el)
        }
    }

    // listener function
    const on = (type, el, listener, all = false) => {
        let selectEl = select(el, all)
        if (selectEl) {
            if (all) {
                selectEl.forEach((e) => e.addEventListener(type, listener))
            } else {
                selectEl.addEventListener(type, listener)
            }
        }
    }

    // on scroll  listener
    const onscroll = (el, listener) => el.addEventListener("scroll", listener)

    // remove hash from navbar
    let navbarlinks = select("#navbar .scrollto", true)
    const navbarlinksActive = () => {
        let position = window.scrollY + 100
        navbarlinks.forEach((navbarlink) => {
            if (!navbarlink.hash) return
            let section = select(navbarlink.hash)
            if (!section) return
            if (
                position >= section.offsetTop &&
                position <= section.offsetTop + section.offsetHeight
            ) {
                navbarlink.classList.add("active")
            } else {
                navbarlink.classList.remove("active")
            }
        })
    }
    window.addEventListener("load", navbarlinksActive)
    onscroll(document, navbarlinksActive)

    // Scroll to an element
    const scrollto = (el) => {
        let header = select("#header")
        let offset = header.offsetHeight
        let elementPos = select(el).offsetTop
        window.scrollTo({
            top: elementPos - offset,
            behavior: "smooth",
        })
    }

    // Toggle .header-scrolled class to #header on scroll
    let selectHeader = select("#header")
    if (selectHeader) {
        const headerScrolled = () => {
            if (window.scrollY > 100) {
                selectHeader.classList.add("header-scrolled")
            } else {
                selectHeader.classList.remove("header-scrolled")
            }
        }
        window.addEventListener("load", headerScrolled)
        onscroll(document, headerScrolled)
    }

    // Back to top button
    let backtotop = select(".back-to-top")
    if (backtotop) {
        const toggleBacktotop = () => {
            window.scrollY > 100
                ? backtotop.classList.add("active")
                : backtotop.classList.remove("active")
        }
        window.addEventListener("load", toggleBacktotop)
        onscroll(document, toggleBacktotop)
    }

    // Mobile nav
    on("click", ".mobile-nav-toggle", (e) => {
        const nav = document.querySelector(".mobile-nav-toggle")
        select("#navbar").classList.toggle("navbar-mobile")
        nav.classList.toggle("bi-list")
        nav.classList.toggle("bi-x")
    })

    // mobile nav dropdowns
    on("click", ".navbar .dropdown > a",function (e) {
        if (select("#navbar").classList.contains("navbar-mobile")) {
            e.preventDefault()
            this.nextElementSibling.classList.toggle("dropdown-active")
        }
    }, true)

    // Scrool with ofset on links
    on("click", ".scrollto",function (e) {
        if (select(this.hash)) {
            e.preventDefault()

            let navbar = select("#navbar")
            if (navbar.classList.contains("navbar-mobile")) {
                navbar.classList.remove("navbar-mobile")
                let navbarToggle = select(".mobile-nav-toggle")
                navbarToggle.classList.toggle("bi-list")
                navbarToggle.classList.toggle("bi-x")
            }
            scrollto(this.hash)
        }
    }, true)

    // Scroll on page load with hash
    window.addEventListener("load", () => {
        if (window.location.hash) {
            if (select(window.location.hash)) {
                scrollto(window.location.hash)
            }
        }
    })

    // Preloader
    let preloader = select("#preloader")
    if (preloader) {
        window.addEventListener("load", () => {
            preloader.remove()
        })
    }

    // Animation on scroll
    window.addEventListener("load", () => {
        AOS.init({
            duration: 1000,
            easing: "ease-in-out",
            once: true,
            mirror: false,
        })
    })
})()
