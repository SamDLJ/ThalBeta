function store_session() {
  document.getElementById("world_id_info").innerHTML = sessionStorage.getItem("ws");
  document.getElementById("save_state_info").innerHTML = sessionStorage.getItem("ss");
}

export function reset_game() {
  window.location.href='index.html';
}

export function new_game() {
  var x = document.getElementById("world_seed").value;
  var y = document.getElementById("save_state").value;
  sessionStorage.setItem("ws", x);
  sessionStorage.setItem("ss", y);
  window.location.href='new_game.html'; // send data here
}