if( 'serviceWorker' in navigator ) {
    navigator.serviceWorker.register('./sw.js')
        .then( register => console.log('Se instalo', register) )
        .catch( error => console.error('Falló la instalación', error) )
} else {
    console.log('Service worker no soportado')
}