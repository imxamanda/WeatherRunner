import React, { useRef, useState, useEffect } from "react";
import { GameEngine } from "react-native-game-engine";
import entities from "../../../entities";
import { Physics } from "../../../utils/physics";
import { styles } from "./styles";
import { Start } from "./Start";
import { GameOver } from "./GameOver";

const Game = () => {
  // Estado para controlar se o jogo está em execução
  const [running, setIsRunning] = useState(false);
  // Estado para controlar se o jogo terminou
  const [isGameOver, setIsGameOver] = useState(false);
  const gameEngineRef = useRef();

  // Funcionamento tela inicial 
  const handleBackToStart = () => {
    setIsRunning(false);
    setIsGameOver(false);
  };

  // Função para começar o jogo
  const handleOnStart = () => {
    setIsRunning(true);
    setIsGameOver(false);
  };

  // Função chamada quando perde
  const handleOnGameOver = () => {
    setIsRunning(false);
    setIsGameOver(true);
  };

  // Função para manipular eventos do jogo
  const handleOnEvent = (e) => {
    switch (e.type) {
      case "game_over":
        handleOnGameOver();
        break;
    }
  };

  useEffect(() => {
  }, []);

  // Condição pra começar na tela inicial.
  if (!running && !isGameOver) {
    return <Start handleOnStart={handleOnStart} />;
  }

  // Jogo em execução e é interrompido mostra tela fe fim de jogo
  if (!running && isGameOver) {
    return <GameOver handleBackToStart={handleBackToStart} />;
  }

  // jogo está em execução
  return (
    <GameEngine
      systems={[Physics]}
      running={running}
      ref={gameEngineRef}
      entities={entities()}
      onEvent={handleOnEvent}
      style={styles.engineContainer}
    />
  );
};

export default Game;
