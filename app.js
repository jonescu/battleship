const grid = document.querySelector('.grid');

for (let i = 0; i < 100; i++) {
  const cell = document.createElement('div');
  grid.appendChild(cell);
}

grid.addEventListener('click', (e) => {
  // handle user interactions here
});
