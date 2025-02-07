chrome.runtime.onInstalled.addListener(async () => {
  await chrome.storage.local.set({ enabled: true });
});

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (
    changeInfo.status === 'complete'
    && tab.url
    && tab.url.match(/https?:\/\/ois2\.taltech\.ee\/uusois\/uus_ois2\.tud_leht(?:#.*)?/)
  ) {
    const data = await chrome.storage.local.get('enabled');
    const isEnabled = data.enabled;
    if (isEnabled) {
      await chrome.scripting.executeScript({
        target: { tabId: tabId },
        files: ['scripts/ois_link_replacer.js'],
        world: 'MAIN',
      });
    }
  }
});

chrome.action.onClicked.addListener(async (tab) => {
  const data = await chrome.storage.local.get('enabled');
  const isEnabled = !data.enabled; // Toggle state
  await chrome.storage.local.set({ enabled: isEnabled });

  if (isEnabled) {
    await chrome.action.setIcon({
      path: {
        '16': '../icons/enabled16.png',
        '32': '../icons/enabled32.png',
        '48': '../icons/enabled48.png',
        '128': '../icons/enabled128.png',
      },
    });
  } else {
    await chrome.action.setIcon({
      path: {
        '16': '../icons/disabled16.png',
        '32': '../icons/disabled32.png',
        '48': '../icons/disabled48.png',
        '128': '../icons/disabled128.png',
      },
    });
  }
});
