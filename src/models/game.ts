import { PuyoImage } from './puyoimage'
import { Stage } from './stage'
import { Player } from './player'
import { Score } from './score'
import { Config } from './config'

export const Modes = {
  start: 'start',
  checkFall: 'checkFall',
  fall: 'fall',
  checkErase: 'checkErase',
  erasing: 'erasing',
  newPuyo: 'newPuyo',
  playing: 'playing',
  moving: 'moving',
  rotating: 'rotating',
  fix: 'fix',
  gameOver: 'gameOver',
  batankyu: 'batankyu',
} as const
export type Mode = typeof Modes[keyof typeof Modes]

export class Game {
  private static mode: Mode // ゲームの現在の状況
  private static frame: number // ゲームの現在フレーム（1/60秒ごとに1追加される）
  private static combinationCount = 0 // 何連鎖かどうか

  static initialize(): void {
    // 設定を準備する
    Config.initialize()
    // 画像を準備する
    PuyoImage.initialize()
    // ステージを準備する
    Stage.initialize()
    // ユーザー操作の準備をする
    Player.initialize()
    // シーンを初期状態にセットする
    Score.initialize()
    // スコア表示の準備をする
    this.mode = 'start'
    // フレームを初期化する
    this.frame = 0
  }

  static loop(): void {
    switch (this.mode) {
      case Modes.start:
        // 最初は、もしかしたら空中にあるかもしれないぷよを自由落下させるところからスタート
        this.mode = 'checkFall'
        break
      case Modes.checkFall:
        // 落ちるかどうか判定する
        if (Stage.checkFall()) {
          this.mode = 'fall'
        } else {
          // 落ちないならば、ぷよを消せるかどうか判定する
          this.mode = 'checkErase'
        }
        break
      case Modes.fall:
        if (!Stage.fall()) {
          // すべて落ちきったら、ぷよを消せるかどうか判定する
          this.mode = 'checkErase'
        }
        break
      case Modes.checkErase:
        {
          // 消せるかどうか判定する
          const eraseInfo = Stage.checkErase(this.frame)
          if (eraseInfo) {
            this.mode = 'erasing'
            this.combinationCount++
            // 得点を計算する
            Score.calculateScore(this.combinationCount, eraseInfo.piece, eraseInfo.color)
            Stage.hideZenkeshi()
          } else {
            if (Stage.puyoCount === 0 && this.combinationCount > 0) {
              // 全消しの処理をする
              Stage.showZenkeshi()
              Score.addScore(3600)
            }
            this.combinationCount = 0
            // 消せなかったら、新しいぷよを登場させる
            this.mode = 'newPuyo'
          }
        }
        break
      case Modes.erasing:
        if (!Stage.erasing(this.frame)) {
          // 消し終わったら、再度落ちるかどうか判定する
          this.mode = 'checkFall'
        }
        break
      case Modes.newPuyo:
        {
          if (!Player.createNewPuyo()) {
            // 新しい操作用ぷよを作成出来なかったら、ゲームオーバー
            this.mode = 'gameOver'
          } else {
            // プレイヤーが操作可能
            this.mode = 'playing'
          }
        }
        break
      case Modes.playing:
        {
          // プレイヤーが操作する
          const action = Player.playing(this.frame)
          this.mode = action // 'playing' 'moving' 'rotating' 'fix' のどれかが帰ってくる
        }
        break
      case Modes.moving:
        if (!Player.moving(this.frame)) {
          // 移動が終わったので操作可能にする
          this.mode = 'playing'
        }
        break
      case Modes.rotating:
        if (!Player.rotating(this.frame)) {
          // 回転が終わったので操作可能にする
          this.mode = 'playing'
        }
        break
      case Modes.fix:
        // 現在の位置でぷよを固定する
        Player.fix()
        // 固定したら、まず自由落下を確認する
        this.mode = 'checkFall'
        break
      case Modes.gameOver:
        // ばたんきゅーの準備をする
        PuyoImage.prepareBatankyu(this.frame)
        this.mode = 'batankyu'
        break
      case Modes.batankyu:
        PuyoImage.batankyu(this.frame)
        Player.batankyu()
        break
    }
    this.frame++
  }
}
