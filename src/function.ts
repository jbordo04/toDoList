function marcarDone() {
  const butt = document.querySelector(".buttDone");
  const formData = new FormData();
  const payload = butt?.parentNode;
  fetch("/");
}
function borrarTask(elem: any) {
  // const butt = document.querySelector(".buttDone");
  const formData = new FormData();
  const payload = elem.parentNode.parentNode;
  fetch("/borrarTask", {
    method: "POST",
    body: formData,
  });
}
