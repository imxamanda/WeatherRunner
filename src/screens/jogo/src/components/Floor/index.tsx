import { View } from "react-native";
import React from "react";
import Matter from "matter-js";
import { styles } from "./styles";

const Flor = (props) => {
  const widthBody = props.body.bounds.max.x - props.body.bounds.min.x;
  const heightBody = props.body.bounds.max.y - props.body.bounds.min.y;

  const xBody = props.body.position.x - widthBody / 2;
  const yBody = props.body.position.y - heightBody / 2;

  const color = props.color;
// Lógica para calcular posicionamento e dimensões do chão com base nas props recebidas.
return (
  <View
    style={{
      ...styles({
        widthBody,
        heightBody,
        xBody,
        yBody,
        color,
      }).Flor,
      backgroundColor: "#808080",
    }}
  />
);
};

export default (world, color, pos, size) => {
  // Cria um corpo Matter.js para representar a flor no jogo.
  const initialFlor = Matter.Bodies.rectangle(
    pos.x,
    pos.y,
    size.width,
    size.height,
    {
      label: "Flor",   // Atribui um rótulo à flor para identificação.
      isStatic: true, // Define o chão como estático.
  
    }
  );
// Adiciona de fato o chão ao mundo físico do Matter.
  Matter.World.add(world, [initialFlor]);

  return {
    body: initialFlor,
    color,
    pos,
    renderer: <Flor />, // Utiliza o componente chão como o renderizador.
  };
};
