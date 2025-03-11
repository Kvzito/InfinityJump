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
    1. [Resumen](#resumen)
    2. [Juego](#juego)
    4. [Mentalidad](#mindset)
3. [Técnico](#técnico)
    1. [Pantallas](#pantallas)
    2. [Controles](#controles)
    3. [Mecánica](#mecánica)
2. [Diseño de niveles](#level-design)
    1. [Temas](#temas)
        1. Ambiente
        2. Objetos
            1. Ambiente
            2. Interactivo
        3. Desafíos
    2. [Flujo de juego](#game-flow)
3. [Desarrollo](#desarrollo)
    1. [Clases abstractas](#abstract-classes--components)
    2. [Clases derivadas](#derived-classes--component-compositions)
4. [Gráficos](#gráficos)
    1. [Atributos de estilo](#style-attributes)
    2. [Gráficos necesarios](#gráficos-necesarios)
5. [Sonidos/Música](#soundsmusic)
    1. [Atributos de estilo](#style-attributes-1)
    2. [Sonidos necesarios](#sonidos-necesarios)
    3. [Música necesaria](#música-necesaria)
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
2. Selección de inicio de juego
    1. Pantalla de tienda
    2. Pantalla de inventario
4. Pantalla de juego
    1. Fondo Principal
    2. Obstaulos
    3. Pantalla de meta
5. Créditos finales

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

## _Desarrollo_

---

### **Clases abstractas **

1. JugadorBase
2. ObstaculoBase
3. ObjetoBase
4. MejoraBase


### **Clases derivadas **

1. JugadorBase
    1. JugadorPrincipal
    2. JugadorModificable
2. ObstaculoBase
    1. Bache
    2. Fuego
    3. Puente
    4. Caracol
    5. Rampa
    6. Elevacion
3. ObjetoBase
    1. Moneda
    2. Piso
    3. Fondo
    4. Meta
4. MejoraBase
    1. Parachoques
    2. LlantasResistentes
    3. Nitro



## _Graphics_

---

Para este juego vamos a usar un estilo de caricatura, para ser más específico sería un estilo como si un niño lo hubiera dibujado. Este estilo se podrá ver alrededor de todo el juego, tanto en el coche, en los obstáculos, como en los menús. Esto con la finalidad de hacer que el juego se sienta amigable desde la primera vez que lo juegas. 

Los colores que usaremos en el juego serán simples para mantener ese estilo visual que mencionamos anteriormente. El coche comenzará con un color rojo el cual podrás cambiar en la tienda por costo de monedas. Los obstáculos seran creados todos de color negro a menos que tengan partes que lo necesiten, por ejemplo si un obstaculo tiene fuego este si sera de los colores del fuego. 

Queremos hacer un nivel de tutorial el cual funcione como herramienta para que el jugador pueda aprender las mecánicas de los controles y del juego en general. Además de esto cada vez que un jugador termine un nivel y regrese a la pantalla de inicio de juego le pondremos un recordatorio de que puede entrar a la tienda a gastar su dinero en mejoras temporales o permanentes. Antes de comprarla se verá una pequeña descripción de qué es lo que hace dicha mejora.


Diseños: 

1. Coches
    1. Coche color rojo principal
     ![](https://github.com/Kvzito/InfinityDrivee/blob/main/Videojuegos/Imagenes/ModeloPrincipalCoche.PNG)
    2. Coche color verde
    ![](https://github.com/Kvzito/InfinityDrivee/blob/main/Videojuegos/Imagenes/ModeloPrincipalVerde.PNG)
    3. Coche color azul
    ![](https://github.com/Kvzito/InfinityDrivee/blob/main/Videojuegos/Imagenes/ModeloPrincipalAzul.PNG)

    4. Coche color morado
    ![](https://github.com/Kvzito/InfinityDrivee/blob/main/Videojuegos/Imagenes/ModeloPrincipalMorado.PNG)

    5. Coche color amarillo
    ![](https://github.com/Kvzito/InfinityDrivee/blob/main/Videojuegos/Imagenes/ModeloPrincipalAmarillo.PNG)

    6. Coche color naranja
    ![](https://github.com/Kvzito/InfinityDrivee/blob/main/Videojuegos/Imagenes/ModeloPrincipalNaranja.PNG)

2. Obstaculos
    1. Línea recta: Este obstáculo no tiene ninguna dificultad y solo es una línea recta
       
    ![](https://github.com/Kvzito/InfinityDrivee/blob/main/Videojuegos/Imagenes/ObstaculoLinea.jpg)

    2. Triángulo: Este obstáculo empieza con una línea recta y después de convierte en un triángulo en el que el coche tiene que subir y bajar con cuidado
       
    ![](https://github.com/Kvzito/InfinityDrivee/blob/main/Videojuegos/Imagenes/ObstaculoTriangulo.jpg)

    3. Caida:  En este obstáculo el coche debe frenar para no caer de manera agresiva y estropearse, el coche tendrá que bajar y subir el obstáculo.
       
    ![](https://github.com/Kvzito/InfinityDrivee/blob/main/Videojuegos/Imagenes/ObstaculoCaida.jpg)

    4. Rampa: El coche deberá subir la rampa con buena velocidad para que la pueda saltar eficazmente, de otra manera el coche puede que se voltee.
       
    ![](https://github.com/Kvzito/InfinityDrivee/blob/main/Videojuegos/Imagenes/ObstaculoRampa.jpg)

    5. Baches: El coche tendrá que bajar la velocidad al llegar para que las llantas no se le pongan. Este obstáculo se puede evitar con la mejora de resistencia de la llanta.
        
    ![](https://github.com/Kvzito/InfinityDrivee/blob/main/Videojuegos/Imagenes/ObstaculoBache.jpg)

    6. Loop: El coche tendrá que tener una velocidad constante para que pueda subirse al loop y dar una vuelta completa sin que el coche se caiga.
        
    ![](https://github.com/Kvzito/InfinityDrivee/blob/main/Videojuegos/Imagenes/ObstaculoLoop.jpg)

    7. Montaña: En este obstáculo el coche tiene que subir por una rampa, pasar por una línea y luego bajar por una rampa.
        
    ![](https://github.com/Kvzito/InfinityDrivee/blob/main/Videojuegos/Imagenes/ObstaculoMonta%C3%B1a.jpg)

    8. Plataforma  Movediza: En este obstáculo las dos líneas que están en medio se irán moviendo de arriba a abajo y el coche tiene que calcular el momento exacto para avanzar y no caer.
        
    ![](https://github.com/Kvzito/InfinityDrivee/blob/main/Videojuegos/Imagenes/ObstaculoPlataformasMovedizas.jpg)

    9. Puente Movedizo: Las dos líneas que están verticales se moverán para formar una línea. Cuando llegue este punto el coche deberá avanzar antes de que se vuelvan a levantar.
        
    ![](https://github.com/Kvzito/InfinityDrivee/blob/main/Videojuegos/Imagenes/ObstaculoPuenteMovediso.jpg)

    10. Bola: Esta bola se estará moviendo en un péndulo y el jugador tiene que calcular en qué momento avanzar para que la bola no golpee el coche.
        
    ![](https://github.com/Kvzito/InfinityDrivee/blob/main/Videojuegos/Imagenes/ObstaculoBola.jpg)

    11. Caída en contacto: En el momento que el coche toque una de las líneas rojas, estas empezaran a caer obligando al jugador a no frenar.
        
    ![](https://github.com/Kvzito/InfinityDrivee/blob/main/Videojuegos/Imagenes/ObstaculoCaidaEnContacto.jpg)

    12. Fuego: Este obstáculo tiene 4 plataformas pequeñas que avientan fuego para arriba. Estas están sincronizadas en números pares y nones (Cuando las nones están prendidas las partes no). El jugador tiene que esperar el momento adecuado para avanzar y que no se queme su coche.
        
    ![](https://github.com/Kvzito/InfinityDrivee/blob/main/Videojuegos/Imagenes/ObstaculoFuego.jpg)


3. Fondos
    1. Fondo de edificios:
       ![](https://github.com/Kvzito/InfinityDrivee/blob/main/Videojuegos/Imagenes/FondoJuego.png)

4. Mejoras
    1. Permanentes:
         1. Turbo
            
            ![](https://github.com/Kvzito/InfinityDrivee/blob/main/Videojuegos/Imagenes/TurboMejora.JPG)
    2. Temporales
         1. Escudo
            
            ![](https://github.com/Kvzito/InfinityDrivee/blob/main/Videojuegos/Imagenes/EscudoMejora.JPG)
            
         2. Monedas Dobles
            
            ![](https://github.com/Kvzito/InfinityDrivee/blob/main/Videojuegos/Imagenes/MonedasMejora.JPG)
            
         3. Llantas resistentes
            
            ![](https://github.com/Kvzito/InfinityDrivee/blob/main/Videojuegos/Imagenes/LlantaMejora.JPG)

5. Icono del  juego
   
   ![](https://github.com/Kvzito/InfinityDrivee/blob/main/Videojuegos/Imagenes/IconoJuego.png)




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
