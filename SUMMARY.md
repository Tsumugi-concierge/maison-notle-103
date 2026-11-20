Maison Notle 103 — Wi‑Fi 情報の復旧（feat/i18n-6lang）

復旧内容

- 対象ブランチ: feat/i18n-6lang（このブランチ上で修正）
- index.html の Wi‑Fi 情報を main と同一の状態に復旧
  - パスワードのテキスト表示を復旧（値: hello.okubo）
  - QR コード機能を復旧（WIFI.password を設定し有効化）
  - パスワード行のコピー動作を実値で行うように修正（最小変更、表示内容と一致）
- 6言語化の仕組みは維持
  - ラベルや説明文は data-i18n（UI_STRINGS）で継続管理
  - パスワード値は言語に依存しないため固定テキストとして表示

影響範囲と除外

- 変更は index.html の Wi‑Fi セクションおよび同ページ内の WIFI 定数のみ
- 鍵番号・キーボックス等のアクセスコードに関する記載は一切追加・変更していません
- Wi‑Fi 以外の差分は加えていません

確認結果

1. 全ページに言語切替 UI（.lang-btn）が存在し、assets/i18n.js により選択状態が共有・永続化されることを確認
   - 対象: index.html, access/, taxi/, gas-reset/, nearby-shops/, trash/, emergency/, house-rules/, how-to-open/, equipment/, parking/
2. URL 構造は変更なし（各ページのパスは据え置き）
3. index.html で以下を実機挙動確認
   - パスワード表示: hello.okubo が表示される
   - コピー: パスワード・SSID ともにコピーでき、トースト表示（各言語）
   - QR: トグルで QR が描画され、スマホのカメラ読み取りが可能

変更ファイル

- index.html
  - WIFI.password を 'hello.okubo' に設定
  - Password 行の表示を固定テキストに変更、コピー引数を実値に更新

補足

- data-i18n の passValue（予約メッセージ案内テキスト）は不要になりましたが、他への影響がないため辞書内の定義は温存しています（最小変更方針）。
