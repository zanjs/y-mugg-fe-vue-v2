<template>
  <div class="list">
    <Row>
      <Col>
      <Card>
        <div slot="title">
          <Button type="primary" @click="refresh" shape="circle" ><Icon type="ios-loop-strong"></Icon> 刷新</Button>
          <Button type="success" shape="circle" >共 ：{{count}} 条数据</Button>
          <Button type="primary" @click="asyncInventory" shape="circle" ><Icon type="ios-loop-strong"></Icon> 库存同步</Button>
          <Col span="6" style="padding-right:10px">
            <Select clearable  filterable @on-change="changeWareroom" >
                <Option v-for="item in warerooms" :value="item.id" :key="item.id">{{ item.title }}</Option>
            </Select>
          </Col>
          <Col span="6" style="padding-right:10px">
            <Select clearable  filterable @on-change="changeProduct" >
                <Option v-for="item in products" :value="item.id" :key="item.id">{{ item.title }}</Option>
            </Select>
          </Col>
        </div>
        <Table :loading="loading2" :show-header="showHeader" :height="fixedHeader ? 300 : ''" :size="tableSize"
               :data="listData"
               :columns="columns1" ref="table" @on-select="onSelect" @on-selection-change="onSelectionChange"></Table>
        <Page :total="count" show-sizer show-elevator @on-change="pageChange" style="margin-top: 10px"
              @on-page-size-change="PageSizeChange"></Page>
      </Card>
      </Col>
    </Row>
    <!--删除提示  -->
    <Modal v-model="deleteTip" width="360">
      <p slot="header" style="color:#f60;text-align:center">
        <Icon type="information-circled"></Icon>
        <span>删除确认</span>
      </p>
      <div style="text-align:center">
        <p>此操作讲删除{{selection.length}}条数据,并不可恢复。</p>
        <p>是否继续删除？</p>
      </div>
      <div slot="footer">
        <Button type="error" size="large" long @click="deleteBatch">删除</Button>
      </div>
    </Modal>
    <!--删除提示 / -->
    <!-- 编辑 -->
    <Modal v-model="editModal" v-if='DateReady'>
      <p slot="header" style="text-align:center">
        <Icon type="information-circled"></Icon>
        <span v-if="currIndex==-1">新增</span>
        <span v-if="currIndex!=-1">编辑</span>
      </p>
      <div style="text-align:center">
        <Form :model="formItem" :label-width="80">
          <Form-item label="库存">
            <Input v-model="currDate.quantity" placeholder="请输入"></Input>
          </Form-item>
          <Form-item label="销量">
            <Input v-model="currDate.sales" placeholder="请输入"></Input>
          </Form-item>
        </Form>
      </div>
      <div slot="footer">
        <Button type="success" size="large" long @click.native="saveBatch" :loading="loading" :disabled="saveDisabled">
          保存
        </Button>
      </div>
    </Modal>
    <!-- 编辑/ -->
  </div>
