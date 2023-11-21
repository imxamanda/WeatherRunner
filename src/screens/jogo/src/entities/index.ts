import Matter from "matter-js";
import { Dimensions } from "react-native";
import Bird from "../components/Bird";
import Floor from "../components/Floor";
import Obstacle from "../components/Obstacle";
import { getPipeSizePosPair } from "../utils/random";

// Obtém as dimensões da janela do dispositivo
const windowsHeight = Dimensions.get('window').height;
const windowsWidth = Dimensions.get('window').width;

// Altura do chão em relação à parte inferior da tela
const BOTTOM = 51;

export default () => {
    // Cria um funcionamento físico
    let engine = Matter.Engine.create({ enableSleeping: false });

    // Obtém o mundo 
    let world = engine.world;

    // Define a gravidade
    engine.gravity.y = 0.4;

    // Gera posições e tamanhos aleatórios dos obstaculos
    const pipeSizePosA = getPipeSizePosPair();
    const pipeSizePosB = getPipeSizePosPair(windowsWidth * 0.9);
    console.log(pipeSizePosA);

    // Retorna um objeto contendo as entidades do jogo
    return {
        physics: { engine, world },
        Bird: Bird(world, 'green', { x: 120, y: 400 }, { height: 40, width: 40 }),

        // Primeira obistaculo
        ObstacleTop1: Obstacle(world, 'ObstacleTop1', 'green', pipeSizePosA.pipeTop.pos, pipeSizePosA.pipeTop.size, true),
        ObstacleBottom1: Obstacle(world, 'ObstacleBottom1', 'green', pipeSizePosA.pipeBottom.pos, pipeSizePosA.pipeBottom.size, false),

        // Segunda obistaculo
        ObstacleTop2: Obstacle(world, 'ObstacleTop2', 'green', pipeSizePosB.pipeTop.pos, pipeSizePosB.pipeTop.size, true),
        ObstacleBottom2: Obstacle(world, 'ObstacleBottom2', 'green', pipeSizePosB.pipeBottom.pos, pipeSizePosB.pipeBottom.size, false),

        // Chão
        Floor: Floor(world, '#E1D694', { x: windowsWidth / 2, y: windowsHeight - 17 }, { height: BOTTOM + 20, width: windowsWidth })
    };
};
