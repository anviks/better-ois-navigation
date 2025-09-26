const isExtensionEnabled = async () => {
  const data = await chrome.storage.local.get('enabled');
  return data.enabled;
};

const setExtensionEnabled = async (enabled) => {
  await chrome.storage.local.set({ enabled: enabled });
};

chrome.runtime.onInstalled.addListener(async () => {
  await setExtensionEnabled(true);
});

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  const allowedDomains = ['https://ois2.taltech.ee/', 'https://ois2.tlu.ee/'];

  if (
    changeInfo.status === 'complete'
    && tab.url
    && allowedDomains.some((domain) => tab.url.startsWith(domain))
  ) {
    const isEnabled = await isExtensionEnabled();
    if (isEnabled) {
      await chrome.scripting.executeScript({
        target: { tabId: tabId },
        files: ['scripts/ois_link_replacer.js'],
        world: 'MAIN',
      });
    }
  }
});

chrome.action.onClicked.addListener(async () => {
  const isEnabled = !(await isExtensionEnabled());
  await setExtensionEnabled(isEnabled);

  if (isEnabled) {
    await chrome.action.setIcon({
      path: {
        16: '../icons/enabled16.png',
        32: '../icons/enabled32.png',
        48: '../icons/enabled48.png',
        128: '../icons/enabled128.png',
      },
    });
  } else {
    await chrome.action.setIcon({
      path: {
        16: '../icons/disabled16.png',
        32: '../icons/disabled32.png',
        48: '../icons/disabled48.png',
        128: '../icons/disabled128.png',
      },
    });
  }
});
