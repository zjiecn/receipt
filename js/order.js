var app = new Vue({
    el: '#app',
    data: {
      currentIndex: '00',
      showFilter: false, // 展开筛选条件
      currentYear: 2023,
      tabs: [ {name: '全部', type: '00' }, {name: '销售单', type: "01"}, {name: '退货单', type: '02'}, {name: '预订单', type: '03'}, {name: '提货单', type: '04'} ],
      years: [2018, 2019, 2020, 2021, 2022, 2023],
      orderList: [], // 订单列表
      phone: '',
      openId: '',
    },
    mounted() {
      this.initYear()
      this.phone =  getQueryParam('phone') || '13072105015'
      this.openId =  getQueryParam('openId') || ''
      this.getOrderList();
    },
    methods: {
      initYear() {
        this.currentYear = new Date().getFullYear();
        let lastYear = this.years[this.years.length - 1]

        // 当客户端时间时间小于2023的时候 重置为2023
        if (this.currentYear < lastYear) {
          this.currentYear = 2023;
          return;
        }
        // 当客户端时间大于2023年的时候 补充默认年份可选列表
        while(lastYear < this.currentYear) {
          lastYear++
          this.years.push(lastYear)
        }
      },
      handleTabChange(index) {
          this.currentIndex = index;
          this.getOrderList();
      },
      handleGoDetail(saleSoId = '') {
        const { phone = '13072105015', openId = '' } = this;
        window.location.href = `./detail.html?salesoId=${saleSoId}&phone=${phone}&openId=${openId}`
      },
      handleFilter(key) {
        this.currentYear = key;
        this.showFilter = false;
        this.getOrderList()
      },
      async getOrderList() {
        try {
          let res = await axios.post(`${host}/GansoSmartTicket/api/GetSTInfo`, {
            "openId": this.openId,
            "phone": this.phone,
            "saleFlg": this.currentIndex,
            "saleTime": this.currentYear,
          })
            if (res && res.data && res.data.data && res.data.data.length && res.data.condition === '200') {
                this.orderList = res.data.data || [];
            } else {
                this.orderList =[];
            }
        } catch (error) {
          console.log('网络错误，稍后重试！')
        }
      }
    }
  })