// RESAS APIから都道府県一覧を取得するためのURL
const PREFECTURES_API_URL = "https://opendata.resas-portal.go.jp/api/v1/prefectures";

// RESAS APIのAPIキー（ご自身のAPIキーに変更してください）
const API_KEY = "CUyR79smOCQ19fWQWllDti0rBs15Dpcx0XkgqcAf";

// Vue.jsのアプリケーションを作成する
const app = new Vue({
  el: "#app",
  data: {
    // チェックボックスの初期状態
    checkboxes: {},
    // 都道府県一覧
    prefectures: [],
    // 選択された都道府県の人口構成データ
    populationData: [],
  },
  methods: {
    // RESAS APIから都道府県一覧を取得する関数
    async getPrefectures() {
      try {
        const response = await fetch(PREFECTURES_API_URL, {
          headers: {
            "X-API-KEY": API_KEY,
          },
        });
        const data = await response.json();
        this.prefectures = data.result;
      } catch (error) {
        console.log(error);
      }
    },

    // 都道府県のチェックボックスが変更されたときに呼び出される関数
    async onCheckboxChanged() {
      // 選択された都道府県のコードを取得する
      const selectedPrefectures = Object.keys(this.checkboxes).filter(
        (key) => this.checkboxes[key]
      );
      if (selectedPrefectures.length === 0) {
        return;
      }
      const prefCode = selectedPrefectures[0];

      // 選択された都道府県の人口構成データを取得するためのURL
      const POPULATION_API_URL = `https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?cityCode=-&prefCode=${prefCode}`;

      try {
        const response = await fetch(POPULATION_API_URL, {
          headers: {
            "X-API-KEY": API_KEY,
          },
        });
        const data = await response.json();

        // 取得したデータから、折れ線グラフ用のデータを作成する
        this.populationData = data.result.data[0].data.map((item) => ({
          year: item.year,
          value: item.value,
        }));
      } catch (error) {
        console.log(error);
      }
    },
  },
  created() {
    this.getPrefectures();
  },
});
