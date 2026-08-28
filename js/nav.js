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

        const closeMenu = (shouldFocusToggle = false) => {

            nav.classList.remove("is-open");

            toggle.setAttribute(
                "aria-expanded",
                "false"
            );

            toggle.setAttribute(
                "aria-label",
                "메뉴 열기"
            );

            if(shouldFocusToggle){

                toggle.focus();

            }

        };

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

        nav.querySelectorAll(".mobile-nav-link").forEach(link => {

            link.addEventListener(
                "click",
                () => closeMenu()
            );

        });

        nav.addEventListener("keydown", event => {

            if(event.key === "Escape" && nav.classList.contains("is-open")){

                closeMenu(true);

            }

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
    setupCompareStudy();

}

const COMPARE_PROGRESS_KEY =
    "historyMasterCompareProgressV1";

function readCompareProgress(){

    try{

        const stored =
            JSON.parse(localStorage.getItem(COMPARE_PROGRESS_KEY) || "{}");

        return stored && typeof stored === "object" ? stored : {};

    }
    catch(error){

        return {};

    }

}

function writeCompareProgress(progress){

    try{

        localStorage.setItem(
            COMPARE_PROGRESS_KEY,
            JSON.stringify(progress)
        );

        return true;

    }
    catch(error){

        return false;

    }

}

function getCompareSlug(href = window.location.pathname){

    let pathname =
        href;

    try{

        pathname =
            new URL(href, window.location.href).pathname;

    }
    catch(error){

        pathname =
            href;

    }

    const match =
        pathname.match(/\/compare\/([^/?#]+)\.html$/);

    if(!match || match[1] === "index"){
        return "";
    }

    return match[1];

}

function setupCompareDetailProgress(){

    const slug =
        getCompareSlug();

    const selfCheck =
        document.querySelector(".compare-self-check");

    const details =
        Array.from(document.querySelectorAll(
            ".compare-judgement details, .compare-self-check details"
        ));

    if(!slug || !selfCheck || details.length === 0){
        return;
    }

    const allProgress =
        readCompareProgress();

    const saved =
        allProgress[slug] && typeof allProgress[slug] === "object"
            ? allProgress[slug]
            : {};

    const seen =
        new Set(Array.isArray(saved.seen) ? saved.seen : []);

    const record = {
        ...saved,
        seen: Array.from(seen),
        visitedAt: new Date().toISOString()
    };

    allProgress[slug] = record;
    writeCompareProgress(allProgress);

    const panel =
        document.createElement("section");

    panel.className =
        "compare-study-progress";

    panel.setAttribute(
        "aria-labelledby",
        `study-progress-${slug}`
    );

    panel.innerHTML = `
        <div class="compare-study-progress-copy">
            <p class="compare-study-progress-label">내 학습 기록</p>
            <h2 id="study-progress-${slug}">확인한 문제를 저장해두세요</h2>
            <p class="compare-study-progress-status" aria-live="polite"></p>
            <div class="compare-study-progress-track" aria-hidden="true"><span></span></div>
        </div>
        <button type="button" class="compare-study-complete-btn"></button>
    `;

    selfCheck.insertAdjacentElement(
        "afterend",
        panel
    );

    const status =
        panel.querySelector(".compare-study-progress-status");

    const bar =
        panel.querySelector(".compare-study-progress-track span");

    const button =
        panel.querySelector(".compare-study-complete-btn");

    const saveRecord = () => {

        record.seen =
            Array.from(seen).sort((a, b) => a - b);

        allProgress[slug] =
            record;

        writeCompareProgress(
            allProgress
        );

    };

    const render = () => {

        const viewed =
            Math.min(seen.size, details.length);

        const percent =
            Math.round((viewed / details.length) * 100);

        status.textContent =
            record.completed
                ? `학습 완료 · 확인 문제 ${viewed}/${details.length}개 열람`
                : `확인 문제 ${viewed}/${details.length}개 열람`;

        bar.style.width =
            `${percent}%`;

        button.textContent =
            record.completed ? "완료 표시 취소" : "학습 완료로 표시";

        button.setAttribute(
            "aria-pressed",
            String(Boolean(record.completed))
        );

        panel.classList.toggle(
            "is-complete",
            Boolean(record.completed)
        );

    };

    details.forEach((detail, index) => {

        if(seen.has(index)){
            detail.classList.add("was-opened");
        }

        detail.addEventListener("toggle", () => {

            if(!detail.open){
                return;
            }

            seen.add(index);
            detail.classList.add("was-opened");
            saveRecord();
            render();

        });

    });

    button.addEventListener("click", () => {

        record.completed =
            !record.completed;

        if(record.completed){
            record.completedAt = new Date().toISOString();
        }
        else{
            delete record.completedAt;
        }

        saveRecord();
        render();

    });

    render();

}

function setupCompareHubProgress(){

    const categoryList =
        document.querySelector(".compare-category-list");

    const cards =
        Array.from(document.querySelectorAll(".compare-hub-card"));

    if(!categoryList || cards.length === 0){
        return;
    }

    const allProgress =
        readCompareProgress();

    const cardData =
        cards.map(card => ({
            card,
            slug: getCompareSlug(card.getAttribute("href") || ""),
            title: card.querySelector("strong")?.textContent.trim() || "비교 주제"
        }));

    const completedCount =
        cardData.filter(item => allProgress[item.slug]?.completed).length;

    const visitedCount =
        cardData.filter(item => allProgress[item.slug]?.visitedAt).length;

    const nextItem =
        cardData.find(item =>
            allProgress[item.slug]?.visitedAt &&
            !allProgress[item.slug]?.completed
        ) || cardData.find(item => !allProgress[item.slug]?.completed);

    const panel =
        document.createElement("section");

    panel.className =
        "compare-hub-progress";

    panel.setAttribute(
        "aria-labelledby",
        "compare-hub-progress-title"
    );

    panel.innerHTML = `
        <div class="compare-hub-progress-copy">
            <p class="compare-hub-progress-label">내 비교 학습</p>
            <h2 id="compare-hub-progress-title">읽은 주제를 이어서 복습하세요</h2>
            <p>방문 ${visitedCount}개 · 학습 완료 ${completedCount}/${cards.length}개</p>
        </div>
        ${nextItem ? `<a class="compare-hub-continue" href="${nextItem.card.getAttribute("href")}">이어서 보기 <strong>${nextItem.title}</strong></a>` : `<p class="compare-hub-all-complete">35개 주제를 모두 완료했습니다.</p>`}
        <div class="compare-hub-filters" role="group" aria-label="비교 주제 학습 상태 필터">
            <button type="button" class="is-active" data-compare-filter="all" aria-pressed="true">전체</button>
            <button type="button" data-compare-filter="pending" aria-pressed="false">미완료</button>
            <button type="button" data-compare-filter="completed" aria-pressed="false">완료</button>
        </div>
        <p class="compare-hub-filter-status sr-only" aria-live="polite"></p>
    `;

    categoryList.insertAdjacentElement(
        "beforebegin",
        panel
    );

    cardData.forEach(item => {

        const isComplete =
            Boolean(allProgress[item.slug]?.completed);

        item.card.dataset.studyStatus =
            isComplete ? "completed" : "pending";

        if(isComplete){

            const badge =
                document.createElement("span");

            badge.className =
                "compare-card-complete";

            badge.textContent =
                "학습 완료";

            item.card.append(
                badge
            );

        }

    });

    const filterStatus =
        panel.querySelector(".compare-hub-filter-status");

    const filterButtons =
        Array.from(panel.querySelectorAll("[data-compare-filter]"));

    filterButtons.forEach(button => {

        button.addEventListener("click", () => {

            const filter =
                button.dataset.compareFilter;

            let visibleCount =
                0;

            cardData.forEach(item => {

                const shouldShow =
                    filter === "all" || item.card.dataset.studyStatus === filter;

                item.card.hidden =
                    !shouldShow;

                if(shouldShow){
                    visibleCount += 1;
                }

            });

            document.querySelectorAll(".compare-category-section").forEach(section => {

                const hasVisibleCard =
                    Array.from(section.querySelectorAll(".compare-hub-card"))
                        .some(card => !card.hidden);

                section.hidden =
                    !hasVisibleCard;

            });

            filterButtons.forEach(filterButton => {

                const isActive =
                    filterButton === button;

                filterButton.classList.toggle("is-active", isActive);
                filterButton.setAttribute("aria-pressed", String(isActive));

            });

            const filterName =
                filter === "all" ? "전체" : filter === "completed" ? "완료" : "미완료";

            filterStatus.textContent =
                `${filterName} 주제 ${visibleCount}개를 표시합니다.`;

        });

    });

}

function setupCompareStudy(){

    setupCompareDetailProgress();
    setupCompareHubProgress();

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
