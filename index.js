import axios from 'axios'

ACCESS_TOKEN = "CUyR79smOCQ19fWQWllDti0rBs15Dpcx0XkgqcAf";
function api(path){
  const response = axios.get("https://opendata.resas-portal.go.jp/api/v1/${path}",
        {
          headers: { "X-API-KEY": ACCESS_TOKEN }
        }
      );
  return response;
},
 const path = "prefectures";
      try {
        const response = await this.fetchAPI(path);
        this.prefectures = response.data.result.map(val => {
          return {
            id: val["prefCode"],
            name: val["prefName"],
            isChecked: false
          };
        });
      } catch (error) {
        console.error(error.message);
      }


