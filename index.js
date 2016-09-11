import React, { Component, PropTypes } from 'react';
import {
  PixelRatio,
  StatusBar,
  Text,
  View,
  Platform,
  Image
} from 'react-native';

import NavbarButton from './NavbarButton';
import styles from './styles';

const ButtonShape = {
  //title: PropTypes.string.isRequired,
  style: PropTypes.any,
  handler: PropTypes.func,
};

const TitleShape = {
  //title: PropTypes.string.isRequired,
  tintColor: PropTypes.string,
};

const StatusBarShape = {
  style: PropTypes.oneOf(['light-content', 'default', ]),
  hidden: PropTypes.bool,
  tintColor: PropTypes.string,
  hideAnimation: PropTypes.oneOf(['fade', 'slide', 'none', ]),
  showAnimation: PropTypes.oneOf(['fade', 'slide', 'none', ])
};

function customizeStatusBar(data) {
  if (Platform.OS === 'ios') {
    if (data.style) {
      StatusBar.setBarStyle(data.style);
    }
    const animation = data.hidden ?
    (data.hideAnimation || NavigationBar.defaultProps.statusBar.hideAnimation) :
    (data.showAnimation || NavigationBar.defaultProps.statusBar.showAnimation);

    StatusBar.showHideTransition = animation;
    StatusBar.hidden = data.hidden;
  }
}

class NavigationBar extends Component {
  static Type = { 'Text' : 0, 'Image': 1 }
  
  componentDidMount() {
    customizeStatusBar(this.props.statusBar);
  }

  componentWillReceiveProps(props) {
    customizeStatusBar(this.props.statusBar);
  }

  getButtonElement(data = {}, style) {
    return (
      <View style={styles.navBarButtonContainer}>
        {(!!data.props) ? data : (
          <NavbarButton
            {...data}
            style={[data.style, style, ]}
          />
        )}
      </View>
    );
  }

  getTitleElement(data) {
    if (!!data.props) {
      return <View style={styles.customTitle}>{data}</View>;
    }
    if(data.type == NavigationBar.Type.Image){
      return (
        <View style={styles.navBarTitleContainer}>
          <Image
            style={data.style}
            resizeMode = {data.resizeMode}
            source={data.source} 
          />
        </View>
      )
    }
    else{
      const colorStyle = data.tintColor ? { color: data.tintColor, } : null;

      return (
        <View style={styles.navBarTitleContainer}>
          <Text
            style={[styles.navBarTitleText, colorStyle, ]}>
            {data.title}
          </Text>
        </View>
      );
    }
  }

  render() {
    const customTintColor = this.props.tintColor ?
      { backgroundColor: this.props.tintColor } : null;

    const customStatusBarTintColor = this.props.statusBar.tintColor ?
      { backgroundColor: this.props.statusBar.tintColor } : null;

    let statusBar = null;

    if (Platform.OS === 'ios') {
      statusBar = !this.props.statusBar.hidden ?
        <View style={[styles.statusBar, customStatusBarTintColor ]} /> : null;
    }

    return (
      <View style={[styles.navBarContainer, customTintColor, ]}>
        {statusBar}
        <View style={[styles.navBar, this.props.style, ]}>
          {this.getTitleElement(this.props.title)}
          {this.getButtonElement(this.props.leftButton, { marginLeft: 8, justifyContent: 'flex-start'})}
          {this.getButtonElement(this.props.rightButton, { marginRight: 8, justifyContent: 'flex-end' })}
        </View>
      </View>
    );
  }

  static propTypes = {
    tintColor: PropTypes.string,
    statusBar: PropTypes.shape(StatusBarShape),
    leftButton: PropTypes.oneOfType([
      PropTypes.shape(ButtonShape),
      PropTypes.element,
    ]),
    rightButton: PropTypes.oneOfType([
      PropTypes.shape(ButtonShape),
      PropTypes.element,
    ]),
    title: PropTypes.oneOfType([
      PropTypes.shape(TitleShape),
      PropTypes.element,
    ]),
  };

  static defaultProps = {
    statusBar: {
      style: 'default',
      hidden: false,
      hideAnimation: 'slide',
      showAnimation: 'slide',
    },
    title: {
      title: '',
    },
  };
}
module.exports = NavigationBar;