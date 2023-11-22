import { Image } from "react-native";
import React from "react";
import Matter from "matter-js";
import { styles } from "./styles";

import PIPE_GREEN from "../../assets/images/pipe-green.png";
import PIPE_GREEN_INVERTED from "../../assets/images/pipe-green-inverted.png";
//Calcula as dimensões do corpo do obstáculo.
const Obstacle = (props) => {
  const widthBody = props.body.bounds.max.x - props.body.bounds.min.x;
  const heightBody = props.body.bounds.max.y - props.body.bounds.min.y;

  const xBody = props.body.position.x - widthBody / 2;
  const yBody = props.body.position.y - heightBody / 2;

// Extrai a cor do obstáculo das propriedades.
  const color = props.color;
// Passa o parametro das imagens cima ou baixo.
  return (
    <Image
      source={
        color === "green"
          ? !props.isTop
            ? PIPE_GREEN
            : PIPE_GREEN_INVERTED
          : !props.isTop
      }
      style={
        styles({
          widthBody,
          heightBody,
          xBody,
          yBody,
        }).Obstacle
      }
    />
  );
};

export default (world, label, color, pos, size, isTop = false) => {
  // Cria um corpo Matter.js para representar o obstáculo com base nas propriedades fornecidas.
  const initialObstacle = Matter.Bodies.rectangle(
    pos.x,
    pos.y,
    size.width,
    size.height,
    {
      label, // Atribui um rótulo ao obstáculo para identificação.
      isStatic: true,
    }
  );
// Adiciona o corpo do obstáculo ao mundo físico do Matter.js.
  Matter.World.add(world, [initialObstacle]);

  return {
    body: initialObstacle,
    color,
    pos,
    isTop,
    renderer: <Obstacle />, // Utiliza o componente Obstacle como o renderizador para o obstáculo.
  };
};
