# Enjambre

Práctica del framework cuando varios agentes trabajan el mismo objetivo y se pasan hallazgos. No es el harness de puertos y Compose.

## Tablero en cada vuelta

El prompt del arranque es una copia. Si los agentes corren a la vez, el hallazgo que uno escribe no le llega al otro.

El framework exige que el harness vuelva a leer el tablero desde el almacenamiento durable antes de cada respuesta del modelo. No se delega esa relectura a que el modelo llame una herramienta: en la práctica la llama una vez, al inicio, y sigue.

## El tablero no es prueba

Sirve para no repetir una afirmación. No demuestra un dato que esté fuera del workspace. Una nota ya escrita puede parecer la respuesta, y el agente no abre el archivo ni la página. La descripción de esa herramienta tiene que decirlo.

Un descubrimiento puede ser inferencia del modelo a partir de lo que ya se le dio, incluido el objetivo. La fuente es una de tres: el objetivo, el tablero, o una ruta o URL que esa ejecución abrió. Una ruta o una página que no se abrió no se guarda.

No se obliga una herramienta. Se dice cuándo aplica. «Úsala solo si falta el dato» junto a un tablero que ya parece tenerlo hace que el agente no la use.

## Contador y tope

Cada llamada se anota en el nodo que la hizo. Un solo identificador de «quién está activo» suma el trabajo de dos ramas en la última. El tope de un nodo detiene ese nodo. No cancela al hermano que corre al mismo tiempo.

## Continuar y repetir

Continuar usa lo que ya tiene resultado y sigue con lo que falta. Repetir vuelve a ejecutar el nodo elegido y lo que cuelga de él. Los nombres de los botones son del producto. La diferencia es del framework.

## Cerrar no es acertar

Una ejecución que termina sin un hallazgo nuevo y con el informe vacío está completa y no sirvió. El registro tiene que decir qué hizo cada agente: qué herramienta, si compartió, si saltó. Un fallo del modelo se escribe en un archivo que la persona pueda adjuntar. Un error que no se escribe parece que la ejecución se quedó esperando.

## Versión del harness

El identificador y el número viven en el código. La ejecución los guarda. La siguiente usa la versión vigente. Los resultados anteriores se leen igual. Se sube el número cuando cambia lo que el modelo ve: una descripción, un tope, o el momento en que se lee el tablero.
