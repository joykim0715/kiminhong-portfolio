export function mailtoHref(email: string): string {
  return `mailto:${email.trim()}`;
}

/** 국내 휴대폰 번호 → tel: 링크 (하이픈·공백 제거) */
export function telHref(phone: string): string {
  const digits = phone.replace(/[^\d]/g, "");
  return digits ? `tel:${digits}` : "#";
}

export function isExternalHref(href: string): boolean {
  return href.startsWith("http://") || href.startsWith("https://");
}

export function shouldOpenInNewTab(href: string): boolean {
  if (href === "#" || href.startsWith("#")) return false;
  return isExternalHref(href) || href.endsWith(".pdf");
}
