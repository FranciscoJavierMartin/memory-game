import { EMOJIS, PAIR_COUNTS } from '@/constants';
import { Card, Difficulty } from '@/types';
import { useEffect, useState } from 'react';
import useTimer from './use-timer';

export function createShuffledCards(difficulty: Difficulty): Card[] {
  const pairs = PAIR_COUNTS[difficulty];
  const gameEmojis = EMOJIS.slice(0, pairs);

  return [...gameEmojis, ...gameEmojis]
    .sort(() => Math.random() - 0.5)
    .map((emoji, index) => ({
      id: index,
      emoji,
      isFlipped: false,
      isMatched: false,
    }));
}

function checkGameCompletion(cards: Card[]): boolean {
  return cards.every((card) => card.isMatched);
}

export default function useMemoryGame(difficulty: Difficulty) {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<Card[]>([]);
  const [moves, setMoves] = useState<number>(0);
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [gameCompleted, setGameCompleted] = useState<boolean>(false);
  const { time, resetTime } = useTimer(gameStarted && !gameCompleted);

  function initializeGame() {
    setCards(createShuffledCards(difficulty));
    setMoves(0);
    resetTime();
    setGameStarted(false);
    setGameCompleted(false);
    setFlippedCards([]);
  }

  function handleCardClick(id: number) {
    const clickedCard = cards.find((card) => card.id === id)!;

    if (
      flippedCards.length !== 2 &&
      !clickedCard.isFlipped &&
      !clickedCard.isMatched
    ) {
      if (!gameStarted) {
        setGameStarted(true);
      }

      setCards((prev) =>
        prev.map((card) =>
          card.id === id ? { ...card, isFlipped: true } : card,
        ),
      );

      const newFlippedCards = [...flippedCards, clickedCard];
      setFlippedCards(newFlippedCards);

      if (newFlippedCards.length === 2) {
        setMoves((prev) => prev + 1);
        const [firstCard, secondCard] = newFlippedCards;
        const isMatched = firstCard.emoji === secondCard.emoji;

        setTimeout(() => {
          const updatedCards = cards.map((card) =>
            card.id === firstCard.id || card.id === secondCard.id
              ? { ...card, isMatched, isFlipped: isMatched }
              : card,
          );
          setCards(updatedCards);
          setFlippedCards([]);

          if (isMatched && checkGameCompletion(updatedCards)) {
            setGameCompleted(true);
          }
        }, 500);
      }
    }
  }

  useEffect(initializeGame, [difficulty, resetTime]);

  return {
    cards,
    moves,
    handleCardClick,
    resetGame: initializeGame,
    time,
    gameCompleted,
  };
}
