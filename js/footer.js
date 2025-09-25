(() => {
  const mount = document.getElementById("global-footer");
  if (!mount) return;

  // footer.html is in the SAME folder as the page (html/)
  const url = new URL("./footer.html", document.baseURI);

  fetch(url, { cache: "no-cache" })
    .then((res) => {
      if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
      return res.text();
    })
    .then((html) => {
      mount.innerHTML = html;
    })
    .catch((err) => console.error("Footer load failed:", err));
})();
