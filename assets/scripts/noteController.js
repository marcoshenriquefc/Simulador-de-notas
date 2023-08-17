

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


    // Method to generate HTML box inputs
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

    // Method to generate Select box
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
}