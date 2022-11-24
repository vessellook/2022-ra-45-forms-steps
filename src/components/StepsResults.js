import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string.isRequired,
      distance: PropTypes.number.isRequired,
    })
  ).isRequired,
  onEdit: PropTypes.func,
  onRemove: PropTypes.func,
};

const StepsResults = ({ items, onEdit, onRemove }) => {
  if (items.length === 0) {
    return null;
  }
  return (
    <>
      <div className="titles">
        <div>Дата (ДД.ММ.ГГГГ)</div>
        <div>Пройдено км</div>
        <div>Действия</div>
      </div>
      <div className="results">
        {items.map(({ date, distance }) => (
          <div key={date} className="results__row">
            <div className="results__date">{date}</div>
            <div className="results__distance">{distance}</div>
            <div className="results__actions">
              {onEdit && (
                <button
                  className="results__action results__action_edit"
                  onClick={() => onEdit({ date, distance })}
                >
                  &#9998;
                </button>
              )}
              {onRemove && (
                <button
                  className="results__action results__action_remove"
                  onClick={() => onRemove({ date })}
                >
                  &#10008;
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

StepsResults.propTypes = propTypes;

export default StepsResults;
