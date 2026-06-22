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
}

// Foolproof initiation to handle already fired DOMContentLoaded events
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", loadMenu);
} else {
  loadMenu();
}
