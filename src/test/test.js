import _ from 'lodash'
import moment from "moment";

// let a = []
// for (let i=0;i<10000;i++){
//     a.push({
//         id:i,
//         name: `a${i}`
//     })
// }
//
// console.time('filter')
// const filter = a.filter(item=>item.id === 9999);
// console.timeEnd('filter')
// console.log(filter)
//
// console.time('find')
// const find = a.find(item=>item.id === 9999);
// console.timeEnd('find')
// console.log(find)
//
//
// console.time('lodash-find')
// const l_find = _.find(a,item=>item.id === 9999);
// console.timeEnd('lodash-find')
// console.log(l_find)
//
// console.time('l_filter')
// const l_filter = _.filter(a,item=>item.id === 9999);
// console.timeEnd('l_filter')
// console.log(l_filter)
//
// const obj1 = {}
// const obj2 = {
//     children:[]
// }
// console.log(_.isNull(obj1.children))
// console.log(_.isUndefined(obj1.children))
// console.log(_.isEmpty(obj1.children))
// console.log(_.isNull(obj2.children))
// console.log(_.isUndefined(obj2.children))
// console.log(_.isEmpty(obj2.children))
//
// const res = _.find(a,(e)=>e.id===10001)
// console.log(res)
// console.log(_.isNull(res))
// console.log(_.isEmpty(res))

const token = ''
const unToken = undefined
console.log(_.isEmpty(token))
console.log(_.isEmpty(unToken))
console.log(_.isEmpty(null))
console.log(_.isEmpty(undefined))

console.log(moment().format('YYYY-MM-DD HH:mm:ss'))

