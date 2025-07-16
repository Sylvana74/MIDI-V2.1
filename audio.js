// Crea un contexto de audio al cargar la página
const audioContext = new (window.AudioContext || window.webkitAudioContext)();
let oscillators = {}; // Para guardar osciladores por slider
let gainNodes = {}; // Para controlar el volumen individual
let masterGain = audioContext.createGain(); // Volumen maestro
masterGain.connect(audioContext.destination);
masterGain.gain.setValueAtTime(0.3, audioContext.currentTime); // Volumen inicial al 30%

// Tipos de ondas disponibles
const waveTypes = ['sine', 'square', 'sawtooth', 'triangle'];
let currentWaveType = 'sine';

function playOscillator(id, frequency) {
  // Detener oscilador anterior si existe
  if (oscillators[id]) {
    oscillators[id].stop();
    delete oscillators[id];
    delete gainNodes[id];
  }
  
  // Crear nuevo oscilador
  const osc = audioContext.createOscillator();
  const gainNode = audioContext.createGain();
  
  // Configurar oscilador
  osc.type = currentWaveType;
  osc.frequency.setValueAtTime(frequency, audioContext.currentTime);
  
  // Configurar envolvente (fade in/out suave)
  gainNode.gain.setValueAtTime(0, audioContext.currentTime);
  gainNode.gain.linearRampToValueAtTime(0.5, audioContext.currentTime + 0.05); // Fade in rápido
  
  // Conectar: oscilador -> ganancia individual -> ganancia maestra -> destino
  osc.connect(gainNode);
  gainNode.connect(masterGain);
  
  osc.start();
  
  // Guardar referencias
  oscillators[id] = osc;
  gainNodes[id] = gainNode;
}

function stopOscillator(id) {
  if (oscillators[id] && gainNodes[id]) {
    // Fade out suave antes de detener
    gainNodes[id].gain.linearRampToValueAtTime(0, audioContext.currentTime + 0.1);
    
    setTimeout(() => {
      if (oscillators[id]) {
        oscillators[id].stop();
        delete oscillators[id];
        delete gainNodes[id];
      }
    }, 100);
  }
}

function setMasterVolume(volume) {
  // Volume debe estar entre 0 y 1
  const clampedVolume = Math.max(0, Math.min(1, volume));
  masterGain.gain.setValueAtTime(clampedVolume, audioContext.currentTime);
}

function setWaveType(type) {
  if (waveTypes.includes(type)) {
    currentWaveType = type;
    // Actualizar osciladores activos
    Object.keys(oscillators).forEach(id => {
      if (oscillators[id]) {
        oscillators[id].type = currentWaveType;
      }
    });
  }
}

function getCurrentWaveType() {
  return currentWaveType;
}

function getWaveTypes() {
  return waveTypes;
}

// Función para reanudar el contexto de audio (necesario para algunos navegadores)
function resumeAudioContext() {
  if (audioContext.state === 'suspended') {
    audioContext.resume();
  }
}

