interface GameModalProps {
  moves: number;
  time: string;
  onRestart: () => void;
}

export default function GameModal({ moves, time, onRestart }: GameModalProps) {
  return (
    <div className='flex fixed inset-0 justify-center items-center p-4 backdrop-blur-sm bg-black/50'>
      <div className='p-6 max-w-sm text-center bg-white rounded-xl'>
        <h2 className=',b4 text-2xl font-bold sm:text-3xl'>
          🎉 Congratulations! 🎉
        </h2>
        <p className='mb-6 text-lg'>
          You completed the game in <br />
          <b>{moves}</b> and <b>{time}</b>
        </p>
        <button
          className='px-6 py-3 font-medium text-white rounded-lg transition-opacity bg-pink hover:opacity-90'
          onClick={onRestart}
        >
          Play again
        </button>
      </div>
    </div>
  );
}
