const NAV_SELECTOR = ".nav-bar";
const HIDDEN_CLASS = "nav-bar--panel-hidden";
const BODY_CLASS = "project-panel-open";

export function hideNavBarForPanel() {
  document.body.classList.add(BODY_CLASS);
  document.querySelector<HTMLElement>(NAV_SELECTOR)?.classList.add(HIDDEN_CLASS);
}

export function showNavBarAfterPanel() {
  document.body.classList.remove(BODY_CLASS);
  document.querySelector<HTMLElement>(NAV_SELECTOR)?.classList.remove(HIDDEN_CLASS);
}
