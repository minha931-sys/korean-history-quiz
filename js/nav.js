function setupMobileNav(){

    document.querySelectorAll(".subpage-nav").forEach(
        nav => {

            const toggle =
                nav.querySelector(".mobile-nav-toggle");

            if(!toggle || toggle.dataset.navReady === "true"){

                return;

            }

            toggle.dataset.navReady =
                "true";

            toggle.addEventListener(
                "click",
                () => {

                    const isOpen =
                        nav.classList.toggle(
                            "is-open"
                        );

                    toggle.setAttribute(
                        "aria-expanded",
                        String(isOpen)
                    );

                    toggle.setAttribute(
                        "aria-label",
                        isOpen ? "메뉴 닫기" : "메뉴 열기"
                    );

                }
            );

        }
    );

}

setupMobileNav();
