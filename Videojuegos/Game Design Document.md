# InfinityDrive 



#### _Participantes_
Creado por el estudio Silver Way

- Santiago Cordova Molina
- Maria Rivera Gutierrez
- Kevin Javier Esquivel Villafuerte

  
###### **Aviso de derechos de autor/Información del autor**

## _Game Design Document_

## _Index_

---

1. [Índice](#índice)
2. [Diseño de juegos](#game-design)
    1. [Resumen] (#resumen)
    2. [Juego](#juego)
    4. [Mentalidad](#mindset)
3. [Técnico](#técnico)
    1. [Pantallas] (#pantallas)
    2. [Controles] (#controles)
    3. [Mecánica](#mecánica)
2. [Diseño de niveles](#level-design)
    1. [Temas](#temas)
        1. Ambiente
        2. Objetos
            1. Ambiente
            2. Interactivo
        3. Desafíos
    2. [Flujo de juego](#game-flow)
3. [Desarrollo] (#desarrollo)
    1. [Clases abstractas](#abstract-classes--components)
    2. [Clases derivadas](#derived-classes--component-compositions)
4. [Gráficos](#gráficos)
    1. [Atributos de estilo](#style-attributes)
    2. [Gráficos necesarios] (#gráficos necesarios)
5. [Sonidos/Música](#soundsmusic)
    1. [Atributos de estilo](#style-attributes-1)
    2. [Sonidos necesarios] (#sonidos-necesarios)
    3. [Música necesaria] (#música-necesaria)
6. [Itinerario](#itinerario)

## _Diseño del Juego_

---

### **Resumen**

Los jugadores controlan un coche que debe navegar a través de mapas dinámicos e ilustrados, superando obstáculos y recogiendo monedas para mejorar su vehículo y alcanzar la meta. Con cada desafío, deben adaptarse, optimizar su carro y perfeccionar sus habilidades para progresar más. 

### **Juego**

El objetivo del juego es conducir durante el mayor tiempo posible, cubriendo la mayor distancia posible, evitando con habilidad los obstáculos a lo largo del camino. A medida que los jugadores progresan, el entorno cambia, introduciendo nuevos desafíos que requieren un pensamiento rápido y un control preciso. Dado que el juego tiene lugar en una ciudad con un estilo de arte ilustrado, los obstáculos incluirán baches, puentes y plataformas que el jugador debe navegar. El coche se controla mediante las teclas de flecha, lo que requiere que el jugador controle cuidadosamente la velocidad-ralentización para evitar peligros o acelerar para despejar los huecos y maximizar la distancia. La toma de decisiones estratégicas es crucial, ya que los jugadores deben analizar los mejores caminos para tomar mientras recogen monedas. Estas monedas se pueden usar para comprar mejoras, ya sea aumentos temporales o mejoras permanentes, para mejorar el rendimiento del carro y aumentar sus posibilidades de lograr una puntuación más alta. 

### **Mentalidad**

El juego está diseñado para desafiar y involucrar a los jugadores, fomentando una mentalidad de adaptación, estrategia y mejora continua. Los mapas dinámicos e ilustrados, junto con la dificultad cada vez mayor, crean una sensación de emoción y logro. Los jugadores se sentirán motivados para perfeccionar sus habilidades y superar sus límites a medida que progresan. Al manejar cuidadosamente la velocidad, navegar por los obstáculos y hacer un uso estratégico de las mejoras, experimentarán un equilibrio entre el riesgo y la recompensa. Este enfoque fomenta un sentido de aventura y determinación, manteniendo a los jugadores comprometidos y ansiosos por mejorar con cada intento.

## _Técnico

---

### **Pantallas**

1. Pantalla de título
    1. Opciones
2. Selección de nivel
3. Juego
    1. Inventario
    2. Evaluación/Siguiente nivel
4. Créditos finales

_(ejemplo)_

### **Controles**

- La flecha derecha hará que el coche avance y si la dejas presionada el coche empezará a acelerar.
- La flecha izquierda hará que el coche frene si está en movimiento y que vaya para atrás si se deja presionado.
- Con la flecha de arriba el coche podrá hacer un pequeño salto. Este salto será disponible solo al adquirir la mejora de salto.
- Con la barra espaciadora el jugador podrá hacer un turbo que dura 1 segundo y hace que el coche sea mas veloz. Esta mejora está disponible en la tienda.
- Con la tecla esc el jugador salirse de las diferentes pantallas y regresar a la anterior
- Presionando la tecla “T” el jugador entrara a la tienda
- Con la tecla “P” el jugador podrá poner el juego en pausa.

### **Mecánicas**

EL juego se basa en un carro que debe superar diversos obstáculos mientras controla su velocidad. La mecánica más compleja de implmentar es el sisite de aceleración y frenado.

Cuando el jugador mantiene presionada la tecla de la flecha derecha, el carro incrementa su velocidad progresivamente. Esto permite completar el nivel en menos tiempo y facilita el cruce de ciertos obstáculos que requieren impulso. Sin embargo, al presionar la tecla de la flecha izquierda, se aplicará una fuerza de fricción que reducirá la velocidad del vehículo o permitirá detenerlo por completo.

Para lograr esta mecánica, utilizaremos principios de física dentro del algoritmo del juego, específicamente:

- **Aceleración:** Se implementará un sistema donde la velocidad del carro aumente progresivamente al mantener la tecla de avance presionada, con un límite máximo establecido.
- **Desaceleración y frenado:** Se simulará la pérdida de velocidad cuando el jugador deja de acelerar o presiona la tecla de frenado. Se calculará la fricción entre las ruedas y la superficie del camino.
- **Impacto con obstáculos:** Si el carro choca con un obstáculo, su velocidad disminuirá bruscamente o se detendrá dependiendo del tipo de colisión.
- **Física de salto y caída:** Algunos obstáculos pueden requerir que el carro tome impulso para cruzar plataformas o esquivar huecos. La velocidad influirá en la distancia que el vehículo pueda recorrer en el aire.

Cada una de estas interacciones estará integrada en el algoritmo del juego, activándose en respuesta a las acciones del jugador. Además, si el jugador no logra superar un obstáculo y pierde la partida, se reiniciará la simulación con nuevas variables para mantener la rejugabilidad.

## _Diseño de Niveles_

---

### **Tema**

1. Cuidad
    1. Ammbiente
        1. Divertido, atento, movido, activo
    2. Objetos
        1. _Ambiente_
            1. Calle
            2. Edificios
            3. Sol
            4. Ventanas con luces
            5. Fondo cuadrado
        2. _Interactive_
            1. Puentes
            2. Baches
            3. Fuego
            4. Plataformas
            5. Subidas
            6. Bajadas
            7. Curvas

### **Flujo del Juego**

1. El jugador empieza a la izquierda de la pantalla.
2. Debe avanzar hacia el frente, comenzando con poca velocidad.
3. Mientras más tiempo mantenga presionada la tecla de avance, más rápido avanzará el carro.
4. Al encontrarse con un bache, deberá reducir su velocidad para evitar perder el control.
5. Si encuentra una curva, necesitará la velocidad adecuada para girar sin problemas.
6. Si se encuentra con una plataforma, deberá avanzar con paciencia y controlar bien el carro para superarla.
7. Si hay una pendiente, ya sea de subida o bajada, deberá ajustarse a la velocidad correcta para no perder el equilibrio ni dañar el vehículo.
8. Después de superar cierto número de obstáculos, llegará a una bandera que indica que el nivel ha sido completado.
9. El siguiente nivel tendrá obstáculos más difíciles.
10. Este proceso se repetirá hasta que el jugador pierda al no lograr superar un obstáculo.

## _Development_

---

### **Abstract Classes / Components**

1. BasePhysics
    1. BasePlayer
    2. BaseEnemy
    3. BaseObject
2. BaseObstacle
3. BaseInteractable

_(example)_

### **Derived Classes / Component Compositions**

1. BasePlayer
    1. PlayerMain
    2. PlayerUnlockable
2. BaseEnemy
    1. EnemyWolf
    2. EnemyGoblin
    3. EnemyGuard (may drop key)
    4. EnemyGiantRat
    5. EnemyPrisoner
3. BaseObject
    1. ObjectRock (pick-up-able, throwable)
    2. ObjectChest (pick-up-able, throwable, spits gold coins with key)
    3. ObjectGoldCoin (cha-ching!)
    4. ObjectKey (pick-up-able, throwable)
4. BaseObstacle
    1. ObstacleWindow (destroyed with rock)
    2. ObstacleWall
    3. ObstacleGate (watches to see if certain buttons are pressed)
5. BaseInteractable
    1. InteractableButton

_(example)_

## _Graphics_

---

### **Style Attributes**

What kinds of colors will you be using? Do you have a limited palette to work with? A post-processed HSV map/image? Consistency is key for immersion.

What kind of graphic style are you going for? Cartoony? Pixel-y? Cute? How, specifically? Solid, thick outlines with flat hues? Non-black outlines with limited tints/shades? Emphasize smooth curvatures over sharp angles? Describe a set of general rules depicting your style here.

Well-designed feedback, both good (e.g. leveling up) and bad (e.g. being hit), are great for teaching the player how to play through trial and error, instead of scripting a lengthy tutorial. What kind of visual feedback are you going to use to let the player know they&#39;re interacting with something? That they \*can\* interact with something?

### **Graphics Needed**

1. Characters
    1. Human-like
        1. Goblin (idle, walking, throwing)
        2. Guard (idle, walking, stabbing)
        3. Prisoner (walking, running)
    2. Other
        1. Wolf (idle, walking, running)
        2. Giant Rat (idle, scurrying)
2. Blocks
    1. Dirt
    2. Dirt/Grass
    3. Stone Block
    4. Stone Bricks
    5. Tiled Floor
    6. Weathered Stone Block
    7. Weathered Stone Bricks
3. Ambient
    1. Tall Grass
    2. Rodent (idle, scurrying)
    3. Torch
    4. Armored Suit
    5. Chains (matching Weathered Stone Bricks)
    6. Blood stains (matching Weathered Stone Bricks)
4. Other
    1. Chest
    2. Door (matching Stone Bricks)
    3. Gate
    4. Button (matching Weathered Stone Bricks)

_(example)_


## _Sonidos/Música_

---

### **Style Attributes**

Again, consistency is key. Define that consistency here. What kind of instruments do you want to use in your music? Any particular tempo, key? Influences, genre? Mood?

Stylistically, what kind of sound effects are you looking for? Do you want to exaggerate actions with lengthy, cartoony sounds (e.g. mario&#39;s jump), or use just enough to let the player know something happened (e.g. mega man&#39;s landing)? Going for realism? You can use the music style as a bit of a reference too.

 Remember, auditory feedback should stand out from the music and other sound effects so the player hears it well. Volume, panning, and frequency/pitch are all important aspects to consider in both music _and_ sounds - so plan accordingly!

### **Sonidos  Necesitados**

1. Efectos
    1. Fuego
    2. Estruendo (al chocar con un objeto)
    3. Motor (cuando haces una mejora de valocidad)
    4. Freno (cuando se desacelera el carro)
2. Feedback
    1. Tinteo (al agarrar una moneda)
    2. Start (cuando empieza un nivel)
    3. Aplauso (cuando acabas el nivel)

### **Music Needed**

1. Slow-paced, nerve-racking &quot;forest&quot; track
2. Exciting &quot;castle&quot; track
3. Creepy, slow &quot;dungeon&quot; track
4. Happy ending credits track
5. Rick Astley&#39;s hit #1 single &quot;Never Gonna Give You Up&quot;

_(example)_


## _Itinerario_

---

1. determinar el concepto general del juego (primeras 3 semanas)
    1. mecánicas
        1. compra de habilidades
        2. aleatoriedad de mapas
        3. movimiento
  2. reglas
        1. gestión de habilidades
        2. requerimientos de 
2. desarrollo de documentación/issues del proyecto (semana 4)
    1. historias de usuario
    2. casos de uso
    3. issues
4. primer sprint (semana 5)
    1. inicialización base de datos
    2. assets del videojuego 
6. segundo sprint (semana 6)
    1. programación de clases abstractas del juego
        1. Habilidades
        2. Jugador
        3. Obstáculos
        4. Entorno
7. tercer sprint (semana 7)
    1. desarrollo de clases derivadas
    2. desarrollo de web
8. cuarto sprint (semana 8)
    1. conexión de web con base de datos y videojuego
    2. sprites y visuales
10. quinto spritn (semana 9)
    1. terminar visuales y audio
    2. web completamente terminada y funcional
11. semana 10
    1. presentación final del videojuego
