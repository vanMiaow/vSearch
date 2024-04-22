
const search = (new URLSearchParams(window.location.search)).get("search");
document.getElementById("search").innerHTML = search;
document.getElementById("exhentai").href = `https://exhentai.org/?f_search=gid:${search}`;
document.getElementById("18comic").href  = `https://18comic.vip/album/${search}`;
document.getElementById("dlsite").href   = `https://www.dlsite.com/maniax/work/=/product_id/RJ${search}.html`;
document.getElementById("pixiv").href    = `https://www.pixiv.net/artworks/${search}`;
document.getElementById("sukebei").href  = `https://sukebei.nyaa.si/?f=0&c=0_0&q=${search}`;
