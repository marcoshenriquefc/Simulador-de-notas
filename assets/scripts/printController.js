function printTransform(button) {
    const $body = document.querySelector('body');

    $body.classList.toggle('print')
    if(button.innerText === 'Voltar') {
        button.innerText = 'Finalizar e baixar';
        button.classList.remove('no-background')

        const $printButton = document.querySelector('.printButton');
        
        if($printButton) {
            $printButton.remove();
        }
    }
    else {
        button.innerText = 'Voltar';
        button.classList.add('no-background')

        const buttonPrint = `
            <button class="button-base printButton" onclick="printScreen()"> Imprimir </button>
        ` 
        const $footerButton = document.querySelector('.footer-info');
        $footerButton.innerHTML += buttonPrint;
        printScreen();
    }
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