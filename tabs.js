const tabList = document.querySelector('[role="tablist"]');
const tab = tabList.querySelectorAll('[role="tab"]');
let tabFocus = 0;
function changeTabFocus(event){
     const keydownLeft = 37;
     const keydownRight = 39;
     if(event.keyCode === keydownLeft || event.keyCode === keydownRight){
          tab[tabFocus].setAttribute('tabindex',-1);
     }
     if(event.keyCode === keydownRight) {
          tabFocus++;
          if(tabFocus >= tab.length){
               tabFocus = 0;
          }
     }
     if(event.keyCode === keydownLeft){
          tabFocus--;
          if(tabFocus < 0){
               tabFocus = tab.length - 1;
          }
     }
     tab[tabFocus].setAttribute('tabindex',0);
     tab[tabFocus].focus();
}
tabList.addEventListener('keydown',changeTabFocus);
function hideContent(parent,content) {
     parent.querySelectorAll(content).forEach((item) => item.setAttribute("hidden",true));
}
function showContent(parent,content) {
     parent.querySelector(content).removeAttribute('hidden');
}
function changeTabPanel(event){
     const targetTab = event.target;
     const targetPanel = targetTab.getAttribute("aria-controls");
     const targetImage = targetTab.getAttribute("data-image");
     const tabContainer = targetTab.parentNode;
     const mainContainer = tabContainer.parentNode;
     tabContainer.querySelector('[aria-selected="true"]').setAttribute("aria-selected",false);
     targetTab.setAttribute("aria-selected", true);
     hideContent(mainContainer,'[role="tabpanel"]');
     showContent(mainContainer,[`#${targetPanel}`]);
     hideContent(mainContainer,'picture');
     showContent(mainContainer,[`#${targetImage}`]);
}
tab.forEach((tabs) => {
     tabs.addEventListener('click',changeTabPanel);
});