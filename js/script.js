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

const menu = new Menu('.dropdown > a', '.dropdown-content');
menu.init();

const removeElementByTable = new RemoveElementByTable('[data-table="button_delete"]', '[data-table="table"]');
removeElementByTable.init();