import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';

import FlipNumber from './flip-number';
import Separator from './flip-number/separator';
import TransformUtils from '../utils';
import style from './style';

class CountdownTimer extends React.Component {
  state = {
    hours: 0,
    minutes: 0,
    seconds: 0,
  };

  componentDidMount() {
    const { time } = this.props;
    const { hours, minutes, seconds } = TransformUtils.formatNumberToTime(time);
    this.setState({
      hours,
      minutes,
      seconds,
    });
    this.timer = setInterval(
      () => this.updateTime(),
      1000,
    );
  }

  shouldComponentUpdate(nextProps) {
    const { play } = this.props;
    if (nextProps.play !== play) {
      if (nextProps.play) {
        this.timer = setInterval(
          () => this.updateTime(),
          1000,
        );
      } else {
        clearInterval(this.timer);
      }
    }
    return true;
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  updateTime = () => {
    const { hours, minutes, seconds } = this.state;
    const newState = TransformUtils.subtractTime(hours, minutes, seconds);
    this.setState(prevState => ({ ...prevState, ...newState }));
  };

  render() {
    const { wrapperStyle, flipNumberProps } = this.props;
    const { hours, minutes, seconds } = this.state;
    return (
      <View style={[style.wrapper, wrapperStyle]}>
        {!!hours && <FlipNumber number={hours} unit="hours" nextUnit={minutes} seconds={seconds} {...flipNumberProps} />}
        <Separator />
        {!!minutes && <FlipNumber number={minutes} lastUnit={hours} nextUnit={seconds} unit="minutes" {...flipNumberProps} />}
        <Separator />
        {!!seconds && <FlipNumber number={seconds} lastUnit={minutes} unit="seconds" {...flipNumberProps} />}
      </View>
    );
  }
}

CountdownTimer.defaultProps = {
  play: true,
  wrapperStyle: {},
};

CountdownTimer.propTypes = {
  time: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  play: PropTypes.bool,
  wrapperStyle: PropTypes.object,
  flipNumberProps: PropTypes.shape({
    size: PropTypes.number,
    perspective: PropTypes.number,
    numberWrapperStyle: PropTypes.object,
    cardStyle: PropTypes.object,
    flipCardStyle: PropTypes.object,
    numberStyle: PropTypes.object,
  }),
};

export default CountdownTimer;
