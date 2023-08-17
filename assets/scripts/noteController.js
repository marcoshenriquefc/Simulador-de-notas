const $noteForm = document.querySelector('.note-form');

$noteForm.addEventListener('submit', (event) => {
    event.preventDefault();

    noteController.addNote();
})


class noteController {
    
    // Função recebe um objeto contendo todas as notas, e a tabela onde precisa ser inserida
    static addNote() {
        const allInputs = $noteForm.querySelectorAll('.input-note')

        const noteData = Array.from(allInputs).map(input => {
            const tagName = input.tagName.toLocaleLowerCase();

            const inputData = {
                name : tagName !== 'select' ? input.name : 'materia',
                value : input.value,
                tagName : tagName,
                autoComplete: input.attributes.readonly,
            }
            return inputData;
        })

        const inputTag = `
            <div class="note-area">
                ${this.createSelectHTML(noteData)}
                <section class="note-inputs">
                    ${this.createBoxInputs(noteData)}
                    <button class="button-note" onclick="noteController.removeNote(this)">-</button>
                </section>
            </div>
        `
        const $tableNote = document.querySelector('.note-table');

        $tableNote.innerHTML += inputTag

        this.clearInputs()
    }

    // Função para remover o node box das notas/materia solicitada para remover
    static removeNote(noteButton) {
        console.log(noteButton)
        console.log(noteButton.parentNode)
        console.log(noteButton.parentNode.parentNode)
        const boxNote = noteButton.parentNode.parentNode;
        boxNote.remove();
    }

    // Limpa todos os campos 
    static clearInputs() {
        const allInputs = $noteForm.querySelectorAll('.input-note');

        for (let i = 0; i < allInputs.length; i++) {
            allInputs[i].value = ''
        }
    }

    // Adiciona osoptions gerado de cada série no HTML
    static addOptionsHTML(optionsListHTML) {
        
        if(optionsListHTML.length >= 1) {
            const $selectInput = $noteForm.querySelector('select.input-note');

            $selectInput.innerHTML += optionsListHTML;
        }
        else {
            const link = window.location.origin;
            window.location.href = `${link}/`
        }
    }


    // Metodo para gerar inputBox
    static createBoxInputs(inputsList) {

        const listInputs = inputsList.map( input => {
            if(input.tagName === 'input') {
                const inputBox = `
                    <div class="input-box">
                        <label for="${input.name}">${input.name.toUpperCase()}</label>
                        <input
                            class="input-note number ${ input.autoComplete !== undefined ? 'active' : '' }"
                            type="number"
                            min="0"
                            max="10"
                            step=".1"
                            value="${input.value}"
                            name="${input.name}"
                            id="${input.name}"
                            readonly
                            required
                        >
                    </div>
                `;

                return inputBox
            }
            return ''
        })
        return listInputs.join('');

    }

    // Metodo para gerar selectBox
    static createSelectHTML(inputList) {

        const selectbox = inputList.map( input => {
            if(input.tagName === 'select') {
                const selectBoxHTML = `
                    <div class="input-box select">
                        <label for="${input.name}">Matéria</label>
                        <select class="input-note" requried disabled>
                            <option value="${input.value}" selected disabled> ${input.value}</option>
                        </select>
                    </div>
                `;
    
                return selectBoxHTML;
            }
            return '';
        })

        return selectbox.join('');
    }

