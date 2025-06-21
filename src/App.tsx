import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useGameLogic } from './hooks/useGameLogic';
import { GameBoard } from './components/GameBoard';
import { DeckArea } from './components/DeckArea';
import { GameControls } from './components/GameControls';
import { ScoreDisplay } from './components/ScoreDisplay';
import { GameOverModal } from './components/GameOverModal';
import { ScoreAnimation } from './components/ScoreAnimation';
import { BottomMenu } from './components/BottomMenu';
import { calculateRowTotal, calculateColumnTotal, getTotalSpaceImage } from './utils/calculations';
import { submitScore } from './utils/supabase';
import type { Difficulty } from './types/GameTypes';
import { Bubbles } from './components/Bubbles';
import { LogoSplash } from './components/LogoSplash';
import { TextConversationScreen } from './components/TextConversationScreen';
import { InformationPage } from './components/InformationPage';
import { SettingsPage } from './components/SettingsPage';
import { LeaderboardPage } from './components/LeaderboardPage';
import { PremiumPage } from './components/PremiumPage';
import { Rain } from './components/Rain';

function App() {
  const [difficulty, setDifficulty] = useState<Difficulty>('medium');
  const { gameState, setGameState, dealCards, handleDragEnd, initializeBoard } = useGameLogic(difficulty);
  const remainingCards = gameState.deck.filter(card => !card.isDealt).length;
  
  const [showLogoSplash, setShowLogoSplash] = useState(true);
  const [showTextConversation, setShowTextConversation] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showInformation, setShowInformation] = useState(false);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [showPremium, setShowPremium] = useState(false);
  const [playerName, setPlayerName] = useState<string>('');
  const [showGameOver, setShowGameOver] = useState(false);
  const [musicEnabled, setMusicEnabled] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [bgMusic] = useState(new Audio('/audio/21stackembackground.mp4'));
  const [backgroundColor, setBackgroundColor] = useState('hsl(210, 70%, 60%)');
  const [animatedBackgrounds, setAnimatedBackgrounds] = useState(true);
  const [currentBackground, setCurrentBackground] = useState<'bubbles' | 'rain'>('bubbles');

  useEffect(() => {
    const logoTimer = setTimeout(() => {
      setShowLogoSplash(false);
      setShowTextConversation(true);
    }, 3000);

    return () => clearTimeout(logoTimer);
  }, []);

  const handleDifficultyChange = (newDifficulty: Difficulty) => {
    setDifficulty(newDifficulty);
    const { gridPositions, updatedDeck } = initializeBoard(newDifficulty, gameState.deck);
    setGameState(prev => ({
      ...prev,
      deck: updatedDeck,
      gridPositions,
      score: 0,
      difficulty: newDifficulty,
      deckCycles: 0,
      dealtCards: [],
      showGameOver: false
    }));
    setShowGameOver(false);
  };

  useEffect(() => {
    bgMusic.loop = true;
    if (musicEnabled) {
      bgMusic.play().catch(error => console.log('Audio playback failed:', error));
    }

    return () => {
      bgMusic.pause();
      bgMusic.currentTime = 0;
    };
  }, [musicEnabled]);

  const handleTextConversationComplete = (name: string, selectedDifficulty: Difficulty) => {
    setPlayerName(name);
    setDifficulty(selectedDifficulty);
    setShowTextConversation(false);
  };

  const handleSubmitScore = async () => {
    if (playerName) {
      try {
        await submitScore(playerName, gameState.score, difficulty);
        setShowGameOver(true);
      } catch (error) {
        console.error('Error submitting score:', error);
      }
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-gray-900 flex items-center justify-center"
      role="application"
      aria-label="21 Stackem Game"
    >
      <div 
        className="relative bg-black overflow-hidden"
        style={{ 
          width: '390px',
          height: '844px',
          maxHeight: '100vh',
          margin: '0 auto',
          aspectRatio: '390/844'
        }}
      >
        <AnimatePresence>
          {showLogoSplash ? (
            <LogoSplash />
          ) : showTextConversation ? (
            <TextConversationScreen onComplete={handleTextConversationComplete} />
          ) : showSettings ? (
            <SettingsPage 
              onClose={() => setShowSettings(false)}
              musicEnabled={musicEnabled}
              soundEnabled={soundEnabled}
              difficulty={difficulty}
              onMusicToggle={setMusicEnabled}
              onSoundToggle={setSoundEnabled}
              onDifficultyChange={handleDifficultyChange}
              onBackgroundChange={setBackgroundColor}
              currentBackground={backgroundColor}
              animatedBackgrounds={animatedBackgrounds}
              onAnimatedBackgroundsToggle={setAnimatedBackgrounds}
            />
          ) : showInformation ? (
            <InformationPage 
              onClose={() => setShowInformation(false)}
              onShowLeaderboard={() => {
                setShowInformation(false);
                setShowLeaderboard(true);
              }}
              onShowPremium={() => {
                setShowInformation(false);
                setShowPremium(true);
              }}
              backgroundColor={backgroundColor}
            />
          ) : showLeaderboard ? (
            <LeaderboardPage 
              onClose={() => setShowLeaderboard(false)}
              playerScore={gameState.score}
              backgroundColor={backgroundColor}
            />
          ) : showPremium ? (
            <PremiumPage 
              onClose={() => setShowPremium(false)}
              onBack={() => {
                setShowPremium(false);
                setShowInformation(true);
              }}
            />
          ) : (
            <div className="w-full h-full">
              <div className="absolute inset-0">
                <motion.div className="absolute inset-0">
                  <motion.img 
                    src="/images/BlueSplashBlankBackground.png"
                    alt=""
                    className="w-full h-full object-cover"
                    style={{ 
                      filter: `hue-rotate(${parseInt(backgroundColor.split(',')[0].split('(')[1]) - 210}deg)`
                    }}
                  />
                  {animatedBackgrounds && currentBackground === 'bubbles' && <Bubbles />}
                  {animatedBackgrounds && currentBackground === 'rain' && <Rain />}
                </motion.div>
              </div>

              <div className="relative h-full flex flex-col">
                <div className="absolute top-0 left-0 right-0 flex justify-center">
                  <img 
                    src="/images/21 bannerNoBG.png"
                    alt="21 Stackem"
                    className="w-[300px] h-[120px] object-contain"
                  />
                </div>

                <ScoreDisplay score={gameState.score} />

                <div className="flex-1 relative flex items-center justify-center">
                  <GameBoard 
                    gridPositions={gameState.gridPositions}
                    calculateRowTotal={(rowIndex) => calculateRowTotal(gameState.gridPositions, rowIndex)}
                    calculateColumnTotal={(colIndex) => calculateColumnTotal(gameState.gridPositions, colIndex)}
                    getTotalSpaceImage={getTotalSpaceImage}
                  />
                </div>

                <div className="flex-none pb-4">
                  <DeckArea 
                    remainingCards={remainingCards}
                    deckCycles={gameState.deckCycles}
                    dealtCards={gameState.dealtCards}
                    handleDragEnd={handleDragEnd}
                    soundEnabled={soundEnabled}
                  />

                  <GameControls 
                    onDeal={dealCards}
                    isDealing={gameState.isDealing}
                    soundEnabled={soundEnabled}
                  />

                  <BottomMenu 
                    onSettings={() => setShowSettings(true)}
                    onInformation={() => setShowInformation(true)}
                    onLeaderboard={() => setShowLeaderboard(true)}
                    onSubmitScore={handleSubmitScore}
                  />
                </div>
              </div>

              <AnimatePresence>
                {gameState.showAnimation && (
                  <ScoreAnimation
                    show={gameState.showAnimation}
                    message={gameState.animationType === '2-card' ? 'Nice!' : 'Sweet!'}
                    type={gameState.animationType}
                    onComplete={() => setGameState(prev => ({ ...prev, showAnimation: false }))}
                  />
                )}

                {showGameOver && (
                  <GameOverModal 
                    score={gameState.score}
                    difficulty={difficulty}
                    onPlayAgain={handleDifficultyChange}
                    reason="score-submitted"
                  />
                )}
              </AnimatePresence>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default App;