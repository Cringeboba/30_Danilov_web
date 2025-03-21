class Block {
    constructor() {
        if (new.target === Block) {
            throw new TypeError("Cannot construct Abstract instances directly");
        }
    }

    toHTML() {
        throw new Error("Method 'toHTML()' must be implemented.");
    }
}

class HeaderBlock extends Block {
    constructor(name, avatar) {
        super();
        this.name = name;
        this.avatar = avatar;
    }

    toHTML() {
        return `
            <img src="${this.avatar}" alt="${this.name}" class="avatar">
            <h1 contenteditable="false">${this.name}</h1>
        `;
    }
}

class InfoBlock extends Block {
    constructor(description) {
        super();
        this.description = description;
    }

    toHTML() {
        return `
            <p contenteditable="false">${this.description}</p>
        `;
    }
}

class LinkBlock extends Block {
    constructor(link) {
        super();
        this.link = link;
    }

    toHTML() {
        return `
            <a href="${this.link}" contenteditable="false">${this.link}</a>
        `;
    }
}

class Card {
    constructor(name, avatar, description, link) {
        this.headerBlock = new HeaderBlock(name, avatar);
        this.infoBlock = new InfoBlock(description);
        this.linkBlock = new LinkBlock(link);
    }

    toHTML() {
        return `
            ${this.headerBlock.toHTML()}
            ${this.infoBlock.toHTML()}
            ${this.linkBlock.toHTML()}
        `;
    }
}

class CardManager {
    constructor() {
        this.cardsData = [
            {
                name: "Ублюдок №1 (Клоун)",
                avatar: "images/Клоун.png",
                description: "Громко ходит из-за своих больших ног! Бьет лазером, который убивает с одного выстрела. Также берет перерыв после атаки лазером.",
                link: "https://steamcommunity.com/sharedfiles/filedetails/?id=3438192859"
            },
            {
                name: "Ублюдок №2 (Монашка)",
                avatar: "images/Халат.png",
                description: "БЕЗШУМНО передвигается! Также, заметив игрока, начинает движение к нему уже чуть быстрее. Но если игрок посмотрит ему на маску(лицо), то начинает кричать и с очень большой скоростью двигаться к игроку!",
                link: "https://steamcommunity.com/sharedfiles/filedetails/?id=3438192859"
            },
            {
                name: "Ублюдок №3 (Утка)",
                avatar: "images/Утка.png",
                description: "Эта утка следует за самым большим монстром, но когда заметит игрока обязательно будет следовать за игроком и пытаться попасть в его 'перекрестие' что бы обязательно ее потрогали, но стоит это сделать перевоплотится в утку с огромной пастью и начнет вас кусать. чаще всего убивает, но у нее есть КД. если вы быстры или имеете много ХП можно выжить.",
                link: "https://steamcommunity.com/sharedfiles/filedetails/?id=3438192859"
            }
        ];
        this.isEditMode = false;
    }

    init() {
        this.createHeader();
        this.renderCards();
    }

    createHeader() {
        const header = document.createElement('header');
        header.innerHTML = `
            <h1 id="site-title" contenteditable="false">Топ мобов в R.E.P.O.</h1>
            <button id="toggle-edit-mode">Режим редактирования</button>
        `;
        document.body.insertBefore(header, document.getElementById('app'));

        document.getElementById('toggle-edit-mode').addEventListener('click', () => this.toggleEditMode());
    }

    toggleEditMode() {
        this.isEditMode = !this.isEditMode;
        const button = document.getElementById('toggle-edit-mode');
        button.textContent = this.isEditMode ? "Завершить редактирование" : "Режим редактирования";

        const title = document.getElementById('site-title');
        title.setAttribute('contenteditable', this.isEditMode);

        this.renderCards();
    }

    renderCards() {
        const app = document.getElementById('app');
        app.innerHTML = '';

        this.cardsData.forEach((cardData, index) => {
            const card = new Card(cardData.name, cardData.avatar, cardData.description, cardData.link);
            const cardHTML = `
                <div class="card">
                    ${this.isEditMode ? `
                        <div class="edit-buttons">
                            <button onclick="cardManager.editCard(${index})">✏️</button>
                            <button onclick="cardManager.deleteCard(${index})">🗑️</button>
                        </div>
                        <div class="avatar-edit">
                            <input type="file" class="avatar-file" accept="image/*" onchange="cardManager.handleAvatarUpload(${index}, this)">
                        </div>
                    ` : ''}
                    ${card.toHTML()}
                </div>
            `;
            app.innerHTML += cardHTML;
        });

        if (this.isEditMode) {
            const addCardButton = document.createElement('div');
            addCardButton.className = 'card';
            addCardButton.innerHTML = `
                <button class="add-card-button" onclick="cardManager.addCard()">Добавить карточку</button>
            `;
            app.appendChild(addCardButton);
        }

        if (this.isEditMode) {
            document.querySelectorAll('.card h1, .card p, .card a').forEach(element => {
                element.setAttribute('contenteditable', 'true');
            });
        }
    }

    handleAvatarUpload(index, fileInput) {
        const file = fileInput.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                this.cardsData[index].avatar = event.target.result;
                this.renderCards();
            };
            reader.readAsDataURL(file);
        }
    }

    editCard(index) {
        const cardElement = document.querySelectorAll('.card')[index];
        this.cardsData[index].name = cardElement.querySelector('h1').textContent;
        this.cardsData[index].description = cardElement.querySelector('p').textContent;
        this.cardsData[index].link = cardElement.querySelector('a').textContent;
        alert("Изменения сохранены!");
    }

    deleteCard(index) {
        this.cardsData.splice(index, 1);
        this.renderCards();
    }

    addCard() {
        this.cardsData.push({
            name: "Новый ублюдок",
            avatar: "images/default.jpg",
            description: "Описание нового монстра.",
            link: "Ссылка"
        });
        this.renderCards();
    }
}

const cardManager = new CardManager();
window.onload = () => cardManager.init();