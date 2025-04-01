# Infinity Jump

#### _Participantes_

Creado por el estudio Silver Way

- Santiago Cordova Molina
- Maria Rivera Gutierrez
- Kevin Javier Esquivel Villafuerte

  
###### **Aviso de derechos de autor/Información del autor**

## _Game Design Document_

## _Índice_

---

1. [Índice](#índice)
2. [Diseño del juego](#diseño-del-juego)
    1. [Resumen](#resumen)
    2. [Juego](#juego)
    4. [Mentalidad](#mentalidad)
3. [Técnico](#técnico)
    1. [Pantallas](#pantallas)
    2. [Controles](#controles)
    3. [Mecánicas](#mecánicas)
2. [Diseño de niveles](#diseño-de-niveles)
    1. [Tema](#tema)
        1. Ambiente
        2. Objetos
            1. Ambiente
            2. Interactivo
        3. Desafíos
    2. [Flujo de juego](#flujo-de-juego)
3. [Desarrollo](#desarrollo)
    1. [Clases abstractas](#clases-abstractas)
    2. [Clases derivadas](#clases-derivadas)
4. [Gráficos](#gráficos)
5. [Sonidos y Música](#sonidos-y-música)
    1. [Atributos de estilo](#atributos-de-estilo)
    2. [Sonidos Necesarios](#sonidos-necesarios)
    3. [Música Necesaria](#música-necesaria)
6. [Itinerario](#itinerario)

## _Diseño del Juego_

---

### **Resumen**



### **Juego**

Nuestro juego se trata de que nuestro personaje principal () tiene que ir saltando entre diferentes plataformas hasta llegar a una determinada altura. Más explícitamente, esta altura va a ser lograda al pasar una serie de obstáculos, dividiendo el objetivo en 3 niveles, cada uno de estos va a estar constituido por cierto número de plataformas (100, 150 y 200 respectivamente) y un mini jefe al pasar todas estas plataformas. Cada uno de los niveles está ambientado de diferente manera, representando el progreso que hace el jugador cada que derrota a un jefe, las plataformas y el fondo cambian dependiendo del nivel en el que se encuentre. Estas plataformas son la forma de avanzar del jugador, ya que la pantalla lo que va a ir mostrando va a ser únicamente las plataformas y si el jugador no calcula bien el salto y no rebota en una de estas va a morir instantáneamente, regresando al inicio de todo el juego independientemente del nivel en el que se encontraba. Existe la posibilidad de conseguir mejoras para el jugador, ya sean temporales o permanentes a lo largo de sus intentos. Un ejemplo de una temporal sería una catapulta que te haga saltar 4 plataformas de un solo salto, un ejemplo de una mejora permanente sería disminuir la velocidad de caída del jugador en 5% para que tenga mayor control sobre esto. Los mini jefes van a encontrarse después de pasar el número de plataformas determinado por nivel, y va a ser una página diferente, donde no puedes caerte y van a haber plataformas definidas por nosotros las cuales van a constituir el nivel del jefe en sí y te van a dar la libertad de moverte para poder derrotar a este. Este jefe va a tener una barra de vida y para poder hacerle daño el jugador va a tener que saltar arriba de ellos estilo mario bros. Si el jugador colisiona con el jefe en cualquier otra parte de este que no sea su parte superior, va a recibir daño y también, con su respectiva barra de vida, eventualmente después de un número de golpes puede morir ante el jefe.

### **Mentalidad**

El juego está diseñado para que el jugador esté constantemente poniendo a pruebas sus habilidades, ya que debido a la mecánica principal del juego la cual es el salto continuo del personaje, el jugador prácticamente va a tener que estar activamente prestando atención a sus movimientos, solo hay un momento donde esto no es así, al derrotar cada uno de los mini jefes, y con mucha razón, ya que buscamos que sea algo frenético que una vez completes tengas como recompensa un momento de calma y un tiempo para poder utilizar las monedas que has ido recolectando y comprar tus mejoras favoritas.

## _Técnico_

---

### **Pantallas**

+ Pantalla de inicio de sesión
    - Pantalla de menú principal
      1. Pantalla principal del juego
           + Pantalla de la tienda de mejoras
           + Pantalla de pausa
           + Pantalla al morir
           + Pantalla por mini jefe
      3. Pantalla de estadísticas
      4. Pantalla de créditos finales

### **Controles**

+ Las flechas `←` y `→` van a servir para desplazar al personaje en su eje X, considerando que el usuario no va a tener que saltar manualmente ya que es algo automatizado, la flecha hacia arriba no va a servir de nada.
+ En momentos específicos (como el inicio de un run del jugador, o después de derrotar un minijefe) el juego le va a dar la oportunidad al jugador de presionar la tecla `T` para abrir la tienda de mejoras, en la cual podrá aprovechar sus monedas recolectadas a lo largo de los niveles.
+ Con la tecla `Esc` se despliega un menú que representa la pausa del juego, donde va a dársele la oportunidad de salir al menú principal al jugador o de reiniciar su progreso.


### **Mecánicas**



## _Diseño de Niveles_

---

### **Tema**



### **Flujo de Juego**



## _Desarrollo_

---

### **Clases abstractas**


### **Clases derivadas**



## _Gráficos_

---




Diseños: 



## _Sonidos y Música_

---

### **Atributos de estilo**



### **Sonidos Necesarios**



### **Música Necesaria**



## _Itinerario_

---
