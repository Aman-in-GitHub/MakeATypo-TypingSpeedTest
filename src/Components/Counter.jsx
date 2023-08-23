export default function Counter(props) {
  return (
    <>
      <div className="flex flex-col text-2xl md:text-4xl font-semibold gap-3 my-5 md:my-10">
        <span>
          Time: <span className="text-3xl md:text-5xl">{props.time}</span>s
        </span>
        <span>
          Speed: <span className="text-3xl md:text-5xl">{props.speed}</span>wpm
        </span>
        <span>
          High Score:{' '}
          <span className="text-3xl md:text-5xl">{props.highScore}</span>
          wpm
        </span>
      </div>
    </>
  );
}
