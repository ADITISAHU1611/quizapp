document.addEventListener('DOMContentLoaded', () => {
    const startQuizButton = document.getElementById('start-quiz');
    const quizContainer = document.getElementById('quiz');
    const questionContainer = document.getElementById('question-container');
    const optionsContainer = document.getElementById('options-container');
    const nextButton = document.getElementById('next-button');
  
    let currentQuestionIndex = 0;
    let questions = [];
  
    startQuizButton.addEventListener('click', startQuiz);
  
    async function startQuiz() {
      startQuizButton.style.display = 'none';
      quizContainer.style.display = 'block';
      await fetchQuestions();
      showQuestion();
    }
  
    async function fetchQuestions() {
      try {
        const response = await fetch('https://opentdb.com/api.php?amount=10&type=multiple');
        const data = await response.json();
        questions = data.results;
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    }
  
    function showQuestion() {
      if (currentQuestionIndex < questions.length) {
        const question = questions[currentQuestionIndex];
        questionContainer.innerHTML = `<h2>${decodeHTML(question.question)}</h2>`;
        optionsContainer.innerHTML = '';
  
        const options = [...question.incorrect_answers];
        const correctAnswerIndex = Math.floor(Math.random() * (options.length + 1));
        options.splice(correctAnswerIndex, 0, question.correct_answer);
  
        options.forEach((option, index) => {
          const optionElement = document.createElement('button');
          optionElement.className = 'option';
          optionElement.innerText = decodeHTML(option);
          optionElement.addEventListener('click', () => selectOption(option, question.correct_answer));
          optionsContainer.appendChild(optionElement);
        });
      } else {
        endQuiz();
      }
    }
  
    function selectOption(selectedOption, correctAnswer) {
      if (selectedOption === correctAnswer) {
        alert('Correct!');
      } else {
        alert(`Wrong! Correct answer is: ${correctAnswer}`);
      }
      currentQuestionIndex++;
      showQuestion();
    }
  
    function endQuiz() {
      questionContainer.innerHTML = '<h2>Quiz Completed!</h2>';
      optionsContainer.innerHTML = '';
      nextButton.style.display = 'none';
    }
  
    function decodeHTML(html) {
      const txt = document.createElement("textarea");
      txt.innerHTML = html;
      return txt.value;
    }
  });
  