import Config from 'react-native-config'

const SIMPLE_INTEGER_REGEX = /^\d+$/

function cast (configValue) {
  if (['true', 'false'].indexOf(configValue) !== -1) {
    return Boolean(configValue)
  }
  if (SIMPLE_INTEGER_REGEX.test(configValue)) {
    return parseInt(configValue)
  }
  return configValue
}

const config = Object.keys(Config).reduce((acc, key) => {
  acc[key] = cast(Config[key])
  return acc
}, {})

export default config
