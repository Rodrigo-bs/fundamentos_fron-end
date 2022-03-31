class Menu {
    constructor(menuButton, menuContainer) {
        this.button = document.querySelector(menuButton);
        this.menuContainer = document.querySelector(menuContainer);
    }

    toggleMenu(event) {
        event.preventDefault();
        this.menuContainer.classList.toggle('active');
        this.button.classList.toggle('active_animation');
    }

    addEvent() {
        this.button.addEventListener('click', this.toggleMenu);
        this.button.addEventListener('touchstart', this.toggleMenu);
    }

    bindEvent() {
        this.toggleMenu = this.toggleMenu.bind(this);
    }

    init() {
        this.bindEvent();
        this.addEvent();
    }
}

class RemoveElementByTable {
    constructor(buttonRemove, tableContainer) {
        this.buttons = document.querySelectorAll(buttonRemove);
        this.table = document.querySelector(tableContainer);
    }

    deleteRow(event) {
        const idRow = event.target.getAttribute('data-table-id');
        this.table.querySelector(`[data-tr-id="${idRow}"]`).remove();
    }

    addEvent() {
        this.buttons.forEach(button => {
            button.addEventListener('click', this.deleteRow);
            button.addEventListener('touchstart', this.deleteRow);
        });
    }

    bindEvent() {
        this.deleteRow = this.deleteRow.bind(this);
    }

    init() {
        this.bindEvent();
        this.addEvent();
    }
}

class GetUsers {
    constructor(button) {
        this.button = document.querySelector(button);
        this.url = 'https://raw.githubusercontent.com/danielnsilva/webacademyufac/main/usuarios.json';
    }

    insertInToTable(datas) {
        datas.forEach(data => {
            console.log(this.createElement(data));
        });
    }

    createElement(data) {
        let row = document.createElement('tr');
        row.setAttribute('data-tr-id', data.id);

        let idColumn = document.createElement('td');
        idColumn.innerText = data.id
        idColumn.classList.add('fit');

        
        let nameColumn = document.createElement('td');
        nameColumn.innerText = data.nomeCompleto;
        let userColumn = document.createElement('td');
        userColumn.innerText = data.nomeUsuario;
        let activeColumn = document.createElement('td');
        activeColumn.innerText = data.ativo;
        let chargeColumn = document.createElement('td');
        chargeColumn.innerText = data.papel;

        let containerButton = document.createElement('td');
        
        let buttonEdit = document.createElement('button');
        buttonEdit.innerText = 'Editar';
        buttonEdit.classList.add('btn-edit');

        let buttonDelete = document.createElement('button');
        buttonDelete.innerText = 'Excluir';
        buttonDelete.setAttribute('data-table', 'button_delete');
        buttonDelete.setAttribute('data-table-id',  data.id);
        buttonDelete.classList.add('btn-delete');

        containerButton.appendChild(buttonEdit);
        containerButton.appendChild(buttonDelete);

        row.appendChild(idColumn);
        row.appendChild(nameColumn);
        row.appendChild(userColumn);
        row.appendChild(activeColumn);
        row.appendChild(chargeColumn);
        row.appendChild(containerButton);

        return row;
    }

    makeAjax() {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', this.url);
        xhr.addEventListener('readystatechange', () => {
            if (xhr.readyState == 4 && xhr.status == 200) {
                this.insertInToTable(JSON.parse(xhr.responseText));
            }
        });
        
        xhr.send();
    }

    addEvent() {
        this.button.addEventListener('click', this.makeAjax);
    }

    bindEvent() {
        this.makeAjax = this.makeAjax.bind(this);
    }

    init() {
        this.bindEvent();
        this.addEvent();
    }
}

const menu = new Menu('.dropdown > a', '.dropdown-content');
menu.init();

const removeElementByTable = new RemoveElementByTable('[data-table="button_delete"]', '[data-table="table"]');
removeElementByTable.init();

const getUsers = new GetUsers('.button-ajax', '.');
getUsers.init();