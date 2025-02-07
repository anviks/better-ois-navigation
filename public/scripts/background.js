chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (
    changeInfo.status === 'complete'
    && tab.url
    && tab.url.match(/https?:\/\/ois2\.taltech\.ee\/uusois\/uus_ois2\.tud_leht(?:#.*)?/)
  ) {
    chrome.scripting.executeScript({
      target: { tabId: tabId },
      files: ['scripts/ois_link_replacer.js'],
      world: 'MAIN',
    });
  }
});