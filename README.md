# 🎹 MIDI Galaga Controller - Sintetizador Web

Un controlador MIDI web interactivo que funciona como sintetizador sin necesidad de dispositivos MIDI físicos.

## ✨ Características

- **🎵 Sintetizador Web**: Genera sonido usando Web Audio API
- **🖱️ Control por Mouse**: Haz clic en las naves para reproducir sonidos
- **⌨️ Soporte de Teclado**: Usa las teclas A, S, D, F, G, H, J, K para tocar
- **📱 Compatible con Móviles**: Soporte táctil completo
- **🎛️ Controles de Audio**:
  - Control de volumen maestro
  - Selector de tipo de onda (Sine, Square, Sawtooth, Triangle)
- **🎨 Interfaz Atractiva**: Diseño futurista con efectos visuales
- **🎼 Escala Musical**: 8 notas en escala de Do mayor (C4-C5)

## 🚀 Cómo Usar

### Instalación
1. Clona o descarga el repositorio
2. Abre `index.html` en tu navegador web
3. ¡Empieza a tocar!

### Controles
- **Mouse**: Haz clic y mantén presionado en las naves para reproducir sonidos
- **Teclado**: 
  - A = C4 (Do)
  - S = D4 (Re)
  - D = E4 (Mi)
  - F = F4 (Fa)
  - G = G4 (Sol)
  - H = A4 (La)
  - J = B4 (Si)
  - K = C5 (Do)
- **Controles de Audio**:
  - Slider de volumen para ajustar el volumen maestro
  - Selector de tipo de onda para cambiar el timbre

## 🛠️ Tecnologías Utilizadas

- **HTML5**: Estructura de la aplicación
- **CSS3**: Estilos y animaciones
- **JavaScript**: Lógica de la aplicación
- **Web Audio API**: Generación de sonido en tiempo real

## 📁 Estructura del Proyecto

```
web-midi-cc-controller/
├── index.html          # Página principal
├── style.css           # Estilos y animaciones
├── script.js           # Lógica principal de la aplicación
├── audio.js            # Sistema de audio y sintetizador
├── ship1.png           # Imagen de las naves
├── README.md           # Documentación
└── analysis.md         # Análisis técnico del proyecto
```


### Características Técnicas
- **Envolvente de Audio**: Fade in/out suave para evitar clicks
- **Gestión de Osciladores**: Control individual de cada nota
- **Responsive Design**: Adaptación automática a diferentes tamaños de pantalla
- **Optimización Móvil**: Eventos táctiles optimizados
- **Prevención de Errores**: Manejo robusto del contexto de audio

## 🎯 Uso Recomendado

1. **Para Músicos**: Experimenta con diferentes tipos de ondas y crea melodías
2. **Para Desarrolladores**: Estudia la implementación de Web Audio API
3. **Para Educación**: Enseña conceptos básicos de síntesis de audio
4. **Para Diversión**: ¡Simplemente disfruta tocando música!

## 🌐 Compatibilidad

- ✅ Chrome/Chromium
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Dispositivos móviles (iOS/Android)

## 📝 Notas Técnicas

- El proyecto no requiere Node.js ni servidor backend
- Funciona completamente en el navegador
- No necesita instalación de dependencias
- Compatible con todos los navegadores modernos que soporten Web Audio API


