var app = new Vue({
    el: '#app',
    data: {
        salesoId: '',
        phone: '',
        openId: '',
        orderDetail: {},
        rsvpLineDatas: {},
        res: {},
        error: {},
    },
   async mounted() {
        this.salesoId =  getQueryParam('salesoId') || '';
        this.phone =  getQueryParam('phone') || '';
        this.openId =  getQueryParam('openId') || '';
        await this.getOrderDetail();
        this.init();
    },
    methods: {
        init() {
            // 生成条形码
            JsBarcode("#barcode", this.salesoId, {displayValue: false});
            // 生成二维码
            new QRCode(document.getElementById("qrcode"),  this.orderDetail.fullELC);
        },
        goMiniProgram() {
            wx.miniProgram.reLaunch({
                url: "/pages/home/index", //小程序地址
            });
        },
        async getOrderDetail() {
            try {
                const res = await axios.post(`${host}/GansoSmartTicket/api/GetSTDetails`,{
                    saleSoId: this.salesoId,
                    phone: this.phone,
                    openId: this.openId,
                })
                this.res = res;
                if (res && res.data && res.data.data && res.data.data.length && res.data.condition === '200') {
                    const data = res.data.data[0]
                    this.orderDetail = data || {};
                    if (data && data.rsvpLineDatas && data.rsvpLineDatas.length) {
                        this.rsvpLineDatas = data.rsvpLineDatas[0]
                    }
                }
            } catch (error) {
                this.error
                console.log('网络错误，稍后重试！')
            }
        }
    }
  })