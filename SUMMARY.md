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

---

maison-notle-103: feat/i18n-6lang の main マージ（競合解消込み）記録

- 実施日時: 2026-11-21
- 作業クローン: maison-notle-103-merge2（本リポジトリ内のみ）

1. マージ概要
   - 対象: Tsumugi-concierge/maison-notle-103
   - 操作: main に origin/feat/i18n-6lang を --no-ff でマージ
   - マージコミット: 8fd5d75
     - Subject: Merge branch 'feat/i18n-6lang' into main (no-ff)

2. 競合と解消内容
   - 競合ファイル: index.html（1件）
   - 解消方針の適用:
     - 6言語化（言語切替UI・i18nアセット）はブランチ側を正として採用
       - assets/i18n.js・assets/i18n.css を導入
       - 既存のページ内 i18n 関数（applyTranslations/setLang の簡易実装）は削除
     - main 側の内容修正は維持
       - ホスト連絡文面など main 側の文面を残し、i18n の ready/change イベントで同期
     - 両立のための最小統合
       - トースト文言で参照していた currentLang の互換エイリアスを追加（window.currentLang を反映）
     - Wi-Fi 表示はブランチ側の仕様（パスワード平文＋QR）を採用（オーナー公開可）

3. 秘密情報チェック（鍵・コード類）
   - 検索実施: 「鍵/キーボックス/暗証/テンキー/ダイヤル」および「code/key box/lockbox/keypad/passcode」周辺の 4〜8 桁数値を走査
   - 結果: 該当なし（説明文のみで実コードの記載はなし）。Wi‑Fi パスワードのみ意図的に公開。

4. 公開確認（GitHub Pages）
   - URL: https://tsumugi-concierge.github.io/maison-notle-103/
   - 確認項目: lang-switcher（.lang-switcher/.lang-btn）の存在、assets/i18n.js の読込
   - 結果: 反映済みを確認（言語切替UIが表示され、i18n資産が参照されていることを取得HTMLで確認）。

5. 備考
   - Wi‑Fi 情報（SSID/パスワード/QR）はオーナー承認に基づき公開維持。
   - 本作業は当クローン内のみで実施し、main に push 済み。
