window.addEventListener('load', startGame);

      let boardEl = document.getElementById('board');
      let modalEl = document.getElementById('modal');
      let resetButtons = document.getElementsByClassName('reset');
      let players = ['x', 'o'];
      let activePlayer;
      let board;

      for (let btn of resetButtons) {
        btn.addEventListener('click', function () {
          if (!modalEl.classList.contains('hidden')) {
            modalEl.classList.add('hidden');
          }
          startGame();
        });
      }

      boardEl.addEventListener('click', function (event) {
        let targetClasses = event.target.classList;
        let targetData = event.target.dataset;
        if (targetClasses.contains('field') && !targetClasses.contains('busy')) {
          click(targetData.row, targetData.col);
        }
      });

      function showWinner(winner) {
        let header = modalEl.getElementsByTagName('h2')[0];
        header.textContent = `🍾 Победил игрок №${winner + 1}! 🍾`;
        modalEl.classList.remove('hidden');
      }

      function renderBoard(board) {
        const fields = [];
        for (let [i, row] of board.entries()) {
          for (let [j, value] of row.entries()) {
            fields.push(`
              <div class="field ${value ? 'busy' : 'free'}"
                  data-row="${i}"
                  data-col="${j}"
                  style="grid-row:${i + 1};grid-column:${j + 1};"
              >
                ${value || ''}
              </div>
            `);
          }
        }
        boardEl.innerHTML = fields.join('');
      }

      // Logic part

      function startGame() {
        board = [
          ['', '', ''],
          ['', '', ''],
          ['', '', ''],
        ];
        activePlayer = 0;
        renderBoard(board);
        return board;
      }

      function checkWinner(line, column) {
        if (
          board[line][0] == board[line][1] &&
          board[line][0] == board[line][2] &&
          board[line][0] != ''
        ) {
          return true;
        } else if (
          board[0][column] == board[1][column] &&
          board[0][column] == board[2][column] &&
          board[0][column] != ''
        ) {
          return true;
        } else if (
          board[0][0] == board[1][1] &&
          board[0][0] == board[2][2] &&
          board[0][0] != ''
        ) {
          return true;
        } else if (
          board[0][2] == board[1][1] &&
          board[0][2] == board[2][0] &&
          board[0][2] != ''
        ) {
          return true;
        }
        return false;
      }

      function click(line, column) {
        let currentTick = players[activePlayer];
        if (board[line][column] == '') {
          board[line][column] = currentTick;
          renderBoard(board);
          if (checkWinner(line, column)) {
            showWinner(activePlayer);
            return;
          }
          activePlayer = (activePlayer + 1) % 2;
        }
      }