export const scrollToElementId = (id) => {
  document.getElementById(id).scrollIntoView();
  document.activeElement.blur();
};

export const scrollToTop = () => {
  document.getElementsByTagName('html')[0].scrollIntoView();
};
