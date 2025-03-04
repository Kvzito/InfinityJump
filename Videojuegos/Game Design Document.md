# InfinityDrive 
# Created by Sliver way syudios


#### _Participantes_

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
6. [Horario](#horario)

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

### **Mechanics**

Are there any interesting mechanics? If so, how are you going to accomplish them? Physics, algorithms, etc.

## _Level Design_

---

_(Note : These sections can safely be skipped if they&#39;re not relevant, or you&#39;d rather go about it another way. For most games, at least one of them should be useful. But I&#39;ll understand if you don&#39;t want to use them. It&#39;ll only hurt my feelings a little bit.)_

### **Themes**

1. Forest
    1. Mood
        1. Dark, calm, foreboding
    2. Objects
        1. _Ambient_
            1. Fireflies
            2. Beams of moonlight
            3. Tall grass
        2. _Interactive_
            1. Wolves
            2. Goblins
            3. Rocks
2. Castle
    1. Mood
        1. Dangerous, tense, active
    2. Objects
        1. _Ambient_
            1. Rodents
            2. Torches
            3. Suits of armor
        2. _Interactive_
            1. Guards
            2. Giant rats
            3. Chests

_(example)_

### **Game Flow**

1. Player starts in forest
2. Pond to the left, must move right
3. To the right is a hill, player jumps to traverse it (&quot;jump&quot; taught)
4. Player encounters castle - door&#39;s shut and locked
5. There&#39;s a window within jump height, and a rock on the ground
6. Player picks up rock and throws at glass (&quot;throw&quot; taught)
7. … etc.

_(example)_

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


## _Sounds/Music_

---

### **Style Attributes**

Again, consistency is key. Define that consistency here. What kind of instruments do you want to use in your music? Any particular tempo, key? Influences, genre? Mood?

Stylistically, what kind of sound effects are you looking for? Do you want to exaggerate actions with lengthy, cartoony sounds (e.g. mario&#39;s jump), or use just enough to let the player know something happened (e.g. mega man&#39;s landing)? Going for realism? You can use the music style as a bit of a reference too.

 Remember, auditory feedback should stand out from the music and other sound effects so the player hears it well. Volume, panning, and frequency/pitch are all important aspects to consider in both music _and_ sounds - so plan accordingly!

### **Sounds Needed**

1. Effects
    1. Soft Footsteps (dirt floor)
    2. Sharper Footsteps (stone floor)
    3. Soft Landing (low vertical velocity)
    4. Hard Landing (high vertical velocity)
    5. Glass Breaking
    6. Chest Opening
    7. Door Opening
2. Feedback
    1. Relieved &quot;Ahhhh!&quot; (health)
    2. Shocked &quot;Ooomph!&quot; (attacked)
    3. Happy chime (extra life)
    4. Sad chime (died)

_(example)_

### **Music Needed**

1. Slow-paced, nerve-racking &quot;forest&quot; track
2. Exciting &quot;castle&quot; track
3. Creepy, slow &quot;dungeon&quot; track
4. Happy ending credits track
5. Rick Astley&#39;s hit #1 single &quot;Never Gonna Give You Up&quot;

_(example)_


## _Schedule_

---

_(define the main activities and the expected dates when they should be finished. This is only a reference, and can change as the project is developed)_

1. develop base classes
    1. base entity
        1. base player
        2. base enemy
        3. base block
  2. base app state
        1. game world
        2. menu world
2. develop player and basic block classes
    1. physics / collisions
3. find some smooth controls/physics
4. develop other derived classes
    1. blocks
        1. moving
        2. falling
        3. breaking
        4. cloud
    2. enemies
        1. soldier
        2. rat
        3. etc.
5. design levels
    1. introduce motion/jumping
    2. introduce throwing
    3. mind the pacing, let the player play between lessons
6. design sounds
7. design music

_(example)_
