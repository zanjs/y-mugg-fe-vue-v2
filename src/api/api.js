import fetch from './fetch.js'

const Login = data => {
  return fetch({
    url: `/v1/login`,
    method: 'POST',
    data
  })
}

const syncQnventory = params => {
  return fetch({
    url: `/jobs/sync_qnventory`,
    method: 'get',
    params
  })
}

const recordExcelList = params => {
  return fetch({
    url: `/v1/records/excel`,
    method: 'get',
    params
  })
}

const recordExcelListQ2 = params => {
  return fetch({
    url: `/v1/records/q2`,
    method: 'get',
    params
  })
}

// 统计
const statistics = params => {
  return fetch({
    url: `/v1/statistics`,
    method: 'get',
    params
  })
}

// 库存
const inventoryList = params => {
  return fetch({
    url: `/v1/inventorys`,
    method: 'get',
    params: params
  })
}

const saleList = params => {
  return fetch({
    url: `/v1/sales`,
    method: 'get',
    params: params
  })
}

const transportList = params => {
  return fetch({
    url: `/v1/transports`,
    method: 'get',
    params: params
  })
}

const recordList = params => {
  return fetch({
    url: `/v1/records`,
    method: 'get',
    params: params
  })
}

// 更新库存
const saleUpdate = params => {
  return fetch({
    url: `/v1/sales/${params.id}`,
    method: 'PUT',
    params: params
  })
}

const recordUpdate = params => {
  return fetch({
    url: `/v1/records/${params.id}`,
    method: 'PUT',
    params: params
  })
}

const productList = params => {
  return fetch({
    url: `/v1/products`,
    method: 'get',
    params: params
  })
}

const wareroomList = params => {
  return fetch({
    url: `/v1/warerooms`,
    method: 'get',
    params: params
  })
}

const productCreate = params => {
  return fetch({
    url: `/v1/products`,
    method: 'POST',
    params: params
  })
}

const productUpdate = params => {
  return fetch({
    url: `/v1/products/${params.id}`,
    method: 'PUT',
    params: params
  })
}

const wareroomCreate = params => {
  return fetch({
    url: `/v1/warerooms`,
    method: 'POST',
    params: params
  })
}

const wareroomUpdate = params => {
  return fetch({
    url: `/v1/warerooms/${params.id}`,
    method: 'PUT',
    params: params
  })
}

const productDelete = params => {
  return fetch({
    url: `/v1/products/${params.id}`,
    method: 'DELETE',
    params: ''
  })
}

const wareroomDelete = params => {
  return fetch({
    url: `/v1/warerooms/${params.id}`,
    method: 'DELETE',
    params: ''
  })
}

const userList = params => {
  return fetch({
    url: '/api/person/getPersonListByCompany',
    method: 'get',
    params: params
  })
}

const apiList = {
  Login,
  recordUpdate,
  saleUpdate,
  statistics,
  syncQnventory,
  saleList,
  transportList,
  inventoryList,
  recordList,
  recordExcelList,
  recordExcelListQ2,
  productUpdate,
  productList,
  wareroomList,
  productCreate,
  wareroomCreate,
  wareroomUpdate,
  productDelete,
  wareroomDelete,
  userList
}

export default apiList
