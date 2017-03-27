import { Platform, StyleSheet } from 'react-native'

const COMPOSITION_FONT_SIZE = 14
const TITLE_FONT_SIZE = 16
const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? 15 : 0

const general = StyleSheet.create({
  row: {
    flexDirection: 'row'
  }
})

const swiper = StyleSheet.create({
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30
  },
  text: {
    color: 'black',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center'
  }
})

const header = StyleSheet.create({
  container: {
    marginLeft: 20,
    marginRight: 20,
    marginTop: STATUS_BAR_HEIGHT + 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end'
  },
  buttonLeft: {
    width: 60,
    fontSize: COMPOSITION_FONT_SIZE,
    textAlign: 'left'
  },
  buttonRight: {
    width: 60,
    fontSize: COMPOSITION_FONT_SIZE,
    textAlign: 'right'
  },
  title: {
    flex: 1,
    fontSize: TITLE_FONT_SIZE,
    fontWeight: 'bold',
    textAlign: 'center'
  }
})

const editor = StyleSheet.create({
  input: {
    paddingLeft: 20,
    paddingRight: 20,
    fontSize: COMPOSITION_FONT_SIZE,
    fontFamily: 'System',
    textAlignVertical: 'top'  // Android messed up without this
  },
  page: {
    flex: 1
  },
  scrollView: {
    flex: 1
  },
  contentContainerStyle: {
    flex: 1,
    justifyContent: 'flex-start'
  }
})

const community = StyleSheet.create({
  content: {
    paddingTop: 10,
    paddingLeft: 20,
    paddingRight: 20,
    fontSize: COMPOSITION_FONT_SIZE,
    fontFamily: 'System'
  },
  container: {
    flex: 1
  },
  title: {
  },
  titleBold: {
    fontWeight: 'bold'
  }
})

const buttons = StyleSheet.create({
  loginView: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
    backgroundColor: 'black',
    justifyContent: 'center'
  },
  loginText: {
    fontSize: 18,
    textAlign: 'center',
    margin: 10,
    color: '#ffffff'
  },
  loginTouchableOpacity: {
    height: 44
  }
})

const tinyFontSize = 10

const text = StyleSheet.create({
  tiny: {
    fontSize: tinyFontSize,
    color: 'black',
    fontStyle: 'italic',
    fontWeight: 'bold'
  },
  title: {
    fontSize: 16,
    fontWeight: '500'
  },
  titleSmall: {
    fontSize: 16,
    fontWeight: 'normal'
  }
})

export default {
  header,
  swiper,
  general,
  editor,
  buttons,
  community,
  text
}
