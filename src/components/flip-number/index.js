/* eslint-disable no-param-reassign, radix */
import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';

import NumberCard from './number-card';

import style from '../style';

function FlipNumber({
  number, unit, size, perspective, numberWrapperStyle, cardStyle, flipCardStyle, numberStyle, lastUnit, nextUnit, seconds,
}) {
  number = parseInt(number);
  let previousNumber = number - 1;

  if (unit === 'hours') {
    previousNumber = previousNumber === -1 ? 0 : previousNumber;
  } else if (unit === 'minutes') {
    previousNumber = previousNumber < 0 ? (parseInt(lastUnit) === 0 ? 0 : 59) : previousNumber;
  } else {
    previousNumber = previousNumber < 0 ? (parseInt(lastUnit) === 0 ? 0 : 59) : previousNumber;
  }
  number = number < 10 ? `0${number}` : number;
  previousNumber = previousNumber < 10 ? `0${previousNumber}` : previousNumber;

  const numberSplit = number.toString().split('');
  let previousNumberSplit = previousNumber.toString().split('');
  if (unit === 'minutes' && parseInt(nextUnit) !== 0) {
    previousNumberSplit = numberSplit;
  }
  if (unit === 'hours') {
    if (parseInt(nextUnit) !== 0 || seconds !== 0) {
      previousNumberSplit = numberSplit;
    }
  }

  return (
    <View style={style.wrapper}>
      <NumberCard
        number={numberSplit[0]}
        previousNumber={previousNumberSplit[0]}
        size={size}
        perspective={perspective}
        numberWrapperStyle={numberWrapperStyle}
        cardStyle={cardStyle}
        flipCardStyle={flipCardStyle}
        numberStyle={numberStyle}
      />
      <NumberCard
        number={numberSplit[1]}
        previousNumber={previousNumberSplit[1]}
        size={size}
        perspective={perspective}
        numberWrapperStyle={numberWrapperStyle}
        cardStyle={cardStyle}
        flipCardStyle={flipCardStyle}
        numberStyle={numberStyle}
      />
    </View>
  );
}

FlipNumber.defaultProps = {
  unit: 'seconds',
  lastUnit: 0,
  nextUnit: 0,
  seconds: 0,
};

FlipNumber.propTypes = {
  number: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  unit: PropTypes.oneOf(['hours', 'minutes', 'seconds']),
  lastUnit: PropTypes.any,
  nextUnit: PropTypes.any,
  seconds: PropTypes.any,
  size: PropTypes.number,
  perspective: PropTypes.number,
  numberWrapperStyle: PropTypes.object,
  cardStyle: PropTypes.object,
  flipCardStyle: PropTypes.object,
  numberStyle: PropTypes.object,
};

export default FlipNumber;
