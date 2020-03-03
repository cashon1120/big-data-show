// API 接口地址
const BASE_URL = '/com/ymhx/'
export const apiUrl = {
  warning: 'alarmInfo',
  hot: 'chart',
  car: 'vehicleNum',
  running: 'onlineNum',
  safe: 'coutAllKind',
  speed: 'speed',
  position: 'location',
  risk: 'risk',
  today: 'today'
}

// 轮询间隔时间
export const duration = 10000

// 接口地址, 根据当前环境变动
export const baseUrl = () => {
  return process.env.NODE_ENV === 'development' ? BASE_URL : BASE_URL
}

// echarts 相关设置
export const ECHARTS_FONT_SIZE = 12
export const echartsConfig = {
  // name 样式
  nameTextStyle: {
    color: "#189CBF",
    fontSize: ECHARTS_FONT_SIZE
  },

  // 坐标轴线条样式 
  axisLine: {
    lineStyle: {
      color: '#174e71',
      width: 1
    }
  },

  // 坐标轴文字样式
  axisLabel: {
    textStyle: {
      color: '#189CBF',
      fontSize: ECHARTS_FONT_SIZE
    }
  },

  // 分隔线样式
  splitLine: {
    lineStyle: {
      color: '#174e71'
    }
  },
}