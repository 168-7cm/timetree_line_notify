function getUpcomingEventsByDays() {
  getUpcomingEvents("1");
}

// TimeTreeからイベント取得
function getUpcomingEvents(days) {

  // 変数
  let calendarID = PropertiesService.getScriptProperties().getProperty("calendarID");
  let accessToken = PropertiesService.getScriptProperties().getProperty("timetree_access_token");
  let url = `https://timetreeapis.com/calendars/${calendarID}/upcoming_events`;
  let accept = "application/vnd.timetree.v1+json";
  let timezone = "Asia/Tokyo";
  let include = "label";

  // リクエストヘッダー
  let headers = { "accept": accept, "Authorization": "Bearer " + accessToken,}; 

  // パラメーター
	let parameters = { "headers": headers, "timezone": timezone, "days": days, "include": include};

   let response =  UrlFetchApp.fetch(url, parameters);
   return getResponseData(response);
}

function getCalendarEvents(response) {
   let json = JSON.parse(response.getContentText());
   let datas = json["data"];

   datas.forEach((data) => {
     let attributes = data["attributes"];

     // タイトル、開始時刻、週力時刻
     let title = data["title"];
     let start_time = formatTime(attributes["start_at"]);
     let end_time = formatTime(attributes["end_at"]);
   })
}

// 日付を指定のフォーマットに整形
function formatTime(time) {
  let formatTime = Utilities.formatDate(new Date(time), "Asia/Tokyo", "HH:mm");
  return formatTime
}
