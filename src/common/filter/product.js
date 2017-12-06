export default {
  excel (product, selectDay) {
    const data = product
    const len = data.length
    const vm = this
    let i
    const arr = []
    for (i = 0; i < len; i++) {
      const item = data[i]
      // const product = item.product
      // item.product_title = product.title
      const productSattistics = item.product_sattistics
      item.toal = vm.quantityTotal(productSattistics, selectDay)
      arr.push(item)
    }
    return arr
  },
  quantityTotal (productExcelQuantity, selectDay) {
    const warerooms = productExcelQuantity
    const len = warerooms.length
    // console.log(warerooms)
    let i
    const toal = {'quantity': 0, 'sales': 0}
    let quantity = 0
    let sales = 0
    for (i = 0; i < len; i++) {
      const item = warerooms[i]
      quantity += item.inventory_quantity
      sales += item.sales_quantity

      const mean = item.mean
      const average = mean / selectDay
      item.average = average
      console.log(average)
    }

    toal.quantity = quantity
    toal.sales = sales

    return toal
  }
}
