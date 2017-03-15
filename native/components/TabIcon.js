import React, {
  PropTypes,
} from 'react';
import {
  Text,
} from 'react-native';

const propTypes = {
  selected: PropTypes.bool,
  title: PropTypes.string,
};

const TabIcon = (props) => (
  <Text
    style={{ 
      fontWeight: props.selected ? 'bold' : 'normal',
    }}
  >
    {props.title}
  </Text>
);

TabIcon.propTypes = propTypes;

export default TabIcon;
