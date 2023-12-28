function marcarDone(elem) {
  var id = "".concat(elem, "-id");
  var divButton = document.getElementById(id);
  divButton.textContent = "Hecha";
  fetch("/markTask", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({ id: elem }),
  });
}
function borrarTask(elem) {
  var id = "".concat(elem, "-id");
  var divButton = document.getElementById(id);
  var divchild = divButton.parentNode.parentNode;
  divchild.parentNode.removeChild(divchild);
  fetch("/borrarTask", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({ id: elem }),
  });
}
