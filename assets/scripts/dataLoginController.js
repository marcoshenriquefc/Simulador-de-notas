const $loginForm = document.querySelector('#form-login');

if($loginForm) {
    $loginForm.addEventListener('submit', (event) => {
        event.preventDefault();
    
        dataLoginController.getDataSelected();
    })
}

class dataLoginController {
    static getDataSelected() {
        const $inputsLists = Array.from($loginForm.querySelectorAll('.input-base')) 

        const dataLogin = $inputsLists.map(input => {
            const dataInput = {
                name: input.name,
                value: input.value,
            };
            return dataInput;
        });

        if(dataLogin[1].value) {
            const dataLoginJSON = JSON.stringify(dataLogin);
            CookieDataUser.setCookie(CookieDataUser.cookieName, dataLoginJSON);

            const link = window.location.origin;
            window.location.href = `${link}/home.html`
        }
    }
}

class CookieDataUser {
    static cookieName = 'dataUser';

    static setCookie(name, value, options = []) {

        if(!name || !value) return false;

        let expires = options['expires']
        let path = options['path']

        if(!(expires instanceof Date)) expires = new Date((new Date()).setFullYear(new Date().getFullYear() + 1)) ;

        let cookieString = `${name}=${value}; ${expires?'expires=' + expires.toUTCString():''}; ${path?'path=' + path + '/':''}`;

        document.cookie = cookieString;

        return CookieDataUser.getCookie(name);
    }

    static getCookie(name) {
        if(!name) return false;

        name = name + '=';

        let cookieList = decodeURIComponent(document.cookie).split(';');

        for(let i = 0; i < cookieList.length; i++){
            let c = cookieList[i];

            while(c.charAt(0) == ' ') c = c.substring(1);

            if(c.indexOf(name) == 0) return c.substring(name.length, c.length);
        }

        return false;
    }
}

window.CookieDataUser = CookieDataUser;