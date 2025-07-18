import React, { useState } from 'react';

const questionBank = [
  {
    id: 'q1',
    text: 'What is 2 + 2?',
    options: ['3', '4', '5'],
    correctAnswer: '4',
  },
  {
    id: 'q2',
    text: 'Which language runs in a web browser?',
    options: ['Java', 'C', 'JavaScript'],
    correctAnswer: 'JavaScript',
  },
  {
    id: 'q3',
    text: 'What does CSS stand for?',
    options: ['Cascading Style Sheets', 'Computer Style Sheet', 'Creative Style System'],
    correctAnswer: 'Cascading Style Sheets',
  },
  {
    id: 'q4',
    text: 'What is the capital of France?',
    options: ['Paris', 'London', 'Rome'],
    correctAnswer: 'Paris',
  },
  {
    id: 'q5',
    text: 'What does HTML stand for?',
    options: ['Hyper Trainer Marking Language', 'Hyper Text Markup Language', 'Hyperlinks and Text Markup Language'],
    correctAnswer: 'Hyper Text Markup Language',
  },
  {
    id: 'q6',
    text: 'Which company developed React?',
    options: ['Google', 'Facebook', 'Microsoft'],
    correctAnswer: 'Facebook',
  }
];

const getRandomQuestion = (prevId, usedIds) => {
  const available = questionBank.filter(q => q.id !== prevId && !usedIds.includes(q.id));
  return available.length > 0
    ? available[Math.floor(Math.random() * available.length)]
    : null;
};

export default function QuizApp() {
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [previousQuestionId, setPreviousQuestionId] = useState(null);
  const [usedQuestionIds, setUsedQuestionIds] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [score, setScore] = useState(0);
  const [questionCount, setQuestionCount] = useState(0);
  const [quizOver, setQuizOver] = useState(false);

  const startQuiz = () => {
    const firstQ = getRandomQuestion(null, []);
    setCurrentQuestion(firstQ);
    setPreviousQuestionId(firstQ.id);
    setUsedQuestionIds([firstQ.id]);
    setScore(0);
    setQuestionCount(1);
    setQuizOver(false);
    setFeedback('');
    setShowFeedback(false);
    setSelectedOption('');
  };

  const submitAnswer = () => {
    if (!selectedOption) return;
    const isCorrect = selectedOption === currentQuestion.correctAnswer;
    if (isCorrect) {
      setScore((prev) => prev + 1);
      setFeedback("Correct!");
    } else {
      setFeedback("Incorrect. The correct answer was: " + currentQuestion.correctAnswer);
    }
    setShowFeedback(true);
  };

  const nextQuestion = () => {
    if (questionCount >= 5) {
      setQuizOver(true);
      return;
    }

    const nextQ = getRandomQuestion(previousQuestionId, usedQuestionIds);
    if (!nextQ) {
      setQuizOver(true);
      return;
    }

    setCurrentQuestion(nextQ);
    setPreviousQuestionId(nextQ.id);
    setUsedQuestionIds([...usedQuestionIds, nextQ.id]);
    setSelectedOption('');
    setShowFeedback(false);
    setFeedback('');
    setQuestionCount((prev) => prev + 1);
  };

  const restartQuiz = () => {
    startQuiz();
  };

  return (
    <div style={{ fontFamily: 'Arial', padding: 20, maxWidth: 500, margin: 'auto' }}>
      <h2>Simple Quiz</h2>
      {!currentQuestion && !quizOver && (
        <button onClick={startQuiz}>Start Quiz</button>
      )}

      {quizOver && (
        <div>
          <h3>Quiz Completed</h3>
          <p>Your final score: {score} / 5</p>
          <button onClick={restartQuiz}>Restart Quiz</button>
        </div>
      )}

      {currentQuestion && !quizOver && (
        <div>
          <p><strong>Question {questionCount}:</strong> {currentQuestion.text}</p>
          <div>
            {currentQuestion.options.map((opt) => (
              <label key={opt} style={{ display: 'block', marginBottom: 8 }}>
                <input
                  type="radio"
                  name="option"
                  value={opt}
                  checked={selectedOption === opt}
                  onChange={() => setSelectedOption(opt)}
                  disabled={showFeedback}
                />
                {" "}{opt}
              </label>
            ))}
          </div>

          {!showFeedback ? (
            <button onClick={submitAnswer} disabled={!selectedOption}>
              Submit Answer
            </button>
          ) : (
            <>
              <p>{feedback}</p>
              <button onClick={nextQuestion}>Next Question</button>
            </>
          )}

          <p style={{ marginTop: 20 }}>Score: {score}</p>
        </div>
      )}
    </div>
  );
}