export interface Language {
  menu: {
    titleMode: string;
    titlePlayers: string;
    titleSize: string;
    modeNum: string;
    modeIcon: string;
    startBtn: string;
  };
  game: {
    header: {
      restartBtn: string;
      newGameBtn: string;
    };
    player: {
      time: string;
      moves: string;
      playerName: string;
      currentTurn: string;
    };
  };

  gameOver: {
    singlePlayer: {
      title: string;
      subText: string;
      timeResult: string;
      movesResult: string;
    };
    multiPlayer: {
      wins: string;
      player: string;
      tie: string;
      subText: string;
      pairs: string;
    };
    restartBtn: string;
    newGameBtn: string;
  };
}
