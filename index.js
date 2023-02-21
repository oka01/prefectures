
export default {
  data() {
    return {
      prefectures: [],
      selectedPrefectures: [],
    };
  },
  mounted() {
    this.fetchPrefectures();
  },
  methods: {
    async fetchPrefectures() {
      const apiKey = "CUyR79smOCQ19fWQWllDti0rBs15Dpcx0XkgqcAf";
      const apiUrl = "https://opendata.resas-portal.go.jp/api/v1/prefectures";

      const response = await fetch(apiUrl, {
        headers: {
          "X-API-KEY": apiKey,
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      this.prefectures = data.result;
    },
  },
};
