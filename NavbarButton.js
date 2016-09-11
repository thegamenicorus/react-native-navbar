import React, { Component, PropTypes } from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  Image
} from 'react-native';

import styles from './styles';

export default class NavbarButton extends Component {
  render() {
    const { style, tintColor, margin, title, handler, type,  resizeMode, source} = this.props;
    if(type == 1){
      return (
        <TouchableOpacity style={[styles.navBarButtonImage, {justifyContent: style[1].justifyContent}]} onPress={handler}>
         <Image
            style={style}
            resizeMode={resizeMode}
            source={source}
          />
        </TouchableOpacity>
      );
    }
    else{
      return (
        <TouchableOpacity style={styles.navBarButton} onPress={handler}>
          <View style={style}>
            <Text style={[styles.navBarButtonText, { color: tintColor, }, ]}>{title}</Text>
          </View>
        </TouchableOpacity>
      );
    }
  }

  static propTypes = {
    style: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.array,
    ]),
    tintColor: PropTypes.string,
    title: PropTypes.string,
    handler: PropTypes.func,
  };

  static defaultProps = {
    style: {},
    title: '',
    tintColor: '#0076FF',
    onPress: () => ({}),
  };
}
