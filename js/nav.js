function setupMobileNav(){

    const navList =
        document.querySelectorAll(".subpage-nav");

    navList.forEach(nav => {

        const toggle =
            nav.querySelector(".mobile-nav-toggle");

        if(!toggle || toggle.dataset.navReady === "true"){
            return;
        }

        toggle.dataset.navReady =
            "true";

        toggle.addEventListener("click", () => {

            const isOpen =
                nav.classList.toggle("is-open");

            toggle.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

            toggle.setAttribute(
                "aria-label",
                isOpen ? "메뉴 닫기" : "메뉴 열기"
            );

        });

    });

}

function setupSkipLink(){

    const main =
        document.querySelector("main");

    if(!main){
        return;
    }

    if(!main.id){
        main.id =
            "main-content";
    }

    if(document.querySelector(".skip-link")){
        return;
    }

    const skipLink =
        document.createElement("a");

    skipLink.className =
        "skip-link";

    skipLink.href =
        `#${main.id}`;

    skipLink.textContent =
        "본문 바로가기";

    document.body.prepend(
        skipLink
    );

}

function setupSiteNavigation(){

    setupSkipLink();
    setupMobileNav();

}

if(document.readyState === "loading"){

    document.addEventListener(
        "DOMContentLoaded",
        setupSiteNavigation
    );

}
else{

    setupSiteNavigation();

}
