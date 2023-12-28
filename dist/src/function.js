"use strict";
function marcarDone(ele) {
  console.log(ele);
  const butt = document.querySelector(".buttDone");
  const formData = new FormData();
  const payload = butt === null || butt === void 0 ? void 0 : butt.parentNode;
  fetch("/");
}
function borrarTask(elem) {
  console.log(elem);
  const butt = document.querySelector(`#${elem}-id`);
  const formData = new FormData();
  fetch("/borrarTask", {
    method: "POST",
    body: formData,
  });
}
//# sourceMappingURL=function.js.map
