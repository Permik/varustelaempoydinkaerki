
const VARUSTELEKA_ORIGIN = 'https://www.varusteleka.fi';
const VARUSTELEKA_ORIGIN_EN = 'https://www.varusteleka.com';


chrome.sidePanel
  .setPanelBehavior({ openPanelOnActionClick: true })
  .catch((error) => console.error(error));

chrome.tabs.onUpdated.addListener(async (tabId, info, tab) => {
  if (!tab.url) return;
  const url = new URL(tab.url);
  console.log(url)
  // Enables the side panel on Varusteleka
  if (url.origin === VARUSTELEKA_ORIGIN || url.origin === VARUSTELEKA_ORIGIN_EN) {

    chrome.sidePanel
    .setPanelBehavior({ openPanelOnActionClick: true })
    .catch((error) => console.error(error));
    
    await chrome.sidePanel.setOptions({
      tabId,
      path: 'sidepanel.html',
      enabled: true
    });
    console.log("yes")
  } else {
    // Disables the action button opening the sidepanel
    chrome.sidePanel
    .setPanelBehavior({ openPanelOnActionClick: false })
    .catch((error) => console.error(error));

    // Sets the extension action to open a popup that'll direct the user to buy Varusteleka name tags
    chrome.action.setPopup({ popup: "popup.html", tabId: tabId })

    // Disables the side panel on all other sites
    await chrome.sidePanel.setOptions({
      tabId,
      enabled: false
    });
    
    console.log("disable")
  }
});