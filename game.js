const socket = io();
const map = document.getElementById("map");
const info = document.getElementById("provinceInfo");

let provinces = [];

socket.on("init", data => {
  provinces = data;
  drawMap();
});

function drawMap() {
  map.innerHTML = "";
  provinces.forEach((p, i) => {
    const div = document.createElement("div");
    div.className = "province";
    div.textContent = p.name + " (" + p.troops + ")";
    div.onclick = () => showInfo(p, i);
    map.appendChild(div);
  });
}

function showInfo(province, index) {
  info.innerHTML = `
    <h3>${province.name}</h3>
    <p>Truppen: ${province.troops}</p>
    <button onclick="recruit(${index})">+10 Truppen (-50 Gold)</button>
  `;
}

function recruit(index) {
  socket.emit("recruit", index);
}

socket.on("update", data => {
  provinces = data;
  drawMap();
});

