document.addEventListener("DOMContentLoaded", function() {
    // Находим все заголовки с классом "flag-title"
    const flagTitles = document.querySelectorAll('.flag-title');

    // Добавляем обработчик события для каждого заголовка
    flagTitles.forEach(title => {
        title.addEventListener('click', () => {
            // Удаляем класс "active-title" у всех заголовков
            flagTitles.forEach(title => {
                title.classList.remove('active-title');
            });

            // Добавляем класс "active-title" к нажатому заголовку
            title.classList.add('active-title');

            // Определяем, какой флаг показывать или скрывать (ваш текущий код здесь)
            const flagName = title.getAttribute('data-flag');
            const flagContainer = document.getElementById(`${flagName}-flag`);
            if (flagContainer.style.display === 'block') {
                flagContainer.style.display = 'none';
            } else {
                flagContainer.style.display = 'block';
            }
        });
    });
});
