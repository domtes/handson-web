# handson - webdesign

Questo progetto contiene i codici sorgenti degli esempi 
sviluppati durante il workshop.

## Istruzioni

Il server di sviluppo può essere lanciato utilizzando Docker.
Per prima cosa, costruisci l'immagine:

    $ docker build -t handson .

Questo comando costruirà l'immagine docker con Gulp e tutte le dipendenze
necessarie.

Una volta che l'immagina è stata costruita, il server può essere lanciato con il
seguente comando:

    $ docker run --rm -it              \
      -p 3000:3000                     \
      -p 3001:3001                     \
      -v $(pwd)/src:/home/node/app     \
      -v $(pwd)/build:/home/node/build uxpt

Quando il server si avvia, apri il browser all'indirizzo ```http://DOCKER-HOST:3000```
per vedere un'anteprima live del tuo progetto.

Sulla porta **3001** invece si accede alla configurazione di [Browser-sync](https://www.browsersync.io).

