import { useState, useEffect } from 'react';
import { createDeck } from '../utils/createDeck';
import type { Card } from '../types/Card';
import type { GridPosition, GameState, Difficulty } from '../types/GameTypes';
import { calculateRowTotal, calculateColumnTotal } from '../utils/calculations';

export function useGameLogic(initialDifficulty: Difficulty = 'medium') {
  const [gameState, setGameState] = useState<GameState>({
    deck: [],
    dealtCards: [],
    deckCycles: 0,
    isDealing: false,
    gridPositions: Array(36).fill(null),
    showSettings: false,
    score: 0,
    difficulty: initialDifficulty,
    showAnimation: false,
    animationType: '2-card'
  });

  const dropSound = new Audio('/audio/dropdown.mp4');
  const dealSound = new Audio('/audio/dealsound.mp4');
  dealSound.playbackRate = 0.9;

  const initializeBoard = (difficulty: Difficulty, deck: Card[]) => {
    const numInitialCards = difficulty === 'easy' ? 0 : difficulty === 'medium' ? 3 : 6;
    const gridPositions = Array(36).fill(null);
    const usedCards: Card[] = [];

    if (numInitialCards > 0) {
      const rowCounts = new Array(6).fill(0);
      const colCounts = new Array(6).fill(0);
      const allPositions = Array.from({ length: 25 }, (_, i) => i + 7)
        .filter(i => i % 6 !== 0);
      const shuffledPositions = [...allPositions].sort(() => Math.random() - 0.5);

      let cardsPlaced = 0;
      let positionIndex = 0;

      while (cardsPlaced < numInitialCards && positionIndex < shuffledPositions.length) {
        const position = shuffledPositions[positionIndex];
        const row = Math.floor(position / 6);
        const col = position % 6;

        if (rowCounts[row] < 2 && colCounts[col] < 2) {
          const card = deck[cardsPlaced];
          usedCards.push(card);
          
          gridPositions[position] = {
            cardId: `${card.suit}-${card.rank}`,
            card: { ...card, isDealt: true }
          };

          rowCounts[row]++;
          colCounts[col]++;
          cardsPlaced++;
        }

        positionIndex++;
      }
    }

    const updatedDeck = deck.map(card => ({
      ...card,
      isDealt: usedCards.some(usedCard => 
        usedCard.suit === card.suit && usedCard.rank === card.rank
      )
    }));

    return { gridPositions, updatedDeck };
  };

  useEffect(() => {
    const deck = createDeck();
    const { gridPositions, updatedDeck } = initializeBoard(initialDifficulty, deck);
    
    setGameState(prev => ({ 
      ...prev, 
      deck: updatedDeck,
      gridPositions,
      difficulty: initialDifficulty
    }));
  }, [initialDifficulty]);

  const calculateLineScore = (total: number, filledPositions: number): number => {
    if (total === 21) {
      const efficiency = {
        2: 100,
        3: 300,
        4: 600,
        5: 1000
      };
      return efficiency[filledPositions as keyof typeof efficiency] || 100;
    } else if (total > 21) {
      return -50;
    }
    return 0;
  };

  const check21Combination = (positions: (GridPosition | null)[], index: number): { is21: boolean, cardCount: number } | null => {
    const row = Math.floor(index / 6);
    const col = index % 6;

    // Check row
    if (row > 0) {
      const rowStart = row * 6 + 1;
      const rowEnd = rowStart + 5;
      const rowCards = positions.slice(rowStart, rowEnd).filter(pos => pos !== null);
      const rowTotal = calculateRowTotal(positions, row);
      if (rowTotal === 21 && (rowCards.length === 2 || rowCards.length === 3)) {
        return { is21: true, cardCount: rowCards.length };
      }
    }

    // Check column
    if (col > 0) {
      const colCards = Array.from({ length: 5 }, (_, i) => positions[((i + 1) * 6) + col]).filter(pos => pos !== null);
      const colTotal = calculateColumnTotal(positions, col);
      if (colTotal === 21 && (colCards.length === 2 || colCards.length === 3)) {
        return { is21: true, cardCount: colCards.length };
      }
    }

    return null;
  };

  const calculatePositionScore = (positions: (GridPosition | null)[], index: number): { score: number, combination: { is21: boolean, cardCount: number } | null } => {
    const row = Math.floor(index / 6);
    const col = index % 6;
    let scoreChange = 0;

    if (row > 0) {
      const rowStart = row * 6 + 1;
      const rowEnd = rowStart + 5;
      const filledPositions = positions.slice(rowStart, rowEnd).filter(pos => pos !== null).length;
      const rowTotal = calculateRowTotal(positions, row);
      scoreChange += calculateLineScore(rowTotal, filledPositions);
    }

    if (col > 0) {
      const filledPositions = Array.from({ length: 5 }, (_, i) => positions[((i + 1) * 6) + col]).filter(pos => pos !== null).length;
      const colTotal = calculateColumnTotal(positions, col);
      scoreChange += calculateLineScore(colTotal, filledPositions);
    }

    const combination = check21Combination(positions, index);

    return { score: scoreChange, combination };
  };

  const dealCards = () => {
    if (gameState.isDealing) return;

    const undealtCards = gameState.deck.filter(card => !card.isDealt);

    // Apply difficulty-based point deduction
    const pointDeduction = gameState.difficulty === 'easy' ? -3 :
                         gameState.difficulty === 'medium' ? -6 : -10;

    if (undealtCards.length < 3) {
      if (gameState.deckCycles >= 2) {
        return;
      }

      const placedCards = gameState.gridPositions
        .filter((pos): pos is GridPosition => pos !== null)
        .map(pos => pos.card);

      const newDeck = createDeck().filter(newCard => 
        !placedCards.some(placedCard => 
          placedCard.suit === newCard.suit && placedCard.rank === newCard.rank
        )
      );

      setGameState(prev => ({
        ...prev,
        deck: newDeck,
        dealtCards: [],
        deckCycles: prev.deckCycles + 1,
        isDealing: false,
        score: prev.score + pointDeduction
      }));

      return;
    }

    setGameState(prev => ({ ...prev, isDealing: true }));

    dealSound.currentTime = 0;
    dealSound.play().catch(error => console.log('Audio playback failed:', error));

    const newDealtCards = undealtCards.slice(0, 3);
    const updatedDeck = gameState.deck.map(card => {
      if (newDealtCards.includes(card)) {
        return { ...card, isDealt: true };
      }
      return card;
    });

    setGameState(prev => ({
      ...prev,
      deck: updatedDeck,
      dealtCards: newDealtCards,
      isDealing: false,
      score: prev.score + pointDeduction
    }));
  };

  const handleDragEnd = (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: { point: { x: number, y: number } },
    card: Card,
    index: number
  ) => {
    const gridSpaces = document.querySelectorAll('.grid-space');
    const cardElement = event.target as HTMLElement;
    const cardRect = cardElement.getBoundingClientRect();
    const cardCenter = {
      x: cardRect.left + cardRect.width / 2,
      y: cardRect.top + cardRect.height / 2
    };

    let closestSpace: { element: Element, distance: number, index: number } | null = null;

    gridSpaces.forEach((space, spaceIndex) => {
      const spaceRect = space.getBoundingClientRect();
      const spaceCenter = {
        x: spaceRect.left + spaceRect.width / 2,
        y: spaceRect.top + spaceRect.height / 2
      };

      const distance = Math.sqrt(
        Math.pow(cardCenter.x - spaceCenter.x, 2) + 
        Math.pow(cardCenter.y - spaceCenter.y, 2)
      );

      if (!closestSpace || distance < closestSpace.distance) {
        closestSpace = { element: space, distance, index: spaceIndex };
      }
    });

    if (closestSpace && closestSpace.distance < 50) {
      const newGridPositions = [...gameState.gridPositions];
      const cardId = `${card.suit}-${card.rank}`;

      if (!newGridPositions[closestSpace.index]) {
        dropSound.currentTime = 0;
        dropSound.play().catch(error => console.log('Audio playback failed:', error));

        // Vibrate on successful drop
        if (navigator.vibrate) {
          navigator.vibrate(100);
        }

        newGridPositions[closestSpace.index] = { cardId, card };
        const { score, combination } = calculatePositionScore(newGridPositions, closestSpace.index);
        
        // Vibrate longer for 21
        if (combination?.is21 && navigator.vibrate) {
          navigator.vibrate([100, 50, 200]);
        }

        setGameState(prev => ({
          ...prev,
          gridPositions: newGridPositions,
          dealtCards: prev.dealtCards.filter((_, i) => i !== index),
          score: prev.score + score,
          showAnimation: combination !== null,
          animationType: combination?.cardCount === 2 ? '2-card' : '3-card'
        }));
      }
    }
  };

  return {
    gameState,
    setGameState,
    dealCards,
    handleDragEnd,
    initializeBoard
  };
}