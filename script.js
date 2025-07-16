let midiOutput = null;

// CC base (por ejemplo, del 20 al 27)
const baseCC = 20;
const totalShips = 8;

// Frecuencias para cada nave (escala de Do mayor)
const frequencies = [
  261.63, // C4
  293.66, // D4
  329.63, // E4
  349.23, // F4
  392.00, // G4
  440.00, // A4
  493.88, // B4
  523.25  // C5
];

// Nombres de las notas
const noteNames = ['DO', 'RE', 'MI', 'FA', 'SOL', 'LA', 'SI', 'do'];

function createShips() {
  const container = document.getElementById("ships");
  
  for (let i = 0; i < totalShips; i++) {
    const shipWrapper = document.createElement("div");
    shipWrapper.classList.add("ship-wrapper");
    
    const ship = document.createElement("div");
    ship.classList.add("ship");
    ship.dataset.shipId = i;
    
    const noteLabel = document.createElement("div");
    noteLabel.classList.add("note-label");
    noteLabel.textContent = noteNames[i];
    
    const cc = baseCC + i;
    ship.title = `CC${cc} - ${noteNames[i]}`;
    
    const frequency = frequencies[i];

    // Eventos de mouse
    ship.addEventListener("mousedown", (e) => {
      e.preventDefault();
      activateShip(i, frequency);
    });

    ship.addEventListener("mouseup", (e) => {
      e.preventDefault();
      deactivateShip(i);
    });

    ship.addEventListener("mouseleave", (e) => {
      deactivateShip(i);
    });

    // Eventos táctiles para dispositivos móviles
    ship.addEventListener("touchstart", (e) => {
      e.preventDefault();
      activateShip(i, frequency);
    });

    ship.addEventListener("touchend", (e) => {
      e.preventDefault();
      deactivateShip(i);
    });

    ship.addEventListener("touchcancel", (e) => {
      e.preventDefault();
      deactivateShip(i);
    });

    shipWrapper.appendChild(ship);
    shipWrapper.appendChild(noteLabel);
    container.appendChild(shipWrapper);
  }
}

function activateShip(id, frequency) {
  resumeAudioContext(); // Asegurar que el contexto de audio esté activo
  
  const ship = document.querySelector(`[data-ship-id="${id}"]`);
  ship.classList.add("active");
  
  playOscillator(id, frequency);
  
  // Mostrar indicador de nota activa
  updateActiveNoteDisplay(noteNames[id]);
}

function deactivateShip(id) {
  const ship = document.querySelector(`[data-ship-id="${id}"]`);
  ship.classList.remove("active");
  
  stopOscillator(id);
  
  // Limpiar indicador si no hay otras naves activas
  if (!document.querySelector(".ship.active")) {
    updateActiveNoteDisplay("");
  }
}

function updateActiveNoteDisplay(note) {
  const display = document.getElementById("active-note");
  if (display) {
    display.textContent = note ? `♪ ${note}` : "";
  }
}

function createControls() {
  const controlsContainer = document.createElement("div");
  controlsContainer.classList.add("controls");
  
  // Control de volumen
  const volumeContainer = document.createElement("div");
  volumeContainer.classList.add("control-group");
  
  const volumeLabel = document.createElement("label");
  volumeLabel.textContent = "Volumen: ";
  volumeLabel.htmlFor = "volume-slider";
  
  const volumeSlider = document.createElement("input");
  volumeSlider.type = "range";
  volumeSlider.id = "volume-slider";
  volumeSlider.min = "0";
  volumeSlider.max = "100";
  volumeSlider.value = "30";
  
  const volumeValue = document.createElement("span");
  volumeValue.id = "volume-value";
  volumeValue.textContent = "30%";
  
  volumeSlider.addEventListener("input", (e) => {
    const volume = e.target.value / 100;
    setMasterVolume(volume);
    volumeValue.textContent = `${e.target.value}%`;
  });
  
  volumeContainer.appendChild(volumeLabel);
  volumeContainer.appendChild(volumeSlider);
  volumeContainer.appendChild(volumeValue);
  
  // Control de tipo de onda
  const waveContainer = document.createElement("div");
  waveContainer.classList.add("control-group");
  
  const waveLabel = document.createElement("label");
  waveLabel.textContent = "Tipo de onda: ";
  waveLabel.htmlFor = "wave-select";
  
  const waveSelect = document.createElement("select");
  waveSelect.id = "wave-select";
  
  getWaveTypes().forEach(type => {
    const option = document.createElement("option");
    option.value = type;
    option.textContent = type.charAt(0).toUpperCase() + type.slice(1);
    if (type === getCurrentWaveType()) {
      option.selected = true;
    }
    waveSelect.appendChild(option);
  });
  
  waveSelect.addEventListener("change", (e) => {
    setWaveType(e.target.value);
  });
  
  waveContainer.appendChild(waveLabel);
  waveContainer.appendChild(waveSelect);
  
  // Indicador de nota activa
  const activeNoteContainer = document.createElement("div");
  activeNoteContainer.classList.add("control-group");
  
  const activeNoteDisplay = document.createElement("div");
  activeNoteDisplay.id = "active-note";
  activeNoteDisplay.classList.add("active-note-display");
  
  activeNoteContainer.appendChild(activeNoteDisplay);
  
  controlsContainer.appendChild(volumeContainer);
  controlsContainer.appendChild(waveContainer);
  controlsContainer.appendChild(activeNoteContainer);
  
  // Insertar controles antes del contenedor de naves
  const shipsContainer = document.getElementById("ships");
  shipsContainer.parentNode.insertBefore(controlsContainer, shipsContainer);
}

// Soporte para teclado
function setupKeyboardSupport() {
  const keyMap = {
    'KeyA': 0, // C4
    'KeyS': 1, // D4
    'KeyD': 2, // E4
    'KeyF': 3, // F4
    'KeyG': 4, // G4
    'KeyH': 5, // A4
    'KeyJ': 6, // B4
    'KeyK': 7  // C5
  };
  
  const activeKeys = new Set();
  
  document.addEventListener("keydown", (e) => {
    if (keyMap.hasOwnProperty(e.code) && !activeKeys.has(e.code)) {
      e.preventDefault();
      activeKeys.add(e.code);
      const shipId = keyMap[e.code];
      activateShip(shipId, frequencies[shipId]);
    }
  });
  
  document.addEventListener("keyup", (e) => {
    if (keyMap.hasOwnProperty(e.code) && activeKeys.has(e.code)) {
      e.preventDefault();
      activeKeys.delete(e.code);
      const shipId = keyMap[e.code];
      deactivateShip(shipId);
    }
  });
}

window.addEventListener("DOMContentLoaded", () => {
  createControls();
  createShips();
  setupKeyboardSupport();
  
  // Mostrar instrucciones
  console.log("🎹 Controles:");
  console.log("- Haz clic en las naves para reproducir sonidos");
  console.log("- Usa las teclas A, S, D, F, G, H, J, K para tocar");
  console.log("- Ajusta el volumen y tipo de onda con los controles");
});

