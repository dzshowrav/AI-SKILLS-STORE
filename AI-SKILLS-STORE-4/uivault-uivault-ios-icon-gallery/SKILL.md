---
name: iOS Icon Gallery
description: UI Vault resource — App Icon Design
source: https://www.iosicongallery.com/
category: App Icon Design
type: external-resource
---

# iOS Icon Gallery

> App Icon Design · [Visit website](https://www.iosicongallery.com/)

## Overview

This is a curated resource from [UI Vault](https://en970.github.io/ui-vault/) — a hand-picked collection of premium UI design resources.

**Category:** App Icon Design

**Website:** https://www.iosicongallery.com/

## Reference Content

The following content was fetched from the resource's website:

iOS Icon Gallery blocks, etc --> document.body.classList.add("js"); /** * We'll use this elsewhere, just FYI * @param {'light' | 'dark' | 'system'} theme */ window.APPLY_THEME_TO_DOCUMENT = (theme) => { // Convert user preference of 'system' to 'dark' or 'light' let documentTheme = theme === "system" ? window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light" : theme; // Apply to the document if (documentTheme === "dark") { document.documentElement.setAttribute("data-theme", "dark"); } else { document.documentElement.removeAttribute("data-theme"); } }; // Set the initial theme let theme = window.localStorage.getItem("theme"); if (theme === null) { window.localStorage.setItem("theme", "system"); theme = "system"; } window.APPLY_THEME_TO_DOCUMENT(theme); // Respond to user changing system preference window .matchMedia("(prefers-color-scheme: dark)") .addEventListener("change", (e) => { const theme = window.localStorage.getItem("theme"); if (theme === "system") { if (e.matches) { document.documentElement.setAttribute("data-theme", "dark"); } else { document.documentElement.removeAttribute("data-theme"); } } }); ; iOS Icon Gallery --> iOS Icon Gallery iOS Icon Gallery Home Search Library Colors Designers Developers Categories Years Apps Miscellaneous RSS Made by Jim Nielsen macOS Icon Gallery watchOS Icon Gallery Light Dark System // Set the initial theme (we set the initial value in initialize-document.js // so there should always be a value in localStorage) const $form = document.querySelector("#js-theme-form"); const currentTheme = window.localStorage.getItem("theme"); const $el = $form.querySelector("[value=" + currentTheme + "]"); if ($el) $el.checked = true; $form.addEventListener("change", (e) => { const newTheme = e.target.value; window.APPLY_THEME_TO_DOCUMENT(newTheme); window.localStorage.setItem("theme", newTheme); }); Load more document.addEventListener("click", (e) => { const $el = e.target.closest("#next"); if (!$el) return; e.preventDefault(); const href = $el.getAttribute("href"); const target = $el.getAttribute("hx-target"); const select = $el.getAttribute("hx-select"); fetch(href) .then((res) => res.text()) .then((html) => { // Insert the new HTML const $html = new DOMParser().parseFromString(html, "text/html"); const $targetEl = $html.querySelector(target); document .querySelector(target) .insertAdjacentHTML("beforeend", $targetEl.innerHTML); // Update the button document.querySelector("#next").outerHTML = $html.querySelector("#next").outerHTML; }); });

## How to Use This Skill

When working with iOS Icon Gallery, reference this skill to:
- Understand the core features and capabilities
- Find the official documentation and examples
- Apply best practices from the UI Vault curation

## Related Resources

Visit the full [UI Vault](https://en970.github.io/ui-vault/) for more resources in the App Icon Design category.

---
*This skill was auto-generated from [iOS Icon Gallery](https://www.iosicongallery.com/) — a UI Vault curated resource.*
