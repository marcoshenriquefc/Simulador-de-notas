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

            let textInput = '';


            if(tagName === 'select') {
                const option = Array.from(input.children).find(currentOption => {
                    return currentOption.value === input.value;
                })

                textInput = option.innerText;
            }

            const inputData = {
                name : tagName !== 'select' ? input.name : 'materia',
                value : input.value,
                tagName : tagName,
                text : tagName === 'select' ? textInput : input.value,
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
            console.log(input.value)
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
                            <option value="${input.value}" selected disabled> ${input.text}</option>
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
            '6ano-fundamental' : {
                materiaBase: [
                    'Arte',
                    'Ciências',
                    'Educação Física',
                    'Geografia',
                    'História',
                    'L. E. M. Inglês',
                    'Língua Portuguesa',
                    'Matemática',
                    'Projetos de Vida'
                ],
                materiaEspecial: []
            },
            '7ano-fundamental' :{
                materiaBase: [
                    'Arte',
                    'Ciências',
                    'Educação Física',
                    'Geografia',
                    'História',
                    'L. E. M. Inglês',
                    'Língua Portuguesa',
                    'Matemática',
                    'Projetos de Vida'
                ],
                materiaEspecial: []
            },
            '8ano-fundamental' :{
                materiaBase: [
                    'Arte',
                    'Ciências',
                    'Educação Física',
                    'Geografia',
                    'História',
                    'L. E. M. Inglês',
                    'Língua Portuguesa',
                    'Matemática',
                    'Projetos de Vida'
                ],
                materiaEspecial: []
            },
            '9ano-fundamental' : {
                materiaBase: [
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
                    'Redação'
                ],
                materiaEspecial: []
            },
            '1ano-medio' :{
                materiaBase: [
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
                    'Química',
                    'Sociologia'
                ],
                materiaEspecial: ['Mundo do Trabalho']
            },
            '2ano-natureza-medio' : {
                materiaBase: [
                    'Biologia',
                    'Física',
                    'Geografia',
                    'História',
                    'L. E. M. Inglês',
                    'Língua Portuguesa',
                    'Matemática',
                    'Química'
                ],
                materiaEspecial: [
                    'Desvendando o Planeta Terra I',
                    'Seres Microscópicos I',
                    'Seres Microscópicos II'
                ]
            },
            '2ano-matematica-medio' : {
                materiaBase: [
                    'Biologia',
                    'Física',
                    'Geografia',
                    'História',
                    'L. E. M. Inglês',
                    'Língua Portuguesa',
                    'Matemática',
                    'Química'
                ],
                materiaEspecial: [
                    'Ciência e Tecnologia',
                    'Matemática e Engenharias I'
                ]
            },
            '2ano-habtecnica-medio' : {
                materiaBase: [
                    'Biologia',
                    'Física',
                    'Geografia',
                    'História',
                    'L. E. M. Inglês',
                    'Língua Portuguesa',
                    'Matemática',
                    'Química'
                ],
                materiaEspecial: [
                    'Arq. de Hardware e Software',
                    'Codificação para Front-End',
                    'Fund. de Bancos de Dados',
                    'Fundamentos de UI/UX',
                    'Int. a Qualidade e Produtividade',
                    'Introdução a TI e Comunicação',
                    'Lógica Computacional',
                    'Lógica de Programação',
                    'Metodologias de Desenv. de Projetos',
                    'Projeto Integrador 1',
                    'Saúde e Segurança no Trabalho',
                    'Versionamento e Colaboração'
                ]
            },
            '3ano-natureza-medio' : {
                materiaBase: [
                    'Física',
                    'Geografia',
                    'História',
                    'Língua Portuguesa',
                    'Matemática',
                    'Química'
                ],
                materiaEspecial: [
                    'Desvendando o Planeta Terra II',
                    'Seres Microscópicos III',
                    'Seres Microscópicos IV'
                ]
            },
            '3ano-matematica-medio' : {
                materiaBase: [
                    'Física',
                    'Geografia',
                    'História',
                    'Língua Portuguesa',
                    'Matemática',
                    'Química'
                ],
                materiaEspecial: [
                    'Investigação e Inovação Científica',
                    'Finanças e Matemática',
                    'Matemática e Engenharias II',
                    'Pensamento Estatístico'
                ]
            },
            '3ano-habtecnica-medio' : {
                materiaBase: [
                    'Física',
                    'Geografia',
                    'História',
                    'Língua Portuguesa',
                    'Matemática',
                    'Química'
                ],
                materiaEspecial: [
                    'Banco de Dados',
                    'Codificação para Back-End',
                    'Desenvolvimento de API\'s',
                    'Interação com APIs',
                    'Projeto de Back-End',
                    'Projeto de Front-End',
                    'Testes de Back-End',
                    'Testes de Front-End'
                ]
            }
        };

        const userData = JSON.parse(CookieDataUser.getCookie(CookieDataUser.cookieName))
        
        if(!userData) {
            const link = window.location.origin;
            window.location.href = `${link}/`
        }

        const serie = userData.find( userSerie => {
            return userSerie.name === 'serie';
        })

        const currentSerie =  disciplineSerieList[serie.value];
        const optionsHTML = this.createOptionsInputs(currentSerie);

        this.addOptionsHTML(optionsHTML);
    }

    static createOptionsInputs(listOptions) {
        console.log(listOptions);
        console.log($noteForm.id);

        let listMaterias = []
        if($noteForm.id === 'situation3') {
            listMaterias = listOptions.materiaEspecial;
        }
        else {
            listMaterias = listOptions.materiaBase;
        }
        
        const optionListHTML = listMaterias.map( option => {
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