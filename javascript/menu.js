// Unified Global Side Menu Manager with Foolproof Async Initiation
function loadMenu() {
  const path = window.location.pathname;
  let prefix = "./";

  // Auto-detect directory depth
  if (path.includes("/html/")) {
    prefix = "../../";
  } else if (
    path.includes("/anemia-in-baby/") ||
    path.includes("/anemia-in-pregancy/") ||
    path.includes("/pregancy-vitamin-d/") ||
    path.includes("/baby-vitamin-d/") ||
    path.includes("/quiz/")
  ) {
    prefix = "../";
  }

  // Find the menu-items container
  const menuItems = document.querySelector(".menu-items");
  if (menuItems) {
    // Dynamically overwrite with the single, centralized source of truth
    menuItems.innerHTML = `
      <ul>
        <li>孕期補鐵防貧血</li>
        <ul>
          <li><a href="${prefix}anemia-in-pregancy/html/iron_deficiency_effects.html">缺鐵對媽媽、寶寶的影響</a></li>
          <li><a href="${prefix}anemia-in-pregancy/html/iron_supplement_guide.html">孕期補鐵全攻略</a></li>
        </ul>
        <li>嬰幼兒補鐵攻略</li>
        <ul>
          <li><a href="${prefix}anemia-in-baby/html/iron_deficiency.html">六個月後容易缺鐵？<br>必知的風險提醒</a></li>
          <li><a href="${prefix}anemia-in-baby/html/iron_supplement_guide.html">寶寶補鐵全攻略<br>吃對食物氣色好</a></li>
        </ul>
        <li>維生素D補充指南</li>
        <ul>
          <li><a href="${prefix}pregancy-vitamin-d/html/vitamin_d_guide.html">好孕D計劃：維生素D補給全攻略</a></li>
          <li><a href="${prefix}baby-vitamin-d/html/baby_vitamin_d_guide.html">寶寶維生素D補給全攻略</a></li>
        </ul>
        <li>健康知識小測驗</li>
        <ul>
          <li><a href="${prefix}quiz/index.html">點我開始測驗</a></li>
        </ul>
      </ul>
    `;
    console.log("Unified Global Side Menu successfully loaded 🚀");
  } else {
    console.warn("Could not find .menu-items container on load.");
  }

  // Initialize bouncy transitions and scroll reveal effects
  initTransitions();
}

function initTransitions() {
  // 1. Inject Transition CSS Stylesheet dynamically
  const style = document.createElement("style");
  style.id = "page-transition-styles";
  style.textContent = `
    /* Global Page Transition Keyframes */
    @keyframes pageBounceIn {
      0% {
        opacity: 0;
        transform: scale(0.94) translateY(18px);
      }
      70% {
        transform: scale(1.02) translateY(-3px);
      }
      100% {
        opacity: 1;
        transform: scale(1) translateY(0);
      }
    }

    @keyframes pageBounceOut {
      0% {
        opacity: 1;
        transform: scale(1) translateY(0);
      }
      100% {
        opacity: 0;
        transform: scale(0.95) translateY(-15px);
      }
    }

    /* Hide content-box initially if Javascript is running to prevent flash */
    .content-box {
      opacity: 0;
      transform-origin: center center;
    }

    .page-enter-active {
      animation: pageBounceIn 0.55s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards !important;
    }

    .page-exit-active {
      animation: pageBounceOut 0.38s cubic-bezier(0.6, -0.28, 0.735, 0.045) forwards !important;
    }

    /* Scroll Reveal Bouncy Animations for Landing Page Sections */
    section {
      overflow: hidden; /* Prevent bouncing from creating scrolls */
    }

    section > * {
      opacity: 0;
      transform: translateY(35px) scale(0.93);
      transition: opacity 0.75s cubic-bezier(0.175, 0.885, 0.32, 1.275),
                  transform 0.75s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }

    section.active > *:nth-child(1) {
      opacity: 1;
      transform: translateY(0) scale(1);
      transition-delay: 0.1s;
    }

    section.active > *:nth-child(2) {
      opacity: 1;
      transform: translateY(0) scale(1);
      transition-delay: 0.25s;
    }

    section.active > *:nth-child(3) {
      opacity: 1;
      transform: translateY(0) scale(1);
      transition-delay: 0.4s;
    }

    section.active > *:nth-child(4) {
      opacity: 1;
      transform: translateY(0) scale(1);
      transition-delay: 0.55s;
    }

    /* Tactile bouncy click/active state for ALL buttons and links across the app */
    a:active, button:active, .back-botton:active, .home-botton:active {
      transform: scale(0.94) !important;
      transition: transform 0.1s cubic-bezier(0.175, 0.885, 0.32, 1.275) !important;
    }
  `;
  document.head.appendChild(style);

  // 2. Apply Entrance Transition to .content-box
  const contentBox = document.querySelector(".content-box");
  if (contentBox) {
    contentBox.classList.add("page-enter-active");
  }

  // 3. Intercept Clicks for Exit Transitions
  document.addEventListener("click", function(e) {
    const anchor = e.target.closest("a");
    if (!anchor) return;

    const href = anchor.getAttribute("href");
    if (!href) return;

    // Ignore anchor links (hash links)
    if (href.startsWith("#")) return;

    // Ignore external links
    if (href.startsWith("http") && !href.includes(window.location.hostname)) return;

    // Ignore links opening in new tab
    if (anchor.getAttribute("target") === "_blank") return;

    // Ignore javascript or empty/placeholder links
    if (href.startsWith("javascript:") || href === "#") return;

    if (contentBox) {
      e.preventDefault();
      contentBox.classList.remove("page-enter-active");
      contentBox.classList.add("page-exit-active");
      setTimeout(() => {
        window.location.href = href;
      }, 350);
    }
  });

  // 4. Listen to pageshow to support Back/Forward Cache
  window.addEventListener("pageshow", function(e) {
    if (e.persisted && contentBox) {
      contentBox.classList.remove("page-exit-active");
      contentBox.classList.add("page-enter-active");
    }
  });

  // 5. Wrap Global goBack() to apply Exit Transition
  if (typeof window.goBack === "function") {
    wrapGoBack();
  } else {
    // If go_back.js hasn't loaded yet or is loaded asynchronously, wait and wrap
    setTimeout(wrapGoBack, 50);
  }

  function wrapGoBack() {
    if (typeof window.goBack === "function" && !window.goBack.isWrapped) {
      const originalGoBack = window.goBack;
      window.goBack = function() {
        if (contentBox) {
          contentBox.classList.remove("page-enter-active");
          contentBox.classList.add("page-exit-active");
          setTimeout(() => {
            originalGoBack();
          }, 350);
        } else {
          originalGoBack();
        }
      };
      window.goBack.isWrapped = true;
    }
  }

  // 6. Scroll Reveal Observer for Landing Page Sections
  const isLandingPage = !!document.querySelector("main section");
  if (isLandingPage) {
    const sections = document.querySelectorAll("section");
    if (typeof IntersectionObserver === "undefined") {
      sections.forEach(section => section.classList.add("active"));
      return;
    }

    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.15
    };

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
        } else {
          entry.target.classList.remove("active");
        }
      });
    }, observerOptions);

    sections.forEach(section => {
      sectionObserver.observe(section);
    });
  }
}

// Foolproof initiation to handle already fired DOMContentLoaded events
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", loadMenu);
} else {
  loadMenu();
}
