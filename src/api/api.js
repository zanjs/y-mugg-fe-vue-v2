import fetch from './fetch.js'

// // 登录
// export function login (data) {
//   return fetch({
//     url: `''`,
//     method: 'post',
//     data
//   })
// }

const Login = data => {
  return fetch({
    url: `/v1/login`,
    method: 'POST',
    data
  })
}
// // 登出
// export function logout () {
//   return fetch({
//     url: '',
//     method: 'post'
//   })
// }

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

/**
 * 提交用户注册信息
 * @param params
 */
const postUserInfo = params => {
  return fetch({
    url: '',
    method: 'post',
    data: params
  })
}

/**
 * 验证邮箱 token是否过期
 * @param params
 */
const checkToken = params => {
  return fetch({
    url: '',
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
  userList,
  postUserInfo,
  checkToken
}

export default apiList
