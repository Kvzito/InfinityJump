# Infinity Jump 🚀

#### _Participantes_

Creado por el estudio Silver Way Studios

- Santiago Cordova Molina
- Maria Rivera Gutierrez
- Kevin Javier Esquivel Villafuerte A01174634
  
###### **Aviso de derechos de autor/Información del autor**

## _Game Design Document_

## _Índice_

---

1. [Índice](#índice)
2. [Diseño del juego](#diseño-del-juego)
    1. [Resumen](#resumen)
    2. [Juego](#juego)
    3. [Mentalidad](#mentalidad)
3. [Técnico](#técnico)
    1. [Pantallas](#pantallas)
    2. [Controles](#controles)
    3. [Mecánicas](#mecánicas)
4. [Diseño de niveles](#diseño-de-niveles)
    1. [Temas](#temas)
    2. [Flujo de juego](#flujo-de-juego)
5. [Desarrollo](#desarrollo)
    1. [Clases abstractas](#clases-abstractas)
    2. [Clases derivadas](#clases-derivadas)
6. [Gráficos](#gráficos)
7. [Sonidos y Música](#sonidos-y-música)
    1. [Atributos de estilo](#atributos-de-estilo)
    2. [Sonidos y música necesarios](#sonidos-y-música-necesarios)
8. [Itinerario](#itinerario)

## _Diseño del Juego_

---

### **Resumen**

¡Malvin tiene un sueño increíble: llegar a la luna y conquistar al amor de su vida! Él salta continuamente, desplazándose verticalmente en un mapa con plataformas generadas aleatoriamente. Pero el camino no será fácil: tendrá que superar desafíos, enfrentarse a enemigos únicos y recoger mejoras. Para derrotar a los enemigos, deberá caer sobre ellos desde arriba y así poder avanzar al siguiente nivel.

¿Te atreves a acompañarlo en esta épica aventura llena de emoción y valentía? ¡La luna lo espera!

### **Juego**

Nuestro juego trata sobre Malvin, el personaje principal, quien debe saltar entre diferentes plataformas hasta alcanzar una determinada altura. Esta altura se logra superando una serie de obstáculos, divididos en 3 niveles. Cada nivel consta de un número determinado de plataformas (100, 150 y 200 respectivamente) y un mini jefe que aparece al final de cada uno.

Cada nivel está ambientado de forma distinta, representando el progreso del jugador tras derrotar a un jefe. Las plataformas y el fondo cambian según el nivel en el que se encuentra. Estas plataformas son el único medio para avanzar, ya que la pantalla mostrará únicamente el entorno vertical. Si el jugador no calcula bien el salto y falla en caer sobre una plataforma, morirá al caer, regresando al inicio del juego, sin importar el nivel alcanzado.

A lo largo de sus intentos, el jugador podrá conseguir mejoras, ya sean temporales, permanentes o instantáneas.  
- Ejemplo de mejora **temporal**: una catapulta que permite saltar cuatro plataformas de un solo brinco.  
- Ejemplo de mejora **permanente**: aumentar el poder de daño para derrotar enemigos más rápidamente.  
- Ejemplo de mejora **instantánea**: obtener vida extra.

Los mini jefes aparecen al superar la cantidad de plataformas correspondiente a cada nivel. Al llegar a ellos, se accede a una pantalla diferente donde no se puede caer, y donde las plataformas son prediseñadas. Estas permiten al jugador moverse con libertad para enfrentarse al jefe. Cada jefe tiene una barra de vida, y solo puede ser dañado si el jugador le cae encima, al estilo Mario Bros. Si el jugador colisiona con el jefe por cualquier otro lado, recibirá daño. Si la barra de vida del jugador llega a cero, morirá y deberá reiniciar.

### **Mentalidad**

El juego está diseñado para que el jugador ponga a prueba sus habilidades constantemente. Debido a la mecánica principal —el salto continuo—, el jugador debe estar siempre atento a sus movimientos. También debe observar el tipo y posición de las plataformas para planear cómo avanzar sin caer.

Además, debe controlar su precisión para dañar a los enemigos solo cayéndoles encima, evitando contacto por los lados. El único momento de respiro llega tras vencer a un mini jefe, lo cual es intencional: buscamos que ese momento de frenesí se vea recompensado con una breve pausa en la que el jugador pueda elegir sus mejoras favoritas para el futuro.

## _Técnico_

---

### **Pantallas**

- **Pantalla de inicio de sesión**
- **Pantalla de menú principal**
  1. **Pantalla principal del juego**
     - Pantalla de login
     - Pantalla de registro
     - Pantalla del juego, con todos los niveles:
       - Nivel 1
       - Enemigo 1
       - Nivel 2
       - Enemigo 2
       - Nivel 3
       - Enemigo 3
       - Final
     - Pantalla de ajustes:
       - Sonido
       - Música
     - Pantalla de pausa
     - Pantalla de Game Over
  2. **Pantalla de estadísticas**
  3. **Pantalla de historia**
  4. **Pantalla de instrucciones**
  5. **Pantalla de créditos**

### **Controles**

- Las flechas (`←` y `→`) y las teclas `A` y `D` sirven para desplazar al personaje en su eje X, de izquierda a derecha respectivamente.
- Como el jugador no necesita saltar manualmente, la flecha hacia arriba no tiene funcionalidad.
- Con la tecla `Esc` o `P` se despliega el menú de pausa.


### **Mecánicas**

---
Las plataformas en *Infinity Jump* se generan de manera aleatoria, exclusivamente en el eje X y según su tipo, ya que existen distintos tipos de plataformas para aumentar la dificultad. Sin embargo, siempre se generarán a intervalos regulares en el eje Y, con una distribución que se ajusta a la dificultad del nivel. A medida que el jugador asciende, habrá más plataformas y de mayor complejidad.

### **Plataformas**

Durante cada nivel, las plataformas tendrán un diseño diferente acorde a la temática:
- En el bosque: ramas, flores, plantas.
- En el cielo: nubes, pajaros.
- En el espacio: planetas, cohetes, esteroides.

Los *assets* de las plataformas cambiarán dependiendo del nivel y del tipo de plataforma. A medida que se avanza, las plataformas se vuelven más variadas y difíciles, obligando al jugador a usar mejoras para progresar.

Tipos de plataformas:

1. **Estática**  
   Una vez que el algoritmo posiciona esta plataforma, permanecerá fija en su lugar. Es la opción más sencilla para el jugador.

2. **Móvil**  
   Se desplaza horizontalmente en la misma coordenada Y. El jugador debe calcular mejor el momento para subirse. El personaje permanece sobre ella mientras se mueve.

3. **Desaparece**  
   Aparece en un lugar fijo, pero el jugador tiene un tiempo limitado para permanecer en ella antes de que desaparezca. Requiere saltar rápidamente.

4. **Un solo salto**  
   Al tocarla una vez, desaparece inmediatamente. No se puede permanecer en ella.

---

### **Movimientos**

El juego utiliza un sistema de físicas simplificado: el personaje tiene una velocidad de caída constante y está saltando continuamente. El jugador solo controla el movimiento horizontal usando las teclas de flechas para alcanzar las plataformas más cercanas.

Las colisiones determinan si el personaje aterrizó correctamente sobre una plataforma. Al hacerlo, rebota automáticamente. Existen mejoras que aumentan el impulso del salto. Este sistema permite alcanzar al mini jefe al final de cada nivel tras superar todas las plataformas. También hay mejoras que incrementan el daño del personaje.

---

### **Mejoras**

Existen tres tipos de mejoras: **temporales**, **permanentes** e **instantáneas**, cada una con funciones específicas para ayudar al jugador a avanzar, incluso en niveles de mayor dificultad.

#### *Temporales*

1. **Escudo**  
   Se recoge durante el nivel. Brinda una protección contra el enemigo y se desactiva después de recibir daño. No se conserva tras terminar el nivel.

2. **Súper Salto**  
   También se recoge en las plataformas y se activa automáticamente. Permite avanzar cuatro plataformas de un solo salto, ayudando a progresar más rápidamente.

#### *Permanentes*

Estas se obtienen al derrotar a un enemigo. El jugador puede elegir hasta 5 mejoras de cada tipo. Cada vez que selecciona una, se suman 20 puntos. Se mantienen incluso si el jugador pierde la partida, y se acumulan en partidas futuras.

1. **Más Vida**  
   Aumenta la resistencia contra enemigos y obstáculos.

2. **Más Daño**  
   Permite derrotar a los enemigos más rápido.

3. **Más Salto**  
   Facilita superar los niveles de plataformas más rápidamente.

#### *Instantáneas*

Se recogen durante un nivel y otorgan una bonificación inmediata de 20 puntos, pero solo duran mientras se juegue esa partida.

1. **Vida Extra**  
   Añade 20 puntos de vida, ya sea para recuperar vida perdida o tener un extra.

2. **Daño Extra**  
   Aumenta el daño en 20 puntos para facilitar la derrota del enemigo.

### **Enemigos**

Los enemigos que se encontrarán en el juego son principalmente los **mini jefes**. A partir de los niveles 2 y 3, algunas plataformas también contarán con una mecánica especial: si el jugador las toca por debajo, recibirá daño. Para vencer a los enemigos, será necesario **saltar sobre ellos**, al estilo clásico de plataformas. Cada jefe tendrá una barra de vida que se reduce con una cantidad específica de impactos desde arriba.

1. **Primer enemigo**  
   Se moverá libremente por todo el lienzo (*canvas*), generando trayectorias impredecibles.

2. **Segundo enemigo**  
   Se moverá horizontalmente sobre el mismo eje Y y lanzará proyectiles directamente hacia el personaje.

3. **Tercer enemigo**  
   Combina los patrones del primero y el segundo: se moverá como el primer enemigo, pero de forma más rápida, y además lanzará proyectiles mientras se desplaza.

---

## _Diseño de Niveles_

---

### **Temas**

1. 🌲 **Bosque**
   - **Estado**: Misterioso, pasivo, inquietante  
   - **Objetos**:
     - *Ambiente*: Árboles, montañas, animales del bosque, cielo despejado  
     - *Interactivo*: Ramas

2. ☁️ **Cielo**
   - **Estado**: Impredecible, dinámico  
   - **Objetos**:
     - *Ambiente*: Aviones, nubes enormes  
     - *Interactivo*: Nubes, pájaros

3. 🌌 **Espacio exterior**
   - **Estado**: Asfixiante, eufórico, frenético  
   - **Objetos**:
     - *Ambiente*: Planetas, estrellas fugaces  
     - *Interactivo*: Cohetes espaciales, OVNIs
    
### **Flujo de Juego**

1. El jugador comienza en el centro de la pantalla, debajo de las primeras plataformas visibles del primer nivel.

2. Al presionar la tecla de iniciar partida, el personaje empieza a **saltar automáticamente**, y el usuario debe usar las plataformas que aparecen encima para comenzar a ascender.

3. A medida que sube, encontrará mejoras —algunas de uso inmediato y otras que podrá guardar para después— además de plataformas con distintas mecánicas. Tendrá que pensar con rapidez para decidir cómo avanzar sin caer.

4. Al superar el número de plataformas necesarias por nivel, aparecerá un **portal** que lo llevará al mini jefe. En esta sección el jugador **no puede caerse**, pero sí puede morir si recibe demasiado daño del jefe.

5. Tras vencer al jefe, el jugador podrá elegir una mejora entre varias opciones disponibles. Una vez seleccionada, se generará una plataforma que, al saltarla, lo llevará al **portal de salida** ubicado en la parte superior de la pantalla.

6. Este proceso se repite a lo largo de **tres niveles**, cada uno con plataformas más desafiantes y enemigos más fuertes.

7. El juego concluye al derrotar al jefe del tercer nivel, mostrando cómo el personaje cumple su propósito y agradece al jugador por acompañarlo en su aventura.

##  _Desarrollo_

---

### **Clases abstractas**

1. MainCharacter
2. Jefe
3. Plataforma
4. PowerUP

### **Clases derivadas**

Extiende de jefe:
1. JefeNivel1
2. JefeNivel2
3. JefeFinal

Extiende de Plataforma
1. PlataformaMovimiento
2. PlataformaDestruible
3. PlataformaOnOff
4. PlataformaCambio

Extiende de PowerUP
1. Escudo
2. Salto
3. Más Vida
4. Más Daño
5. Más Salto
6. Vida extra
7. Daño extra

## _Gráficos_

---

Para este juego utilizaremos un estilo animado de **pixel art**. Este estilo estará presente en todo el juego: personajes (el principal y los enemigos), plataformas en los diferentes niveles y también en las distintas pantallas del juego. La finalidad de esto es que el juego mantenga una coherencia visual y se sienta como un mismo universo, incluso al avanzar de nivel. Todos los textos utilizarán una fuente pixelada, manteniéndose en línea con la temática.

Los colores serán llamativos, pero siempre acordes al ambiente de cada nivel, facilitando la identificación de elementos visuales. El personaje principal será siempre de color blanco para destacarse en cualquier escenario. Las plataformas cambiarán de color y forma dependiendo del nivel, simulando objetos del entorno (por ejemplo, en el bosque serán ramas de color verde y café).

### Diseños

#### 1. Personajes

1. **Personaje Principal**  
   ![malvin](https://github.com/Kvzito/InfinityJump/blob/main/Infinity_Jump/videogame/Assets/Jump1.PNG)

2. **Enemigo 1**  
   ![planta](https://github.com/Kvzito/InfinityJump/blob/main/Infinity_Jump/videogame/Assets/JefePlantaIzq.png)

3. **Enemigo 2**  
   ![mago](https://github.com/Kvzito/InfinityJump/blob/main/Infinity_Jump/videogame/Assets/Jefe2.png)

4. **Enemigo 3**  
   ![alien](https://github.com/Kvzito/InfinityJump/blob/main/Infinity_Jump/videogame/Assets/Jefe3.png)

---

#### 2. Plataformas

##### **Primer Nivel – Bosque**

- **Estático y móvil**  
  ![rama](https://github.com/Kvzito/InfinityJump/blob/main/Infinity_Jump/videogame/Assets/Plataforma1.png)

- **Desaparece**  
  ![flores](https://github.com/Kvzito/InfinityJump/blob/main/Infinity_Jump/videogame/Assets/desaparece.png)

- **Una vez**  
  ![bush](https://github.com/Kvzito/InfinityJump/blob/main/Infinity_Jump/videogame/Assets/bush.png)

##### **Segundo Nivel – Cielo**

- **Estático y móvil**  
  ![nube](https://github.com/Kvzito/InfinityJump/blob/main/Infinity_Jump/videogame/Assets/PlataformaNube.png)

- **Desaparece**  
  ![aguila](https://github.com/Kvzito/InfinityJump/blob/main/Infinity_Jump/videogame/Assets/aguila.png)

- **Una vez**  
  ![pajaro](https://github.com/Kvzito/InfinityJump/blob/main/Infinity_Jump/videogame/Assets/pajaroRojo.png)

##### **Tercer Nivel – Espacio**

- **Estático y móvil**  
  ![planeta](https://github.com/Kvzito/InfinityJump/blob/main/Infinity_Jump/videogame/Assets/plataformaEspacioUno.png)

- **Desaparece**  
  ![cohete](https://github.com/Kvzito/InfinityJump/blob/main/Infinity_Jump/videogame/Assets/cohete.png)

- **Una vez**  
  ![roca](https://github.com/Kvzito/InfinityJump/blob/main/Infinity_Jump/videogame/Assets/espacio.png)

---

#### 3. Fondos

1. **Fondo de bosque**  
   ![bosque](https://github.com/Kvzito/InfinityJump/blob/main/Infinity_Jump/videogame/Assets/Fondo%20Nivel%201.webp)

2. **Fondo de cielo**  
   ![cielo](https://github.com/Kvzito/InfinityJump/blob/main/Infinity_Jump/videogame/Assets/FondoCielo.png)

3. **Fondo de espacio**  
   ![espacio](https://github.com/Kvzito/InfinityJump/blob/main/Infinity_Jump/videogame/Assets/FondoEspacio.webp)

## _Sonidos y Música_

---

### **Atributos de estilo**

La música del juego variará según el nivel de dificultad en el que se encuentre el jugador. No habrá una sola pista para todo el juego; en cambio, cada etapa musical reflejará el progreso del jugador y su contexto.

Cada uno de los tres mini jefes tendrá una canción exclusiva que represente su dificultad. Además, cada nivel contará con su propio tema de plataformas: será más pasivo en comparación con los jefes, pero claramente diferenciable entre sí.

Los efectos de sonido serán claros y funcionales, brindando retroalimentación sin sobrecargar la experiencia auditiva. Queremos que estos sonidos ayuden al jugador a reaccionar rápidamente a lo que ocurre en pantalla sin distraerlo del juego.

### **Sonidos y música necesarios**

#### 🎧 Sonidos

- Efectos de movimiento: rebote en plataformas, choques con obstáculos, saltos.
- Sonidos de los jefes: movimientos, golpes, ataques especiales.

#### 🎵 Música

- Tema del menú: melodía tranquila pero anticipatoria, que prepare al jugador para comenzar.
- Música de niveles: una pista por nivel, adaptada a su ambiente (ej. misterioso en el bosque, intergaláctico en el espacio).
- Música de jefes: una pista única por jefe, más intensa y desafiante.

---

## _Itinerario_

---

1. **Semanas 1 a 3**  
   - Definir el concepto general del juego  
     - Mecánicas:  
       - Compra de habilidades  
       - Aleatoriedad en plataformas  
       - Movimiento automático y control  
     - Reglas:  
       - Gestión y selección de habilidades  
       - Requerimientos básicos del jugador  

2. **Semana 4**  
   - Desarrollo de documentación e issues  
     - Historias de usuario  
     - Casos de uso  
     - Issues iniciales para GitHub  

3. **Semana 5 – Primer Sprint**  
   - Inicialización de la base de datos  
   - Creación de los assets del videojuego  

4. **Semana 6 – Segundo Sprint**  
   - Programación de clases abstractas:  
     - Habilidades  
     - Jugador  
     - Obstáculos  
     - Entorno  

5. **Semana 7 – Tercer Sprint**  
   - Desarrollo de clases derivadas  
   - Desarrollo inicial de la web  

6. **Semana 8 – Cuarto Sprint**  
   - Conexión de la web con base de datos y el videojuego  
   - Implementación de sprites y visuales  

7. **Semana 9 – Quinto Sprint**  
   - Finalización de elementos visuales y de audio  
   - Web completamente funcional  

8. **Semana 10 – Cierre**  
   - Presentación final del videojuego  
