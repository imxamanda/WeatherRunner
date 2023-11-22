import Matter from "matter-js";
import { getPipeSizePosPair } from "./random";
import { Dimensions } from 'react-native'

const windowHeight = Dimensions.get('window').height
const windowWidth = Dimensions.get('window').width
// Obtém os parametros do mecanismo de física
export const Physics = (entities, {touches, time, dispatch }) => {
    let engine = entities.physics.engine;
// O toque 
    touches.filter(t => t.type === 'press').forEach(t => {
        // Define a velocidade do menino clay para fazer com que ele suba ao ser tocado na tela
        
        Matter.Body.setVelocity(entities.Bird.body, {
            x: 0,
            y: -4 
        })
    });

    Matter.Engine.update(engine, time.delta);
// Loop para movimentar os obstaculos
    for(let index = 1; index <= 2; index++){

        if(entities[`ObstacleTop${index}`].body.bounds.max.x <= 0 ){
            const pipeSizePos = getPipeSizePosPair(windowWidth * 0.9);

            Matter.Body.setPosition(entities[`ObstacleTop${index}`].body, pipeSizePos.pipeTop.pos)
            Matter.Body.setPosition(entities[`ObstacleBottom${index}`].body,  pipeSizePos.pipeBottom.pos)

        }
 // Move as tubulações para frente
        Matter.Body.translate(entities[`ObstacleTop${index}`].body, {x:  -3, y: 0})
        Matter.Body.translate(entities[`ObstacleBottom${index}`].body, {x:  -3, y: 0})
    }

// Registra colisão
    Matter.Events.on(engine, 'collisionStart', (event) => {
        dispatch({ type: 'game_over'});
    })
// Retorna as entidades atualizadas
    return entities
}