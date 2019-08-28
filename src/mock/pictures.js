import Mock from 'mockjs'
import moment from 'moment'

const list = []
const count = 100
let classifyFun = (number) => {
  if ((number.toString()).indexOf(1) >= 0) {
    return '分类1'
  } else if ((number.toString()).indexOf(2) >= 0) {
    return '分类2'
  } else if ((number.toString()).indexOf(3) >= 0) {
    return '分类3'
  } else if ((number.toString()).indexOf(4) >= 0) {
    return '分类4'
  } else if ((number.toString()).indexOf(5) >= 0) {
    return '分类5'
  } else {
    return '其他分类'
  }
}
let classifyIdFun = (number) => {
  if ((number.toString()).indexOf(1) >= 0) {
    return 1
  } else if ((number.toString()).indexOf(2) >= 0) {
    return 2
  } else if ((number.toString()).indexOf(3) >= 0) {
    return 3
  } else if ((number.toString()).indexOf(4) >= 0) {
    return 4
  } else if ((number.toString()).indexOf(5) >= 0) {
    return 5
  } else {
    return 0
  }
}
for (let i = 0; i < count; i++) {
  list.push(
    Mock.mock({
      id: i + 1,
      name: Mock.Random.ctitle(2, 10),
      classifyName: classifyFun(i + 1),
      classifyId: classifyIdFun(i + 1),
      createTime: Mock.Random.date('yyyy-MM-dd HH:mm:ss'),
      url: Mock.Random.image('400x300', `${Mock.Random.color()}`)
    })
  )
}

export default {
  getPictures: () => {
    return {
      result: 0,
      data: list
    }
  },
  selectionSort: (config) => {
    let { classifyId } = JSON.parse(config.body)
    let newList = list.filter((element) => {
      return element.classifyId === classifyId
    })
    return {
      result: 0,
      data: newList
    }
  },
  picturesSort: (config) => {
    let { sort } = JSON.parse(config.body)
    let newList = list.map((element) => {
      element.createTimeVaule = moment(element.createTime).valueOf()
    })
    let resultList = []
    // sort为1降序，为0升序
    if (sort === 1) {
      newList.sort((a, b) => {
        return b - a
      })
      resultList = newList.map((element) => {
        delete element.createTimeVaule
      })
    } else if (sort === 0) {
      newList.sort((a, b) => {
        return a - b
      })
      resultList = newList.map((element) => {
        delete element.createTimeVaule
      })
    }
    return {
      result: 0,
      data: resultList
    }
  }
}