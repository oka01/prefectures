const API_KEY = 'CUyR79smOCQ19fWQWllDti0rBs15Dpcx0XkgqcAf';

Vue.component('prefecture-checkbox', {
  props: {
    prefecture: Object,
    selectedPrefectures: Array,
  },
  computed: {
    isSelected() {
      return this.selectedPrefectures.includes(this.prefecture.prefCode);
    },
  },
  methods: {
    toggleSelection() {
      if (this.isSelected) {
        const index = this.selectedPrefectures.indexOf(this.prefecture.prefCode);
        this.selectedPrefectures.splice(index, 1);
      } else {
        this.selectedPrefectures.push(this.prefecture.prefCode);
      }
    },
  },
  template: `
    <div>
      <input type="checkbox" :id="'prefecture-' + prefecture.prefCode" :value="prefecture.prefCode" :checked="isSelected" @change="toggleSelection">
      <label :for="'prefecture-' + prefecture.prefCode">{{ prefecture.prefName }}</label>
    </div>
  `
});

Vue.component('population-chart', {
  props: {
    data: Array,
    label: String,
  },
  mounted() {
    this.renderChart();
  },
  methods: {
    renderChart() {
      const labels = this.data.map(item => item.year);
      const values = this.data.map(item => item.value);

      const canvas = this.$refs.chart;
      const ctx = canvas.getContext('2d');
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: labels,
          datasets: [{
            label: this.label,
            data: values,
            fill: false,
            borderColor: 'blue',
            pointBackgroundColor: 'blue',
          }],
        },
        options: {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true,
              },
            }],
          },
        },
      });
    },
  },
  template: '<canvas ref="chart"></canvas>',
});

new Vue({
  el: '#app',
  data: {
    prefectures: [],
    selectedPrefectures: [],
    populationData: null,
  },
  created() {
    this.fetchPrefectures();
  },
  computed: {
    isSelectionValid() {
      return this.selectedPrefectures.length > 0;
    },
  },
  methods: {
    async fetchPrefectures() {
      const url = 'https://opendata.resas-portal.go.jp/api/v1/prefectures';
      const response = await fetch(url, {
        headers: {
          'X-API-KEY': API_KEY,
        },
      });

      if (!response.ok) {
        throw new Error('Network response
