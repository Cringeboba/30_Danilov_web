document.getElementById('themeToggle').addEventListener('click', function() {
    // Этот код будет выполняться при каждом клике на кнопку

    // Получаем текущий класс, заданный для элемента body (текущую тему)
    const currentTheme = document.body.className;

    // Проверяем, является ли текущая тема светлой
    if (currentTheme === 'light-theme') {
        // Если да, меняем тему на темную
        document.body.className = 'dark-theme';
    } else {
        // Если текущая тема не светлая (или отсутствует), устанавливаем светлую тему
        document.body.className = 'light-theme';
    }
});