    // Metodo para gerar options do select de matérias
    static getCurrentSerie() {
        const disciplineSerieList =  {
            '6ano-fundamental' : [
                'Arte',
                'Ciências',
                'Educação Física',
                'Geografia',
                'História',
                'L. E. M. Inglês',
                'Língua Portuguesa',
                'Matemática',
                'Projetos de Vida',
            ],
            '7ano-fundamental' : [
                'Arte',
                'Ciências',
                'Educação Física',
                'Geografia',
                'História',
                'L. E. M. Inglês',
                'Língua Portuguesa',
                'Matemática',
                'Projetos de Vida',
            ],
            '8ano-fundamental' : [
                'Arte',
                'Ciências',
                'Educação Física',
                'Geografia',
                'História',
                'L. E. M. Inglês',
                'Língua Portuguesa',
                'Matemática',
                'Projetos de Vida',
            ],
            '9ano-fundamental' : [
                'Arte',
                'Ciências',
                'Educação Física',
                'Geografia',
                'História',
                'L. E. M. Inglês',
                'Língua Portuguesa',
                'Matemática',
                'Projetos de Vida',
                'Raciocínio Lógico-Matemático',
                'Redação',
            ],
            '1ano-medio' : [
                'Arte',
                'Biologia',
                'Educação Física',
                'Filosofia',
                'Física',
                'Geografia',
                'História',
                'L. E. M. Inglês',
                'Língua Portuguesa',
                'Matemática',
                'Mundo do Trabalho',
                'Química',
                'Sociologia',
            ],
            '2ano-natureza-medio' : [
                'Biologia',
                'Desvendando o Planeta Terra I',
                'Física',
                'Geografia',
                'História',
                'L. E. M. Inglês',
                'Língua Portuguesa',
                'Matemática',
                'Química',
                'Seres Microscópicos I',
                'Seres Microscópicos II',
            ],
            '2ano-matematica-medio' : [
                'Biologia',
                'Ciência e Tecnologia',
                'Física',
                'Geografia',
                'História',
                'L. E. M. Inglês',
                'Língua Portuguesa',
                'Matemática',
                'Matemática e Engenharias I',
                'Química',
            ],
            '2ano-habtecnica-medio' : [
                'Arq. de Hardware e Software',
                'Biologia',
                'Codificação para Front-End',
                'Física',
                'Fund. de Bancos de Dados',
                'Fundamentos de UI/UX',
                'Geografia',
                'História',
                'Int. a Qualidade e Produtividade',
                'Introdução a TI e Comunicação',
                'L. E. M. Inglês',
                'Língua Portuguesa',
                'Lógica Computacional',
                'Lógica de Programação',
                'Matemática',
                'Metodologias de Desenv. de Projetos',
                'Projeto Integrador 1',
                'Química',
                'Saúde e Segurança no Trabalho',
                'Versionamento e Colaboração',
            ],
            '3ano-natureza-medio' : [
                'Desvendando o Planeta Terra II',
                'Física',
                'Geografia',
                'História',
                'Língua Portuguesa',
                'Matemática',
                'Química',
                'Seres Microscópicos III',
                'Seres Microscópicos IV',
            ],
            '3ano-matematica-medio' : [
                'Investigação e inovação científica',
                'Finanças e Matemática',
                'Física',
                'Geografia',
                'História',
                'Língua Portuguesa',
                'Matemática',
                'Matemática e Engenharias II',
                'Pensamento Estatístico',
                'Química',
            ],
            '3ano-habtecnica-medio' : [
                "Banco de Dados",
                "Codificação para Back-End",
                "Desenvolvimento de APIs",
                "Física",
                "Geografia",
                "História",
                "Interação com APIs",
                "Língua Portuguesa",
                "Matemática",
                "Projeto de Back-End",
                "Projeto de Front-End",
                "Química",
                "Testes de Back-End",
                "Testes de Front-End",
            ],


        };

        const userData = JSON.parse(CookieDataUser.getCookie(CookieDataUser.cookieName))
        
        if(!userData) {
            const link = window.location.origin;
            window.location.href = `${link}/`
        }
        
        const serie = userData.find( userSerie => {
            return userSerie.name === 'serie'
        })

        const currentSerie =  disciplineSerieList[serie.value];
        const optionsHTML = this.createOptionsInputs(currentSerie);

        this.addOptionsHTML(optionsHTML);
    }

    static createOptionsInputs(listOptions) {
        
        const optionListHTML = listOptions.map( option => {
            const tratedName = option.normalize('NFD')
                            .replace(/[\u0300-\u036f]/g, "")
                            .toLowerCase()
                            .replace(/[- ]+/g, "-");

            const optionHTML = `
                <option value="${tratedName}">${option}</option>
            `;

            return optionHTML;
        })

        return optionListHTML.join('');
    }
}

noteController.getCurrentSerie()