let question = "";
let answers = "";
let correctAnswer = "";

const STORE = {
  currentQuestion: 0,
  currentScore: 0,

  questions: [
    {
      question: "Originally, what fruit or vegetable was carved for Halloween?",
      answers: ["Pumpkin", "Watermelon", "Turnip", "Squash"],
      rightAnswer: "Turnip"
    },
    {
      question: "What is the purpose of Jack-o'-lanterns?",
      answers: [
        "They look cool",
        "They were carried to frighten evil spirits",
        "People used them to keep warm",
        "People liked the smell"
      ],
      rightAnswer: "They were carried to frighten evil spirits"
    },
    {
      question: "What does the word 'Halloween' mean?",
      answers: ["Night of Evil", "Saints' evening", "Devil's Day", "Nevermore"],
      rightAnswer: "Saints' evening"
    },
    {
      question:
        "Which of the following is NOT a traditional Halloween Activity?",
      answers: [
        "Apple bobbing",
        "Trick-or-treating",
        "Lighting bonfires",
        "Eating massive amounts of candy"
      ],
      rightAnswer: "Eating massive amounts of candy"
    },
    {
      question: "What do Jack-o'-lanterns represent?",
      answers: [
        "A soul trapped in purgatory",
        "The Enlightenment",
        "A Celtic King",
        "A lost child"
      ],
      rightAnswer: "A soul trapped in purgatory"
    }
  ]
};

// a function to start the quiz when the start button is clicked
function startQuiz() {
  // clear the start-view page when start-button is clicked
  updateQuestion();
  generateForm();
  generateQuestion(STORE.currentQuestion);
}

$(`.start-button`).on("click", function(event) {
  startQuiz();
  $(`.start-view`).hide();
  $(`.question-view`).show();
});

function generateForm() {
  let form = $(`.question-view`).html(
    $(`<form>
    <fieldset class="question-list">
      <legend class="questionText">
      </legend>
      <div class="questions"> </div> 
    </fieldset>
    <button type="submit" class="submit-button">Submit</button>
  <button type="button" class="next-button">Next</button>
  </form>`)
  );
  $(".submit-button").on("click", function(event) {
    event.preventDefault();
    let userChoice = $("input[name=answer]:checked").val();
    console.log(`userChoice is ` + userChoice);
    console.log("correctAnswer is " + correctAnswer);
    //TODO fix bug allowing multiple submissions
    if (userChoice) {
      if (userChoice == correctAnswer) {
        console.log("correct!");
        rightAnswer();
        updateScore();
      } else {
        console.log("incorrect");
        wrongAnswer();
      }
    } else {
    }
  });
  $(".next-button").on("click", function(event) {
    if (STORE.currentQuestion < 5) {
      updateQuestion();
      generateQuestion(STORE.currentQuestion);
    } else {
      showResults();
    }
  });
}

// a function to generate a question, and the form that the user will choose their options from
function generateQuestion(currentQuestion) {
  question = STORE.questions[currentQuestion - 1].question;
  answers = STORE.questions[currentQuestion - 1].answers;
  correctAnswer = STORE.questions[currentQuestion - 1].rightAnswer;

  $(".questionText").html(question);
  $(".questions").html("");
  answers.forEach(element => {
    $(".questions").append(
      `<div>
      <input class="answer" type="radio" name="answer" required value="${element}">${element}
     </div>`
    );
  });
}

function updateScore() {
  let newScore = ++STORE.currentScore;
  $(".score").text(newScore);
}

function updateQuestion() {
  let questionNum = ++STORE.currentQuestion;
  console.log(questionNum);
  $(".question-number").text(questionNum);
  $(".response-view").html(``);
}

function wrongAnswer() {
  $(".response-view").html(`<h2 class="feedback">Incorrect</h2>`);
  $("input[name=answer]").attr("disabled", true);
}

function rightAnswer() {
  $(".response-view").html(`<h2 class="feedback">Correct!</h2>`);
  $("input[name=answer]").attr("disabled", true);
}

function showResults() {
  console.log("Showing results");
  $(".question-view").hide();
  $(".response-view").hide();
  $(".results-view").show();
  $(".results-view")
    .html(`<h2 class="results">Total score: ${STORE.currentScore}/5</h2>
  <button type="button" class="reset-button">Reset</button>`);
}

$(`.results-view`).on("click", ".reset-button", function(event) {
  STORE.currentScore = 0;
  STORE.currentQuestion = 0;
  $(".question-number").text(0);
  $(".score").text(0);
  $(`.start-view`).show();
  $(`.question-view`).hide();
  $(".results-view").hide();
});

function makeQuizApp() {}

$(makeQuizApp);
