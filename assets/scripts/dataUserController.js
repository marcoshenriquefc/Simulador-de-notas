function putUserName() {
    const $userName = document.querySelector('.username')

    const userData = JSON.parse(CookieDataUser.getCookie(CookieDataUser.cookieName));

    const nameUser = userData.find( data => {
        return data.name === 'nome';
    })

    $userName.innerText = `${nameUser.value[0].toUpperCase()}${nameUser.value.substring(1)}`
}

putUserName();