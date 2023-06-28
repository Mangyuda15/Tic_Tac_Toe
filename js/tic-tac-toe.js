// Deklarasi

class TicTacToe {
  constructor(selector) {
    this.parentElement = document.querySelector(selector);
    this.PlayerList = ["X", "O"];
    this.GameBoard = Array(9).fill("");
    this.currentPlayer = 0;

    //Init
    this.init();

    // console.log(selector, this.parentElement);
  }

  init() {
    this.buildGameUI();
  }

  getPlayerLabel() {
    return this.PlayerList[this.currentPlayer];
  }

  buildPlayer(playerName, PlayerNumber) {
    return ` <div class="player-box">
            <p class="tabel-player ${playerName}">${playerName}</p>
            <p class="name-player">Player ${PlayerNumber}</p>
            <p class="you">Giliran Kamu</p>
          </div>`;
  }

  buildGameUI() {
    //Info Game
    const infoGame = document.createElement("div");
    infoGame.className = "info-game";

    let playerCard = "";
    this.PlayerList.forEach((player, i) => {
      playerCard += this.buildPlayer(player, i + 1);
    });

    infoGame.innerHTML = playerCard;

    //Button Reset
    const gameControl = document.createElement("div");
    gameControl.className = "game-control";

    const btnReset = document.createElement("button");
    btnReset.className = "btn reset-btn";
    btnReset.innerText = "Reset Game";
    btnReset.addEventListener("click", this.gameReset);

    gameControl.appendChild(btnReset);
    infoGame.appendChild(gameControl);

    //Play Game
    const playGame = document.createElement("div");
    playGame.className = "play-game";

    for (let i = 0; i < 9; i++) {
      const btn = document.createElement("button");
      btn.className = "btn-tic-tac-toe";
      btn.addEventListener("click", (e) => this.onCellClick(e, i));
      playGame.appendChild(btn);
    }

    //Apend Parent To Element
    this.parentElement.append(infoGame, playGame);
    this.playGame = playGame;
  }

  // Memanggil Class
  onCellClick(event, index) {
    // console.log("on btn cell click");
    const btn = event.target;
    btn.innerText = this.getPlayerLabel();
    btn.classList.add(btn.innerText);
    btn.disabled = true;
    this.GameBoard[index] = btn.innerText;
    this.checkWinner();
    this.switchPlayer();
    // console.log(this.GameBoard);
  }

  // Player Swith
  switchPlayer(currentPlayer = undefined) {
    if (currentPlayer != undefined) {
      this.currentPlayer = currentPlayer;
    } else {
      this.currentPlayer = this.currentPlayer == 1 ? 0 : 1;
    }

    this.playerBox = document.querySelectorAll(".player-box");

    this.playerBox.forEach((box, i) => {
      if (this.currentPlayer == i) {
        box.classList.add("active");
      } else {
        box.classList.remove("active");
      }
    });
  }

  // Tombol Reset
  gameReset() {
    //Masih Error Tombol Reset Belum Berfungsi Dengan Baik
    // console.log("Games Reset");
    this.GameBoard = Array(9).fill("");
    this.switchPlayer = 0;

    //DISINI NYA DIA ERROR BELUM KETEMU SOLSINYA
    for (const btn of document.querySelector(".play-game").children) {
      console.log(btn);
      btn.innerHTML = "";
      btn.classList.remove("X", "O");
      btn.disabled = false;
    }
  }

  checkWinner() {
    const winnerConditions = [
      [0, 1, 2], // Horizontal
      [3, 4, 5],
      [6, 7, 8],

      [0, 3, 6], // Vertikal
      [1, 4, 7],
      [2, 5, 8],

      [0, 4, 8], // Diagonal
      [2, 4, 6],
    ];

    for (let i = 0; i < winnerConditions.length; i++) {
      const [a, b, c] = winnerConditions[i];

      if (this.getPlayerLabel() == this.GameBoard[a] && 
      this.getPlayerLabel() == this.GameBoard[b] && 
      this.getPlayerLabel() == this.GameBoard[c]
      ) { 
        // Animasi Swith Alert
        Swal.fire({
          title: "Berhasil",
          text: `Selamat Kepada Player ${this.currentPlayer + 1} Anda Telah Memenangkan Game Ini`,
          showDenyButton: true,
          confirmButtonText: "Kerja Bagus",
          denyButtonText: `Ulangi Permainan`,
          icon: "Sukses",
        }).then((result) => {
          /*Disabled Other Button Seharusnya Ketika Sudah Ada Yang Menang Itu Tidak Bisa Dimainkan Lagi Harus Klik Tombol
           Restartnya Baru Bisa Tapi Ini Masih Error dia Dan Tombolnya Belum berfungsi dengan baik*/
          for (const btn of document.querySelector(".play-game").children) {
            console.log(btn);
            btn.innerHTML = "";
            btn.classList.remove("X", "O");
            btn.disabled = true;
          }
          if (result.isDenied) {
            this.gameReset();
            Swal.fire("Permainan Sudah Di Reset", "Ayo Main Lagi", "info");
          }
        });
      }
    }
  }
}
