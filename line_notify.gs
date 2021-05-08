// LINEにメッセージ送信
function lineNotify() {

  // 変数
  let accessToken = PropertiesService.getScriptProperties().getProperty("line_access_token");
  let url = "https://api.line.me/v2/bot/message/push";
  let userID = PropertiesService.getScriptProperties().getProperty("userID");

  // リクエストヘッダー
  let headers = {"Content-Type": "application/json",'Authorization': 'Bearer ' + accessToken,};

  // メッセージ
  let message = {"to": userID, "messages": [{'type': 'text', 'text': "aa",}]};
  let jsonString = JSON.stringify(message)

  // パラメーター
  let parameters = {"method": "post","headers": headers,"payload": jsonString};

  UrlFetchApp.fetch(url, parameters);
}
