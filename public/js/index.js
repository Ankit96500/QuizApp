

let currentQuestion = 0;
let score = 0;
let questions = [];

let userScored = document.getElementById("score");
let userDisplayQuestions = document.getElementById("question");
let quizzDiv = document.getElementById("quizz")


userScored.innerHTML = `Score: ${score}`
userDisplayQuestions.innerHTML = `Total Questions: ${currentQuestion + 1}/10`

async function loadQuiz() {

    // check the quizz question in local storage:
    const storedQuestions = localStorage.getItem("quizzQuestions");

    if (storedQuestions) {
        questions = JSON.parse(storedQuestions);
        console.log("questions if  block:", questions);

    } else {
        const res = await fetch('https://opentdb.com/api.php?amount=10',{method:"GET"});
        const data = await res.json();
        questions = data.results;
        console.log("questions else block:", questions);

        // stor questions in local storage:
        localStorage.setItem("quizzQuestions",JSON.stringify(questions));
    }
    
    showQuestion();
}

function showQuestion() {
  if(!Array.isArray(questions)||questions.length === 0){
        quizDiv.innerHTML = "No quiz data available.";
      console.log('no question avalibale',questions);
      return;
    } 
      const q = questions[currentQuestion];
      const quizDiv = document.getElementById('quiz');
      const allAnswers = [...q.incorrect_answers, q.correct_answer].sort(() => Math.random() - 0.5);
      
      quizDiv.innerHTML = `
      <div class="question"><strong>Q${currentQuestion + 1}:</strong> ${q.question}</div>
      <div class="options">
      ${allAnswers.map(answer => `<button onclick="submitAnswer('${answer}')">${answer}</button>`).join('')}
      </div>
      `;
      
}

function submitAnswer(answer) {

  if (answer === questions[currentQuestion].correct_answer){
      score++;
      currentQuestion++;
      userScored.innerHTML = `Score: ${score}`
      userDisplayQuestions.innerHTML = `Total Questions: ${currentQuestion + 1}/10`
  }; 
  if (currentQuestion < questions.length) {  
    console.log('question length', currentQuestion);
    showQuestion();
  } else {
    quizzDiv = `<h2>You scored ${score} out of ${questions.length}!</h2>`;
    localStorage.removeItem("quizzQuestions")
  }
}


loadQuiz();
