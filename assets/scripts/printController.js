function printTransform(button) {
    const $body = document.querySelector('body');

    $body.classList.toggle('print')
    if(button.innerText === 'Voltar') {
        button.innerText = 'Finalizar e baixar';
    }
    else {
        button.innerText = 'Voltar';
        printScreen();
        setTimeout( () => {
            console.log('imprimindo')
            $body.classList.toggle('print')
        }, '1000')
    }

    button.innerText = 'Finalizar e baixar';

}

function printScreen() {
    var css = `
        @page { size: landscape; }
        body {
            width: 1100px
        }
    `,
        head = document.head || document.getElementsByTagName('head')[0],
        style = document.createElement('style');

    style.type = 'text/css';
    style.media = 'print';

    if (style.styleSheet){
    style.styleSheet.cssText = css;
    } else {
    style.appendChild(document.createTextNode(css));
    }

    head.appendChild(style);

    window.print();
}