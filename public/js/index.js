

let currentQuestion = 0;
let score = 0;
let questions = [];

let userScored = document.getElementById("score");
let userDisplayQuestions = document.getElementById("question");
let quizzDiv = document.getElementById("quizz")
let attemptDisplay = document.getElementById("attempts")
let userName = document.getElementById("username")
let finalScore = document.getElementById("finalScore");


userScored.innerHTML = `Score: ${score}`
userDisplayQuestions.innerHTML = `Total Questions: ${currentQuestion + 1}/10`

async function loadQuiz() {

    // check the quizz question in local storage:
    const storedQuestions = localStorage.getItem("quizzQuestions");

    if (storedQuestions) {
        questions = JSON.parse(storedQuestions);
        // console.log("questions if  block:", questions);

    } else {
      try {
  
        const response = await fetch("http://localhost:3000/app/fetch-quizz-questions",{
          method:"GET",
          headers:{'Authorization':localStorage.getItem("token")}
        });

        const data = await response.json();

        // show the user final score and attempts: and redirect to the account page:
        if(data.status === false){
             // User already attempted the quiz
            quizzDiv.innerHTML = `<h2>${data.message}</h2>`;
            finalScore.innerHTML = `Final Score: ${data.finalScore}`


            // clear local storage:
            localStorage.clear();

            // redirect to account page in 5 seconds:
            setTimeout(() => {
              window.location.href = "../account/userLogin.html";
            }, 5000);
            return;

        }

        // Quiz  questions
        questions = data.quizzQuestions.results
        console.log("questions else block:", questions);
        
          // Store data
        localStorage.setItem("quizzQuestions", JSON.stringify(questions));
        localStorage.setItem("userAttempt", JSON.stringify(data.attempt));
        localStorage.setItem("userName", data.username);
        
        
      } catch (error) {
        console.error("Error loading quiz:", error);
        quizzDiv.innerHTML = `<h2>Unable to load quiz. Try again later.</h2>`;
        return;
      }
          
    }
    // ui update
    userName.innerHTML = `Welcome : <b>${localStorage.getItem("userName")}</b>`
    attemptDisplay.innerHTML = `Attempt: ${localStorage.getItem("userAttempt")}`
    
    showQuestion();
}

function showQuestion() {
  if(!Array.isArray(questions)||questions.length === 0){
        quizzDiv.innerHTML = "No quiz data available.";
      return;
    } 
      const q = questions[currentQuestion];
    
      const CorrectAnswer = q.correct_answer;
      const IncorrectAnswers = q.incorrect_answers;

      const allAnswers = [...IncorrectAnswers,CorrectAnswer ].sort(() => Math.random());
      
      quizzDiv.innerHTML = `
      <div class="question"><strong>Q${currentQuestion + 1}: </strong> ${q.question}</div>
      <div class="options">
      ${
        allAnswers.map(answer => `<button onclick='submitAnswer("${answer}")'>${answer}</button>`)
        .join(' ')
      }
      </div>
      `;
      
}

async function submitAnswer(answer) {

  // if current question length become equals to questions length safe guard
  if(currentQuestion >= questions.length)return;
  

  //  if user click the wrong answer:
  if (answer === questions[currentQuestion].correct_answer) {
      score++; 
  }
  
    userScored.innerHTML = `Score: ${score}`
    currentQuestion++;

    userDisplayQuestions.innerHTML = `Total Questions: ${Math.min(currentQuestion + 1,questions.length)}/10`
  // if user reached the last question:
  if (currentQuestion < questions.length ) {  
    // console.log('currentquestionIndex => ', currentQuestion, 'question: => ',questions.length);
      showQuestion();
  } else {
      quizzDiv.innerHTML = `<h2>You scored ${score} out of ${questions.length}!</h2>`;
      localStorage.removeItem("quizzQuestions")

      // call the backed and update the scorea nd attempts:
    
      try {
        
          await fetch("http://localhost:3000/app/update-user-information",{
          method:"POST",
          headers:{"Authorization":localStorage.getItem("token"),
                  "Content-Type":"application/json"},
          body:JSON.stringify({score:score,attempt:1})          
        });
        // if(response.ok){
        //   console.log("user has updated in datatbase");
        // }
        
      } catch (error) {
          console.log(error,"Error in post request");
          
      }

  }
}


loadQuiz();
