document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    const status = document.querySelector('.status');
    const restartButton = document.querySelector('.restart-btn');
  
    let currentPlayer = 'X';
    let gameActive = true;
    let gameState = ['', '', '', '', '', '', '', '', ''];
  
    const winningConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
  
    const handleCellClick = (e) => {
      const clickedCell = e.target;
      const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell'));
  
      if (gameState[clickedCellIndex] !== '' || !gameActive) return;
  
      gameState[clickedCellIndex] = currentPlayer;
      clickedCell.textContent = currentPlayer;
      checkResult();
      togglePlayer();
    };
  
    const togglePlayer = () => {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      status.textContent = `Current player: ${currentPlayer}`;
    };
  
    const checkResult = () => {
      for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (
          gameState[a] !== '' &&
          gameState[a] === gameState[b] &&
          gameState[a] === gameState[c]
        ) {
          gameActive = false;
          status.textContent = `Player ${currentPlayer} won!`;
          return;
        }
      }
  
      if (!gameState.includes('')) {
        gameActive = false;
        status.textContent = "It's a draw!";
        return;
      }
    };
  
    const restartGame = () => {
      currentPlayer = 'X';
      gameActive = true;
      gameState = ['', '', '', '', '', '', '', '', ''];
      status.textContent = `Current player: ${currentPlayer}`;
      cells.forEach((cell) => {
        cell.textContent = '';
      });
    };
  
    cells.forEach((cell) => {
      cell.addEventListener('click', handleCellClick);
    });
  
    restartButton.addEventListener('click', restartGame);
  });
  