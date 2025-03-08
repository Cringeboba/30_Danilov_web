function cheat(iteration) {
    if (iteration === 1 && confirm("Хотите смухлевать?")) {
        let card = prompt("Вы вытаскиваете из рукава карту. Введите количество очков, которое хотите прибавить к общей сумме:");
        if (!isNaN(card) && card !== null && card.trim() !== "") {
            return Number(card);
        } else {
            alert("Некорректное значение. Мухлеж отменён.");
        }
        
    }
    return 0;
}

function ochkoGame() {
    alert("Добро пожаловать в игру '21 очко'! Ваша цель — набрать сумму, близкую к 21, но не больше.");

    let userScore = 0;
    let compScore = 0;

    for(let i = 0;; i++){
        const card = Math.floor(Math.random() * 11) + 1; 
        userScore += card;
        alert(`Вы получили карту: ${card}. Ваш текущий счёт: ${userScore}`);

        userScore += cheat(i);

        if (userScore > 21) {
            alert("Перебор! Вы проиграли.");
            break;
        }

        if (!confirm("Хотите взять ещё одну карту?")) {
            break;
        }
    }

    if (userScore <= 21) {
        compScore = Math.floor(Math.random() * (21 - 16 + 1)) + 16; 
        alert(`Компьютер набрал: ${compScore}`);

        if (compScore > 21 || userScore > compScore) {
            alert("Вы выиграли!");
        } else if (userScore === compScore) {
            alert("Ничья!");
        } else {
            alert("Вы проиграли.");
        }
    }

    if (confirm("Хотите сыграть ещё раз?")) {
        ochkoGame();
    }
}

document.getElementById("ochkoGameButton").addEventListener("click", ochkoGame);