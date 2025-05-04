import { customAlphabet } from "nanoid";
function is_safari() {
  let chrome_agent = navigator.userAgent.indexOf("Chrome") > -1;
  let safari_agent = navigator.userAgent.indexOf("Safari") > -1;
  if (chrome_agent && safari_agent) safari_agent = false;
  return safari_agent;
}
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
const _nanoid = customAlphabet("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz", 21);
function nanoid() {
  return _nanoid();
}
function formatDate(dateString, withTime) {
  const date = new Date(dateString);
  {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    });
  }
}
export {
  classNames as c,
  formatDate as f,
  is_safari as i,
  nanoid as n
};
