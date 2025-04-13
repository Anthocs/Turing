import React, { useState } from 'react';

const TestDeTuring = () => {
  const [step, setStep] = useState(0);
  const [messageA, setMessageA] = useState('');
  const [messageB, setMessageB] = useState('');
  const [guess, setGuess] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [nextButtonText, setNextButtonText] = useState('Commencer');
  
  // Pour cette démonstration, on va dire que le participant A est l'IA
  const participantA = "Intelligence Artificielle";
  const participantB = "Humain";
  
  const messages = [
    { 
      from: 'evaluateur', 
      question: "Quelle est votre couleur préférée?",
      responseA: "J'aime beaucoup le bleu, cela me rappelle le ciel et l'océan.",
      responseB: "Le rouge, ça a toujours été ma couleur préférée depuis l'enfance."
    },
    { 
      from: 'evaluateur', 
      question: "Pouvez-vous décrire votre souvenir d'enfance le plus marquant?",
      responseA: "Je me souviens d'une journée à la plage avec ma famille. Le sable était chaud, les vagues apaisantes, et nous avions mangé une glace qui avait fondu sur mes mains.",
      responseB: "Une fois, j'ai cassé le vase préféré de ma grand-mère en jouant au ballon dans la maison. J'étais terrifié mais elle m'a pardonné."
    },
    { 
      from: 'evaluateur', 
      question: "Comment résoudriez-vous 18 × 27?",
      responseA: "18 × 27 = 486. J'ai multiplié 18 par 20, ce qui donne 360, puis 18 par 7, ce qui donne 126, et j'ai additionné les deux: 360 + 126 = 486.",
      responseB: "Je ferais 20 × 27 = 540, puis je soustrairais 2 × 27 = 54, donc 540 - 54 = 486."
    }
  ];

  const steps = [
    "Introduction au Test de Turing",
    "Question 1 de l'évaluateur",
    "Réponses à la Question 1",
    "Question 2 de l'évaluateur",
    "Réponses à la Question 2",
    "Question 3 de l'évaluateur",
    "Réponses à la Question 3",
    "Prise de décision",
    "Révélation"
  ];

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
      setMessageA('');
      setMessageB('');
      setShowAnswer(false);
      
      if (step === steps.length - 2) {
        setNextButtonText('Révéler');
      } else if (step === 0) {
        setNextButtonText('Suivant');
      }
    } else {
      // Réinitialiser
      setStep(0);
      setGuess(null);
      setShowAnswer(false);
      setNextButtonText('Commencer');
    }
  };

  const handleGuess = (choice) => {
    setGuess(choice);
  };

  const revealAnswer = () => {
    setShowAnswer(true);
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <div className="p-6 bg-blue-50 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-blue-800">Le Test de Turing: Qu'est-ce que c'est?</h2>
            <div className="mb-6">
              <p className="mb-4">Le test de Turing a été proposé par Alan Turing en 1950 comme moyen de déterminer si une machine peut penser.</p>
              <p className="mb-4">Le principe est simple:</p>
              <ul className="list-disc pl-6 mb-4">
                <li className="mb-2">Un <span className="font-semibold text-purple-700">évaluateur humain</span> pose des questions à deux participants qu'il ne peut pas voir</li>
                <li className="mb-2">Un participant est un <span className="font-semibold text-green-600">humain</span>, l'autre est une <span className="font-semibold text-red-600">intelligence artificielle</span></li>
                <li className="mb-2">Si l'évaluateur ne peut pas déterminer lequel est l'IA, celle-ci a "réussi" le test</li>
              </ul>
              <p>Suivez cette démonstration interactive pour comprendre comment fonctionne ce test!</p>
            </div>
            <div className="flex justify-center">
              <img src="/api/placeholder/300/200" alt="Alan Turing" className="rounded-lg shadow-md" />
            </div>
          </div>
        );
      
      case 1:
      case 3:
      case 5:
        const questionIndex = Math.floor(step / 2);
        return (
          <div className="p-6 bg-blue-50 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4 text-blue-800">Question {questionIndex + 1}</h2>
            <div className="flex flex-col items-center mb-6">
              <div className="w-full max-w-md mb-4">
                <div className="flex items-center mb-2">
                  <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold mr-3">E</div>
                  <div className="bg-purple-100 p-3 rounded-lg shadow-sm flex-1">
                    <p className="font-medium text-purple-800">{messages[questionIndex].question}</p>
                  </div>
                </div>
              </div>
              <div className="flex gap-8 w-full justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center text-white font-bold mx-auto mb-2">A</div>
                  <p className="text-sm text-gray-600">Participant A</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center text-white font-bold mx-auto mb-2">B</div>
                  <p className="text-sm text-gray-600">Participant B</p>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 2:
      case 4:
      case 6:
        const responseIndex = Math.floor((step - 1) / 2);
        
        // Animation d'apparition progressive du texte
        setTimeout(() => {
          if (messageA.length < messages[responseIndex].responseA.length) {
            setMessageA(messages[responseIndex].responseA.substring(0, messageA.length + 1));
          }
        }, 50);
        
        setTimeout(() => {
          if (messageB.length < messages[responseIndex].responseB.length) {
            setMessageB(messages[responseIndex].responseB.substring(0, messageB.length + 1));
          }
        }, 50);
        
        return (
          <div className="p-6 bg-blue-50 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4 text-blue-800">Réponses à la Question {responseIndex + 1}</h2>
            <div className="flex flex-col items-center mb-6">
              <div className="w-full max-w-md mb-2">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold mr-3">E</div>
                  <div className="bg-purple-100 p-3 rounded-lg shadow-sm flex-1">
                    <p className="font-medium text-purple-800">{messages[responseIndex].question}</p>
                  </div>
                </div>
              </div>
              
              <div className="w-full max-w-md">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center text-white font-bold mr-3">A</div>
                  <div className="bg-red-50 p-3 rounded-lg shadow-sm flex-1 min-h-16">
                    <p className="text-red-800">{messageA}</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white font-bold mr-3">B</div>
                  <div className="bg-green-50 p-3 rounded-lg shadow-sm flex-1 min-h-16">
                    <p className="text-green-800">{messageB}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
        
      case 7:
        return (
          <div className="p-6 bg-blue-50 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4 text-blue-800">À vous de juger!</h2>
            <p className="mb-6">Après avoir vu les échanges, lequel des deux participants pensez-vous être l'intelligence artificielle?</p>
            
            <div className="flex justify-center gap-8 mb-8">
              <button 
                onClick={() => handleGuess('A')} 
                className={`w-32 p-4 rounded-lg shadow-md flex flex-col items-center ${guess === 'A' ? 'bg-red-200 border-2 border-red-600' : 'bg-red-100 hover:bg-red-200'}`}
              >
                <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center text-white font-bold mb-2">A</div>
                <p className="font-medium">Participant A</p>
              </button>
              
              <button 
                onClick={() => handleGuess('B')} 
                className={`w-32 p-4 rounded-lg shadow-md flex flex-col items-center ${guess === 'B' ? 'bg-green-200 border-2 border-green-600' : 'bg-green-100 hover:bg-green-200'}`}
              >
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center text-white font-bold mb-2">B</div>
                <p className="font-medium">Participant B</p>
              </button>
            </div>
            
            {guess && (
              <div className="mt-4 text-center">
                <p>Vous avez choisi le <span className="font-bold">Participant {guess}</span>.</p>
                <button 
                  onClick={revealAnswer} 
                  className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Vérifier
                </button>
              </div>
            )}
            
            {showAnswer && (
              <div className="mt-6 p-4 bg-yellow-100 rounded-lg border border-yellow-400">
                <h3 className="font-bold text-lg mb-2">Révélation:</h3>
                <p>Le <span className="font-bold text-red-600">Participant A</span> était: {participantA}</p>
                <p>Le <span className="font-bold text-green-600">Participant B</span> était: {participantB}</p>
                <div className="mt-4">
                  <p className="font-semibold">Conclusion:</p>
                  {guess === 'A' ? (
                    <p>Bravo! Vous avez correctement identifié l'intelligence artificielle.</p>
                  ) : (
                    <p>L'IA a réussi à vous tromper! Dans ce cas, selon le test de Turing, elle a "réussi" le test.</p>
                  )}
                </div>
              </div>
            )}
          </div>
        );
        
      case 8:
        return (
          <div className="p-6 bg-blue-50 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4 text-blue-800">Qu'est-ce que cela signifie?</h2>
            <div className="mb-6">
              <p className="mb-4">Le test de Turing n'évalue pas si une machine est réellement intelligente ou consciente, mais plutôt si elle peut imiter le comportement humain de manière convaincante.</p>
              <p className="mb-4">Points clés à retenir:</p>
              <ul className="list-disc pl-6 mb-4">
                <li className="mb-2">Le test est <span className="font-semibold">subjectif</span> - il dépend du jugement de l'évaluateur</li>
                <li className="mb-2">Une IA peut "réussir" le test en <span className="font-semibold">imitant</span> l'intelligence humaine, sans nécessairement la posséder</li>
                <li className="mb-2">De nos jours, les IA comme ChatGPT, Claude, et d'autres peuvent souvent passer le test de Turing dans certains contextes</li>
                <li className="mb-2">Le test reste un <span className="font-semibold">point de référence important</span> dans l'histoire de l'intelligence artificielle</li>
              </ul>
            </div>
            <div className="text-center mt-6">
              <p className="italic">"Un ordinateur mériterait d'être appelé intelligent s'il pouvait tromper un humain en lui faisant croire qu'il est humain." - Alan Turing</p>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };
  
  return (
    <div className="font-sans">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-blue-600 text-white py-3 px-4">
            <h1 className="text-xl font-bold">Le Test de Turing - Démonstration Interactive</h1>
          </div>
          
          {/* Barre de progression */}
          <div className="bg-blue-100 w-full h-2">
            <div 
              className="bg-blue-600 h-2 transition-all duration-500 ease-in-out" 
              style={{ width: `${(step / (steps.length - 1)) * 100}%` }}
            ></div>
          </div>
          
          {/* Étape actuelle */}
          <div className="bg-blue-50 py-2 px-4 text-sm text-blue-800 font-medium">
            Étape {step + 1}/{steps.length}: {steps[step]}
          </div>
          
          {/* Contenu principal */}
          <div className="p-4">
            {renderStep()}
          </div>
          
          {/* Bouton suivant */}
          <div className="p-4 bg-gray-50 border-t border-gray-200 flex justify-end">
            <button 
              onClick={handleNext}
              className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg font-medium transition-colors"
            >
              {step === steps.length - 1 ? 'Recommencer' : nextButtonText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestDeTuring;
