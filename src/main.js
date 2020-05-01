const $siteList = $(".siteList");
const logoA = `<svg class="icon" aria-hidden="true">
<use xlink:href="#icon-bilibili"></use>
</svg>`;
const logoB = `<svg class="icon" aria-hidden="true">
<use xlink:href="#icon-github"></use>
</svg>`;
const x = localStorage.getItem("x");
const xObject = JSON.parse(x);

const hashMap = xObject || [
  { logo: logoA, url: "https://www.bilibili.com" },
  { logo: logoB, url: "https://www.github.com" },
];

const simplifyUrl = (url) => {
  return url
    .replace("http://", "")
    .replace("https://", "")
    .replace("www.", "")
    .replace(/\/.*/, "");
};
const render = () => {
  $siteList.find("li:not(.last)").remove();
  hashMap.forEach((node, index) => {
    const $li = $(`<li>
    <div class="site">
    <div class="logo">${node.logo}</div>
    <div class="link">${simplifyUrl(node.url)}</div>
    <div class='close'><svg class="icon" aria-hidden="true">
    <use xlink:href="#icon-close"></use>
    </svg></div>
    </div>
    </li>`).insertBefore("li.last");
    $li.on("click", () => {
      window.open(node.url);
    });
    $li.on("click", ".close", (x) => {
      x.stopPropagation();
      hashMap.splice(index, 1);
      render();
    });
  });
  console.log(hashMap);
};

render();
$("#addButton").on("click", () => {
  let url = window.prompt("请问您想新增的网站是？");
  if (url.indexOf("http") !== 0) {
    url = "https://" + url;
  }
  console.log(url);
  hashMap.push({ logo: simplifyUrl(url)[0].toUpperCase(), url: url });
  render();
});

window.onbeforeunload = () => {
  const string = JSON.stringify(hashMap);
  localStorage.setItem("x", string);
};

$(document).on("keypress", (x) => {
  const { key } = x;
  console.log(key);
  for (let i = 0; i < hashMap.length; i++) {
    if (simplifyUrl(hashMap[i].url)[0] === key) {
      window.open(hashMap[i].url);
    }
  }
});

$(".Input").on("keypress", (x) => {
  x.stopPropagation();
});
$(".Input").on("focus", () => {
  if ($(".Input").val() === "使用百度搜索") {
    $(".Input").val("").css("color", "black");
  }
});
$(".Input").on("blur", () => {
  if ($(".Input").val() === "") {
    $(".Input").val("使用百度搜索").css("color", "grey");
  }
});
