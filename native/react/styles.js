import { StyleSheet } from 'react-native';

const COMPOSITION_FONT_SIZE = 14;
const TITLE_FONT_SIZE = 16;

const header = StyleSheet.create({
  container: {
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  button: {
    width: 60,
    fontSize: COMPOSITION_FONT_SIZE,
    textAlign: 'right',
  },
  title: {
    flex: 1,
    fontSize: TITLE_FONT_SIZE,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

const editor = StyleSheet.create({
  input: {
    paddingLeft: 20,
    paddingRight: 20,
    fontSize: COMPOSITION_FONT_SIZE,
    fontFamily: 'System',
    textAlignVertical: 'top',  // Android messed up without this
  },
  page: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  contentContainerStyle: {
    flex: 1,
    justifyContent: 'flex-start',
  },
})

const community = StyleSheet.create({
  content: {
    paddingTop: 10,
    paddingLeft: 20,
    paddingRight: 20,
    fontSize: COMPOSITION_FONT_SIZE,
    fontFamily: 'System',
  },
  container: {
    flex: 1,
  },
  title: {
  },
  titleBold: {
    fontWeight: 'bold',
  }
})

export default {
  header,
  editor,
  community,
}
