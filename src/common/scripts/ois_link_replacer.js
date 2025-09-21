(function() {
  function tryNavigation() {
    const menuId = window.location.hash.substring(1);
    if (menuId && /^a\d+$/.test(menuId)) {
      window.open_menyy(menuId);
    }
  }

  tryNavigation();
  window.addEventListener('hashchange', tryNavigation);

  document.querySelectorAll('a[id^=\'a\']').forEach((a) => {
    const menuId = a.id;
    a.href = `#${menuId}`;
  });
})();
