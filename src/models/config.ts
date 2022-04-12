// 設定を記載しておくクラス
export class Config {
  static puyoImgWidth = 40 // ぷよぷよ画像の幅
  static puyoImgHeight = 40 // ぷよぷよ画像の高さ

  static readonly fontHeight = 33

  static readonly stageCols = 6 // ステージの横の個数
  static readonly stageRows = 12 // ステージの縦の個数

  static readonly stageBackgroundColor = '#ffffff' // ステージの背景色
  static readonly scoreBackgroundColor = '#24c0bb' // スコアの背景色

  static readonly freeFallingSpeed = 16 // 自由落下のスピード
  static readonly erasePuyoCount = 4 // 何個以上揃ったら消えるか
  static readonly eraseAnimationDuration = 30 // 何フレームでぷよを消すか

  static readonly puyoColors = 4 // 何色のぷよを使うか
  static readonly playerFallingSpeed = 0.9 // プレイ中の自然落下のスピード
  static readonly playerDownSpeed = 15 // プレイ中の下キー押下時の落下スピード
  static readonly playerGroundFrame = 20 // 何フレーム接地したらぷよを固定するか
  static readonly playerMoveFrame = 10 // 左右移動に消費するフレーム数
  static readonly playerRotateFrame = 10 // 回転に消費するフレーム数

  static readonly zenkeshiDuration = 150 // 全消し時のアニメーションミリセカンド
  static readonly gameOverFrame = 3000 // ゲームオーバー演出のサイクルフレーム

  static initialize(): void {
    const size = this.calcPuyoImgSize()
    this.puyoImgWidth = size
    this.puyoImgHeight = size
  }

  /**
   * フィールドサイズ追加
   * 高さが全部入るように調整
   * @private
   */
  private static calcPuyoImgSize(): number {
    return (window.innerHeight - this.fontHeight) / this.stageRows
  }
}
