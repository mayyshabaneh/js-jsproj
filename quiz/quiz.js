const quizdata = [
  {
    question: "What is the capital of France?",
    options: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris",
  },
  {
    question: "What is the largest planet in our solar system?",
    options: ["Mars", "Saturn", "Jupiter", "Neptune"],
    answer: "Jupiter",
  },
  {
    question: "Which country won the FIFA World Cup in 2018?",
    options: ["Brazil", "Germany", "France", "Argentina"],
    answer: "France",
  },
  {
    question: "What is the capital of France?",
    options: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris",
  },
  {
    question: "What is the largest planet in our solar system?",
    options: ["Mars", "Saturn", "Jupiter"],
    answer: "Jupiter",
  },
  {
    question: "Which country won the FIFA World Cup in 2018?",
    options: ["Brazil", "Germany", "France", "Argentina"],
    answer: "France",
  },
];

const quizcon = document.getElementById("quiz");
let current = 0;
const retrybtn = document.createElement("BUTTON");
retrybtn.className = "retry";
retrybtn.innerHTML = "Retry";
const submitbtn = document.createElement("BUTTON");
submitbtn.className = "submit";
submitbtn.innerHTML = "Next Quesition";
let correctNum = 0;
displayQuestion();
function shuffleArr(arr) {
  let currentIndex = arr.length;
  while (currentIndex != 0) {
    const randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [arr[currentIndex], arr[randomIndex]] = [
      arr[randomIndex],
      arr[currentIndex],
    ];
  }
  return arr;
}

function displayQuestion() {
  const questiondata = quizdata[current];
  const questionelement = document.createElement("div");
  questionelement.className = "question";
  questionelement.innerHTML = questiondata.question;
  const header = document.createElement("div");
  header.className = "header";
  const optionele = document.createElement("div");
  optionele.className = "options";
  const shuffledOptions = shuffleArr([...questiondata.options]);
  for (let i = 0; i < shuffledOptions.length; i++) {
    
    header.innerHTML = `Quistion ${current+1}`;
    const option = document.createElement("div");
    option.className = "option";
    option.innerHTML = shuffledOptions[i];
    option.addEventListener("click", () =>
      checkAnswer(questiondata.answer, option, shuffledOptions)
    );

    optionele.appendChild(option);
  }

  quizcon.innerHTML = "";
  quizcon.appendChild(header);
  quizcon.appendChild(questionelement);
  quizcon.appendChild(optionele);
  quizcon.appendChild(submitbtn);
}

function checkAnswer(correct, selectedop, arr) {
  let correctedone;
  if (selectedop.innerHTML === correct) {
    selectedop.style.backgroundColor = "green";
    correctNum++;
  } else {
    selectedop.style.backgroundColor = "red";
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === correct) {
        const options = document.getElementsByClassName("option");
        correctedone = options[i];
        break;
      }
    }
    correctedone.style.backgroundColor = "green";
  }

  current++;
  submitbtn.addEventListener("click", () => {
    const options = document.getElementsByClassName("option");
    for (let i = 0; i < options.length; i++) {
      options[i].style.backgroundColor = "";
    }
    if (current < quizdata.length) {
      displayQuestion();
    } else {
        const score = document.createElement("div");
        quizcon.innerHTML = "";
        score.className = 'score';
        score.innerHTML = `your score is ${correctNum} / ${quizdata.length}`;
        console.log(score);
        
        // current = 0;
        const trybtn = document.createElement("BUTTON");
        trybtn.className = 'submit';
        trybtn.innerHTML = 'Try Again';
        trybtn.addEventListener("click",()=>{current = 0 ;
            correctNum = 0;
            displayQuestion()});
        quizcon.appendChild(score);
        quizcon.appendChild(trybtn);
    }
    // displayQuestion();
  });
}
