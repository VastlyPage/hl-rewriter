// Rule to redirect *.hl to *.hl.place
chrome.runtime.onInstalled.addListener(() => {
  const RULE = {
    id: 1,
    priority: 1,
    action: {
      type: 'redirect',
      redirect: {
        regexSubstitution: 'https://\\1.place\\2',
      },
    },
    condition: {
      regexFilter: '^https?://([^/]+\\.hl)(\\/.*|$)',
      resourceTypes: ['main_frame', 'sub_frame', 'stylesheet', 'script', 'image', 'xmlhttprequest', 'other'],
    },
  };

  chrome.declarativeNetRequest.updateDynamicRules({
    removeRuleIds: [RULE.id],
    addRules: [RULE],
  });
});

chrome.omnibox.onInputEntered.addListener((text) => {
  let newURL;
  if (text.endsWith(".hl")) {
  	newURL = `https://` + text;
  } else {
  	newURL = `https://` + text + ".hl";
  }

  chrome.tabs.update({ url: newURL });
});
