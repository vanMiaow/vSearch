
// create menu on installed
chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: "vSearch",
        title: "vSearch",
        contexts: ["selection", "image"]
  });
});

// search selection or image on clicked
chrome.contextMenus.onClicked.addListener((info, tab) => {
    console.log(info);
    if (info.menuItemId == "vSearch") {
        if ("selectionText" in info) {
            // selection
            const selection = info.selectionText;
            console.log(`selection: ${selection}`);
            if (selection.match(/^\d+$/i)) {
                // only numbers => local
                const search = selection;
                console.log(`select in local webpage: ${search}`);
                chrome.tabs.create({url: `select.html?search=${search}`, index: tab.index + 1, active: false});
            } else if (selection.match(/^(gid:?\s*|g\/)\d+$/i)) {
                // (gid: or g/) + numbers => exhentai
                const search = selection.match(/\d+/i);
                console.log(`search exhentai gallery: ${search}`);
                chrome.tabs.create({url: `https://exhentai.org/?f_search=gid:${search}`, index: tab.index + 1, active: false});
            } else if (selection.match(/^jm\s*\d+$/i)) {
                // jm + numbers => 18comic
                const search = selection.match(/\d+/i);
                console.log(`go to 18comic album: ${search}`);
                chrome.tabs.create({url: `https://18comic.vip/album/${search}`, index: tab.index + 1, active: false});
            } else if (selection.match(/^rj\s*\d+$/i)) {
                // rj + numbers => dlsite
                const search = selection.match(/\d+/i);
                console.log(`go to dlsite product: ${search}`);
                chrome.tabs.create({url: `https://www.dlsite.com/maniax/work/=/product_id/RJ${search}.html`, index: tab.index + 1, active: false});
            } else if (selection.match(/^(pid|pixiv):?\s*\d+$/i)) {
                // (pid: or pixiv:) + numbers => pixiv
                const search = selection.match(/\d+/i);
                console.log(`go to pixiv artwork: ${search}`);
                chrome.tabs.create({url: `https://www.pixiv.net/artworks/${search}`, index: tab.index + 1, active: false});
            } else if (selection.match(/^(?=\D*\d)[\w- ]+$/i)) {
                // code => javdb/sukebei
                const search = selection;
                if (info.pageUrl.match(/javdb\d*.com/i)) {
                    console.log(`search in sukebei: ${search}`);
                    chrome.tabs.create({url: `https://sukebei.nyaa.si/?f=0&c=0_0&q=${search}`, index: tab.index + 1, active: false});
                } else {
                    console.log(`search in javdb: ${search}`);
                    chrome.tabs.create({url: `https://javdb.com/search?q=${search}&f=all`, index: tab.index + 1, active: false});
                }
            } else {
                // characters => exhentai
                const search = selection;
                console.log(`search in exhentai: ${search}`);
                chrome.tabs.create({url: `https://exhentai.org/?f_search=${search}+l:chinese`, index: tab.index + 1, active: false});
            }
        } else if ("mediaType" in info && info.mediaType == "image") {
            // image
            const image = info.srcUrl;
            console.log(`image: ${image}`);
            // image => iqdb
            const search = image;
            console.log(`search in iqdb: ${search}`);
            chrome.tabs.create({url: `https://www.iqdb.org/?url=${search}`, index: tab.index + 1, active: false});
        } else {
            // impossible context type
        }
    } else {
        // impossible menu item
    }
});
