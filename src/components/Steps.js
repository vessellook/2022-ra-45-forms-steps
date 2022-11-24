import React, { useReducer, useState } from 'react';
import { splitDate, dateCmp, removeAt, replaceAt, insertAt } from '../utils';
import StepsForm from './StepsForm';
import StepsResults from './StepsResults';

const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'remove': {
      const index = state.findIndex(({ date }) => payload.date === date);
      if (index === -1) {
        return state;
      }
      return removeAt(state, index);
    }
    case 'add': {
      const dateParts = splitDate(payload.date);
      if (dateParts == null) {
        console.warn('bad date format', action);
        return state;
      }
      let index = state.findIndex(
        ({ date }) => dateCmp(splitDate(date), dateParts) <= 0
      );
      if (index === -1) {
        index = state.length;
      }
      if (index < state.length && state[index].date === payload.date) {
        return replaceAt(state, index, {
          date: payload.date,
          distance: state[index].distance + payload.distance,
        });
      }
      return insertAt(state, index, {
        date: payload.date,
        distance: payload.distance,
      });
    }
    case 'edit': {
      const index = state.findIndex(({ date }) => payload.date === date);
      if (index === -1) {
        return state;
      }
      const item = {
        date: payload.date,
        distance: payload.distance,
      };
      return replaceAt(state, index, item);
    }
    default:
      console.warn('unknown action', { action });
      return state;
  }
};

const Steps = () => {
  const [items, dispatch] = useReducer(reducer, []);
  const [editedDate, setEditedDate] = useState(null);
  const [date, setDate] = useState('');
  const [distance, setDistance] = useState('');

  const handleSubmit = (payload) => {
    const { date } = payload;
    if (date === editedDate) {
      dispatch({ type: 'edit', payload });
      setEditedDate(null);
    } else {
      dispatch({ type: 'add', payload });
    }
    setDistance('');
    setDate('');
  };

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  const handleDistanceChange = (event) => {
    setDistance(event.target.value);
  };

  const handleEdit = ({ date, distance }) => {
    setDistance('' + distance);
    setDate(date);
    setEditedDate(date);
  };

  const handleRemove = ({ date }) => {
    dispatch({ type: 'remove', payload: { date } });
  };

  return (
    <div className="steps">
      <StepsForm
        onSubmit={handleSubmit}
        date={date}
        distance={distance}
        onDateChange={handleDateChange}
        onDistanceChange={handleDistanceChange}
      />
      <StepsResults items={items} onEdit={handleEdit} onRemove={handleRemove} />
    </div>
  );
};

export default Steps;
