const apiUrl = {
  warning: '/com/ymhx/alarmInfo',
  hot: '/com/ymhx/chart',
  car: '/com/ymhx/vehicleNum',
  running: '/com/ymhx/onlineNum',
  safe: '/com/ymhx/coutAllKind',
  speed: '/com/ymhx/speed',
  position: '/com/ymhx/location',
  risk: '/com/ymhx/risk',
  today: '/com/ymhx/today'
}

const duration = 10000

const baseUrl = () => {
  return process.env.NODE_ENV === 'development' ? '' : ''
}

export {
  apiUrl,
  baseUrl,
  duration
}