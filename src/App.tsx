import GameBoard from './components/GameBoard';
import ScoreBoard from './components/ScoreBoard';
import GameModal from './components/GameModal';
import DifficultySelector from './components/DifficultySelector';
import useMemoryGame from './hooks/use-memory-game';
import { formatTime } from './lib/formatTime';
import { useState } from 'react';
import { Difficulty } from './types';

function App() {
  const [difficulty, setDifficulty] = useState<Difficulty | null>(null);
  const { cards, moves, gameCompleted, handleCardClick, resetGame, time } =
    useMemoryGame(difficulty || 'easy');
  const formattedTime = formatTime(time);

  function handleRestart() {
    setDifficulty(null);
    resetGame();
  }

  return difficulty ? (
    <div className='flex flex-col gap-4 justify-center items-center p-4 min-h-screen bg-blue-200'>
      <ScoreBoard
        moves={moves}
        time={formattedTime}
        onRestart={handleRestart}
      />
      <GameBoard
        cards={cards}
        difficulty={difficulty}
        onClickCard={handleCardClick}
      />
      {gameCompleted && (
        <GameModal
          moves={moves}
          time={formattedTime}
          onRestart={handleRestart}
        />
      )}
    </div>
  ) : (
    <DifficultySelector onSelect={setDifficulty} />
  );
}

export default App;
