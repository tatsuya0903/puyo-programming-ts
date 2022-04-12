import './style.css'
import { Game } from './models/game'

const loop = () => {
  Game.loop()

  // 1/60秒後にもう一度呼び出す
  requestAnimationFrame(loop)
}

// 起動されたときに呼ばれる関数を登録する
window.addEventListener('load', () => {
  // まずステージを整える
  Game.initialize()

  // ゲームを開始する
  loop()
})
