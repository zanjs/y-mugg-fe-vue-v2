<template>
  <div class="list">
    <Row>
      <Col>
      <Card>
        <div slot="title">
        <span class="pull-right">
          <DatePicker :value="dateVal" format="yyyy-MM-dd HH:mm:ss" @on-change="datePickerChange" type="datetimerange" placement="bottom-end" placeholder="选择日期" style="width: 300px"></DatePicker>
        </span>

        <Button type="primary" @click="refresh" shape="circle" ><Icon type="ios-loop-strong"></Icon> 刷新</Button>
        <Button type="success" shape="circle" >共 ：{{warerooms.length}} 仓库</Button>
        <Button type="success" shape="circle" >共 ：{{products.length}} 产品</Button>

        <span style="padding-left:10px;">
            平均天数：
        </span>
        <span style="padding-left:3px;">
            <Select v-model="selectDay" @on-change="changeSelectDay" style="width:100px">
                <Option v-for="item in select" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
        </span>
       
        </div>
        <div class="show-span" >
          <span class="health">
            健康状态 > 30
          </span>
          <span class="blue">
           30 > 适中 > 10
          </span>
          <span class="red">
            销量紧张 < 10
          </span>
          <span class="gray">
           库存 = 0
          </span>
        </div>
        <div class="table-box" style="padding-top:10px;">
          <table class="excel-table exportCsv">
            <tr>
              <th>
                产品/分仓
              </th>
              <th v-for="wareroom in warerooms" :key="wareroom.title">
                {{ wareroom.title }}
              </th>
               <th>
                合计
              </th>
               <th>
                分仓\产品
              </th>
            </tr>
            <tr v-for="pro in products" :key="pro.product.id">
              <td>
                {{ pro.product.title }}  
              </td>
              <td v-for="excel in pro.product_sattistics" :key="excel.created_at+excel.inventory_quantity">
                <span v-if="excel.inventory_quantity == 0" class="gray">
                  （{{ excel.inventory_quantity }} / {{ excel.sales_quantity}} 
                </span>
                <span v-else-if="excel.average > 30 " class="health">
                  （{{ excel.inventory_quantity }} / {{ excel.sales_quantity}} ）
                </span>
                <span v-else-if="excel.average > 10" class="blue">
                  （{{ excel.inventory_quantity }} / {{ excel.sales_quantity}} ）
                </span>
                <span v-else class="red">
                  （{{ excel.inventory_quantity }} / {{ excel.sales_quantity}} ）
                </span>
              </td>
               <td>
                ( {{ pro.toal.quantity}} / {{pro.toal.sales}} )
              </td>
               <td>
                {{ pro.product.title }}  
              </td>
            </tr>
          </table>
        </div>
      </Card>
      </Col>
    </Row>
  </div>
</template>
<script>
  import elementResizeDetectorMaker from 'element-resize-detector'
  import filterProduct from '../../common/filter/product'
  var erd = elementResizeDetectorMaker()
  export default {
    name: 'Statistics',
    components: {},
    data () {
      return {
        dateVal: [],
        selectDay: 30,
        select: [
          {
            value: 5,
            label: 5
          },
          {
            value: 7,
            label: 7
          },
          {
            value: 10,
            label: 10
          },
          {
            value: 15,
            label: 15
          },
          {
            value: 30,
            label: 30
          },
          {
            value: 40,
            label: 40
          }
        ],
        searchState: false,
        editModal: false,
        detailModal: false,
        deleteTip: false,
        showHeader: true, // 是否显示表头 @:show-header
        loading2: false, // 分页loading
        fixedHeader: false, // 是否固定表头 @:height
        tableSize: 'small', // @:size
        DateReady: false, // 判断异步数据加载完成，避免报错
        loading: false, // save
        saveDisabled: false,
        params: {},
        warerooms: [],
        products: []
      }
    },
    watch: {
      /**
       * @params 监听参数变化重新获取数据
       * */
      params: {
        handler (val) {
          console.log('params')
          console.log(val)
          this.getData(val)
        },
        deep: true
      }
    },
    computed: {
      state () {
        return this.$store.state.app
      }
    },
    methods: {
      searchShow () {
        this.searchState = !this.searchState
      },
      /**
       * 刷新页面请求
       * */
      refresh () {
        this.getData(this.params)
      },
      getData (params) {
        this.loading2 = true
        const selectDay = this.selectDay
        this.$api.statistics(params).then((res) => {
          console.log(res)
          if (!res.error) {
            const data = res.data
            this.warerooms = data.warerooms
            const products = filterProduct.excel(data.products, selectDay)
            this.products = products
            this.DateReady = true
            this.loading2 = false
          } else {
            this.$Message.error(res.status)
            this.loading2 = false
          }
        })
      },
      datePickerChange (e) {
        console.log(e)
        this.dateVal = e
        var params = this.params
        params.start_time = e[0]
        params.end_time = e[1]
        this.params = params
        console.log(params)
        this.getData(params)
      },
      // 选择 平均值周期天数
      changeSelectDay (e) {
        console.log(e)
        var params = this.params
        params.day = e
        this.selectDay = e
        this.params = params
        this.getData(params)
      }
    },
    created () {
      this.getData(this.params)
    },
    mounted () {
      erd.listenTo(window, 'resize', this.handleResize)
    }
  }
</script>
<style lang="less" scoped>
  .search-filter {
    opacity: 0;
    display: none;
    overflow: hidden;
    transition: all 0.28s ease-out;
    &.active {
      opacity: 1;
      display: block;
    }
  }
  .excel-table{
    width: 100%;
    border-collapse:collapse;
    border-spacing:0;
    th{
      background-color: #f5f7f9;
      padding:10px 16px;
      border: 1px solid #ccc;
      border-left: none;
      border-right: none;
      border-top: none;
      white-space: nowrap;
      // text-align: center;
    }
    td{
      padding: 10px;
      border: 1px solid #ccc;
      border-left: none;
      border-right: none;
       white-space: nowrap;  
    }
    tr:nth-child(odd){
      // background: #ccc;
    }
    tr{
      &:hover{
        background-color: #dddddd;
      }
    }
    tr:nth-child(even){
      // background: rebeccapurple;
    }
  }
  .table-box{
    overflow-y: auto;
  }
  .show-span{
    span{
      margin-right: 20px;
      padding-right: 10px;
      border-right: 2px solid #ccc; 
    }
  }
  .red{
    color: red;
  }
  .yellow{
    color: #ff7800;
  }
  .health{
    color: #24cc61;
  }
  .purple{
    color: #c921d6;
  }
  .blue{
    color: #3399ff;
  }
  .gray{
    color: #ededed;
  }
  .strong{
    font-weight: bold;
  }
</style>

