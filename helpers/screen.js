export const pageScroll = () => {
  setTimeout(() => {
    //scroll to element
    // .scrollHeight - 500);
    window.scrollTo({
      top: document.getElementById("__next").scrollHeight,
      left: 0,
      behavior: "smooth",
    });
    // window.scrollTo(0, 0);
  }, 1000);
};
