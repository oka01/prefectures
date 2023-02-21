import axios from "axios";

const ACCESS_TOKEN = "CUyR79smOCQ19fWQWllDti0rBs15Dpcx0XkgqcAf";

export default {
  data() {
    return {
      prefectures: []
    };
  },
  mounted() {
    this.initPrefectures();
  },
  methods: {
    /* APIにアクセス */
    fetchAPI: function(path) {
      const response = axios.get(
        `https://opendata.resas-portal.go.jp/api/v1/${path}`,
        {
          headers: { "X-API-KEY": "CUyR79smOCQ19fWQWllDti0rBs15Dpcx0XkgqcAf" }
        }
      );
      return response;
    },

    /* 県の初期表示 */
    initPrefectures: async function() {
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
    },

    /* グラフを描画 */
    drawChart: async function(id, name) {
      const path = `population/composition/perYear?cityCode=-&prefCode=${id}`;
      try {
        const response = await this.fetchAPI(path);
        const population = response.data.result.data[0].data.map(
          val => val["value"]
        );
        this.$emit("onAddSeries", id, name, population);
        this.prefectures[id - 1].isChecked = true;
      } catch (error) {
        console.error(error.message);
      }
    },

    /* グラフを削除 */
    deleteChart: function(id) {
      this.$emit("onRemoveSeries", id);
      this.prefectures[id - 1].isChecked = false;
    },

    /* グラフの表示非表示を切り替え */
    switchChart: function(id, name, isChecked) {
      if (isChecked) {
        this.deleteChart(id);
      } else {
        this.drawChart(id, name);
      }
    }
  }
};