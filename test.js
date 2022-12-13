const request = require("request"); //APIFetchLibrary
require("dotenv").config(); //envLibrary
//TOKENは一定時間経つと使えなくなるので新規で取得する必要がある。
//コンソールにて'gcloud auth application-default print-access-token'

// エンドポイントをデプロイしたリージョン
const REGION = process.env.REGION;

// 現在選択しているプロジェクトID
const PROJECT_ID = process.env.PROJECT_ID;

// 作成されたエンドポイントのID
const ENDPOINT_ID = process.env.ENDPOINT_ID;

try {
  request.post(
    {
      uri: `https://${REGION}-aiplatform.googleapis.com/v1/projects/${PROJECT_ID}/locations/${REGION}/endpoints/${ENDPOINT_ID}:predict`,
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${process.env.TOKEN}`,
      },
      json: {
        instances: [
          {
            longitude: "-122.24",
            latitude: "37.85",
            housing_median_age: "52",
            total_rooms: "1467",
            total_bedrooms: "190",
            population: "496",
            households: "177",
            median_income: "7.2574",
            median_house_value: "352100",
            ocean_proximity: "NEAR BAY",
          },
        ],
      },
    },
    (err, res, data) => {
      console.log(data);
    }
  );
} catch (error) {
  console.log(error);
}
