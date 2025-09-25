(function () {
  const loader = document.getElementById("page-loader");
  if (!loader) return;

  const show = () => loader.classList.add("is-active");
  const hide = () => loader.classList.remove("is-active");

  // Hide when the page finishes loading (also handles back/forward cache)
  window.addEventListener("load", hide);
  window.addEventListener("pageshow", (e) => {
    if (e.persisted) hide();
  });

  // Show when navigating via internal <a> links
  document.addEventListener("click", (e) => {
    const a = e.target.closest("a[href]");
    if (!a) return;

    // ignore new tabs / modifiers / downloads / anchors / external
    if (a.target && a.target !== "_self") return;
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

    const href = a.getAttribute("href");
    if (
      !href ||
      href.startsWith("#") ||
      href.startsWith("mailto:") ||
      href.startsWith("tel:") ||
      a.hasAttribute("download")
    )
      return;

    let url;
    try {
      url = new URL(a.href, location.href);
    } catch {
      return;
    }
    if (url.origin !== location.origin) return;
    if (url.href === location.href) return; // same page

    e.preventDefault();
    show();
    setTimeout(() => {
      location.href = url.href;
    }, 60); // let the fade render
  });

  // Also show if page is unloading by other means (refresh, address bar nav)
  window.addEventListener("beforeunload", show);
})();
