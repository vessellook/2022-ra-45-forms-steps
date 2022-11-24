import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { splitDate } from '../utils';

const propTypes = {
  date: PropTypes.string.isRequired,
  distance: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onDateChange: PropTypes.func.isRequired,
  onDistanceChange: PropTypes.func.isRequired,
};

const validateDate = (date) => (splitDate(date) == null ? null : date);

const validateDistance = (distance) => {
  const result = parseInt(distance);
  if (Number.isFinite(result)) {
    return result;
  }
  return null;
};

const StepsForm = ({
  date,
  distance,
  onDateChange,
  onDistanceChange,
  onSubmit,
}) => {
  const [isDateInvalid, setIsDateInvalid] = useState(false);
  const [isDistanceInvalid, setIsDistanceInvalid] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const resultDate = validateDate(date);
    const resultDistance = validateDistance(distance);
    if (resultDate == null || resultDistance == null) {
      if (resultDate == null) {
        setIsDateInvalid(true);
      }
      if (resultDistance == null) {
        setIsDistanceInvalid(true);
      }
      return;
    }
    onSubmit({ date: resultDate, distance: resultDistance });
  };

  const handleDateChange = (event) => {
    setIsDateInvalid(false);
    onDateChange(event);
  };

  const handleDistanceChange = (event) => {
    setIsDistanceInvalid(false);
    onDistanceChange(event);
  };

  const dateClassName = classNames('steps-form__input', {
    'steps-form__input_error': isDateInvalid,
  });

  const distanceClassName = classNames('steps-form__input', {
    'steps-form__input_error': isDistanceInvalid,
  });

  return (
    <form className="steps-form" onSubmit={handleSubmit}>
      <label className="steps-form__label">
        <span className="steps-form__title">Дата (ДД.ММ.ГГГГ)</span>
        <input
          className={dateClassName}
          value={date}
          onChange={handleDateChange}
        />
      </label>
      <label className="steps-form__label">
        <span className="steps-form__title">Пройдено км</span>
        <input
          type="number"
          min="0"
          className={distanceClassName}
          value={distance}
          onChange={handleDistanceChange}
        />
      </label>
      <button className="steps-form__submit" type="submit">
        OK
      </button>
    </form>
  );
};

StepsForm.propTypes = propTypes;

export default StepsForm;
