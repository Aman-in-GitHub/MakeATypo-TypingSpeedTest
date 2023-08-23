import React from 'react';

export default function Word(props) {
  if (props.correct === true) {
    return (
      <span className="correct text-emerald-500 font-semibold md:text-4xl text-xl ">
        {props.text}{' '}
      </span>
    );
  }

  if (props.correct === false) {
    return (
      <span className="incorrect text-[crimson] font-semibold md:text-4xl text-xl ">
        {props.text}{' '}
      </span>
    );
  }

  if (props.active) {
    return (
      <span className="active font-bold text-xl md:text-4xl">
        {props.text}{' '}
      </span>
    );
  }
  return <span className="text-xl md:text-4xl">{props.text} </span>;
}

Word = React.memo(Word);