</template>
<script>
  import elementResizeDetectorMaker from 'element-resize-detector'
  import { timeAgo } from '../../common/filter'
  var erd = elementResizeDetectorMaker()
  export default {
    name: 'record',
    components: {},
    data () {
      return {
        formItem: {
          input: '',
          select: '',
          date: '',
          time: '',
          radio: '',
          checkbox: []
        },
        warerooms: [],
        products: [],
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
        currDate: {}, // 当前编辑和新增的行数据
        currIndex: 0, // 当前编辑和新增的行号
        saveDisabled: false,
        async: false,
        params: {
          offset: 0,
          limit: 10
        },
        count: 0,
        selection: [], // 表格选中项
        listData: [], // @:data
        columns1: [
          {
            title: '同步时间',
            key: 'updated_at',
            sortable: true
          },
          {
            title: '产品信息',
            key: 'product_title',
            // render: function (h, params) {
            //   return h('div', params.row.product.title)
            // },
            className: 'min-width',
            sortable: true
          },
          {
            title: '仓库信息',
            key: 'wareroom_title',
            // render: function (h, params) {
            //   return h('div', params.row.wareroom.title)
            // },
            sortable: true
          },
          {
            title: '库存',
            key: 'quantity',
            sortable: true
          }
          // {
          //   title: '操作',
          //   key: 'action',
          //   width: 120,
          //   fixed: 'right',
          //   align: 'center',
          //   render: (h, params) => {
          //     return h('div', [
          //       h('Button', {
          //         props: {
          //           type: 'text',
          //           size: 'small'
          //         },
          //         style: {
          //           color: '#5cadff'
          //         },
          //         on: {
          //           click: () => {
          //             this.edit(params.index)
          //           }
          //         }
          //       }, '编辑'),
          //       h('Button', {
          //         props: {
          //           type: 'text',
          //           size: 'small'
          //         },
          //         style: {
          //           color: '#ff3300'
          //         },
          //         on: {
          //           click: () => {
          //             this.remove(params.index)
          //           }
          //         }
          //       }, '删除')
          //     ])
          //   }
          // }
        ]
      }
    },
    watch: {
      /**
       * @params 监听参数变化重新获取数据
       * */
      params: {
        handler (val) {
          this.getData(val)
        },
        deep: true
      },
      fixedHeader: {
        handler (val) {
          if (val) {
            this.$Message.info('表头已固定')
          }
        }
      },
      currDate: {
        handler (val) {
          console.log(val)
          for (let i = 0; i < Object.values(val).length; i++) {
            if (Object.values(val)[i] === '') {
              this.saveDisabled = true
              return
            } else {
              this.saveDisabled = false
            }
          }
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
      /**
       * @params:category 分类 page：页码 limit:条数
       * */
      getData (params) {
        this.loading2 = true
        this.$api.inventoryList(params).then((res) => {
          console.log(res)
          if (!res.error) {
            // const list = filter.RecordList(res.data)
            const data = res.data
            const list = data.data
            const len = list.length
            let i
            // const arr = []
            for (i = 0; i < len; i++) {
              const item = list[i]
              item.updated_at = timeAgo(item.updated_at)
              item.created_at = timeAgo(item.created_at)
              item.product_title = item.product.title
              item.wareroom_title = item.wareroom.title
                // arr.push(item)
            }
            if (data.page.count) {
              this.count = data.page.count
            }
            this.listData = list
            this.DateReady = true
            this.loading2 = false
          } else {
            this.$Message.error(res.msg)
            this.loading2 = false
          }
        })
      },
      asyncInventory () {
        if (this.async) {
          this.$Message.error('同步任务执行中,')
          return
        }
        this.loading2 = true
        this.async = true
        this.$api.syncQnventory({}).then((res) => {
          this.$Message.info('同步任务执行中,稍等几分钟才可以看到数据更新哦')
          this.loading2 = false
        })
        setTimeout(() => {
          this.async = false
        }, 300000)
      },
      getProducts () {
        this.$api.productList({}).then((res) => {
          if (res) {
            this.products = res
            this.DateReady = true
          } else {
            this.$Message.error(res.msg)
          }
        })
      },
      getWarerooms () {
        this.$api.wareroomList({}).then((res) => {
          if (res) {
            this.warerooms = res
            this.DateReady = true
          } else {
            this.$Message.error(res.msg)
          }
        })
      },
      changeWareroom (e) {
        console.log(e)
        this.params.wareroom_id = e
        this.getData(this.params)
      },
      changeProduct (e) {
        console.log(e)
        this.params.product_id = e
        this.getData(this.params)
      },
      /**
       * @on-change 页码改变的回调，返回改变后的页码
       * */
      pageChange (page) {
        this.params.offset = page - 1
      },
      /**
       * @on-page-size-change 切换每页条数时的回调，返回切换后的每页条数
       * */
      PageSizeChange (limit) {
        this.params.limit = limit
      },
      /**
       * 删除
       */
      remove (index) {
        this.$Message.error('开发中')
        // console.log(this.listData[index])
        // var id = this.listData[index].id
        // var params = {id}
        // this.$api.productDelete(params).then((res) => {
        //   console.log(res)
        // })
        // this.listData.splice(index, 1)
      },
      edit (index) {
        this.editModal = true
        this.currIndex = index
        if (index === -1) { // 新增
          this.currDate = {
            title: '',
            external_code: ''
          }
        } else { // 编辑
          this.currDate = this.listData[index]
        }
      },
      /**
       * 批量删除
       */
      deleteBatch () {
        this.deleteTip = false
        // ...
      },
      saveBatch () {
        this.loading = true
        var vm = this
        var params = this.currDate
        this.$api.recordUpdate(params).then((res) => {
          console.log(res)
          this.loading = false
          this.$Message.info('跟新成功')
          this.editModal = false
          vm.refresh()
        })
      },
      /**
       * 数据导出
       * @ type 1 原始数据 2过滤数据
       */
      exportData (type) {
        if (type === 1) {
          this.$refs.table.exportCsv({
            filename: '原始数据'
          })
        } else if (type === 2) {
          this.$refs.table.exportCsv({
            filename: '排序和过滤后的数据',
            original: false
          })
        }
      },
      /**
       * 多选
       * selection：已选项数据 row：刚选择的项数据
       */
      onSelect (selection, row) {
        // console.log(selection,row)
      },
      onSelectionChange (selection) {
        this.selection = selection
      }
    },
    created () {
      this.getData(this.params)
      this.getWarerooms()
      this.getProducts()
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
</style>

