function putUserName() {
    const $userName = document.querySelector('.username')
    const userData = JSON.parse(CookieDataUser.getCookie(CookieDataUser.cookieName));
    const nameUser = userData.find( data => {
        return data.name === 'nome';
    })

    $userName.innerText = !!nameUser.value ? `${nameUser.value[0].toUpperCase()}${nameUser.value.substring(1)}` : ''
}

function verifySerie() {
    const serieToSituation3 = [
        '1ano-medio',
        '2ano-natureza-medio',
        '2ano-matematica-medio',
        '2ano-habtecnica-medio',
        '3ano-natureza-medio',
        '3ano-matematica-medio',
        '3ano-habtecnica-medio',
    ];
    const userData = JSON.parse(CookieDataUser.getCookie(CookieDataUser.cookieName));

    const serie = userData.find( currentData => {
        return currentData.name === 'serie'
    })

    if(serie) {
        const acceptSituation = serieToSituation3.includes(serie.value);

        if(!acceptSituation) {
            const $situation3 = document.querySelector('#situation3');
            $situation3.remove();
        }
    }
    
    


}

verifySerie();
putUserName();

