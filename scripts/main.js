class Choice {
  constructor(text, callback) {
    this.text = text;
    this.callback = callback;

    this.element = document.createElement("button");
    this.element.classList.add("choice");
    this.element.innerText = this.text;
    this.element.addEventListener("click", this.callback);
  }
}

class Question {
  constructor(question, choices) {
    this.question = question;
    this.choices = choices;

    this.element = document.createElement("div");
    this.element.classList.add("question");

    const titleElement = document.createElement("h2");
    titleElement.innerText = this.question;
    this.element.appendChild(titleElement);

    const choiceContainer = document.createElement("div");
    choiceContainer.classList.add("choice-container");
    this.choices.forEach((choice) => {
      choice.element.addEventListener("click", () => {
        this.element.classList.add("complete");
      });
      choiceContainer.appendChild(choice.element);
    });
    this.element.appendChild(choiceContainer);
  }
}

class QuestionManager {
  constructor(questions, questionContainer) {
    this.testReference = null;
    this.endCallback = null;
    this.questionContainer = questionContainer;
    this.questions = questions;
    this.currentQuestionIndex = 0;
  }

  displayQuestion = () => {
    const currentQuestion = this.questions[this.currentQuestionIndex];
    currentQuestion.element.querySelectorAll(".choice").forEach(choice => {
      choice.addEventListener("click", this.handleChoiceSelection);
    });

    this.questionContainer.appendChild(currentQuestion.element);
  }

  handleChoiceSelection = () => {
    console.log(this.testReference.testStatus.totalScore);
    this.currentQuestionIndex++;
    if (this.currentQuestionIndex < this.questions.length) {
      this.displayQuestion();
    } else {
      this.endCallback();
    }
  }
}

class Result {
  constructor(title, callback) {
    this.title = title;
    this.callback = callback;
  }

  get element() {
    const returnElement = document.createElement("div"); 
    returnElement.classList.add("result");

    const titleElement = document.createElement("h2");
    titleElement.innerText = this.title;

    returnElement.appendChild(titleElement);
    this.callback().forEach(result => {
      returnElement.appendChild(result);
    })

    return returnElement;
  }
}

class ResultManager {
  constructor(results, resultContainer) {
    this.testReference = null;
    this.results = results;
    this.resultContainer = resultContainer;
  }

  displayResult = () => {
    this.results.forEach(result => {
      this.resultContainer.appendChild(result.element);
    })
  };
}

class Test {
  constructor(startTrigger, questionManager, resultManager, testStatus) {
    this.startTrigger = startTrigger;
    this.questionManager = questionManager;
    this.resultManager = resultManager;
    this.testStatus = testStatus;

    this.questionManager.testReference = this;
    this.resultManager.testReference = this;

    this.questionManager.endCallback = this.endQuestion;

    this.startTrigger.addEventListener("click", this.startTest);
  }

  startTest = () => {
    this.startTrigger.classList.add("complete");
    questionManager.displayQuestion();
  }

  endQuestion() {
    resultManager.displayResult();
  }
}

class TestStatus {
  constructor(){
    this.totalScore = 0;
  }
}


const questionDiv = document.querySelector("#psycho-question");
const startBtn = document.querySelector("#btn-start");

const testStatus = new TestStatus();
const questions = [
  new Question("당신은 어떤 색을 좋아하나요?", [
    new Choice("빨강", () => (testStatus.totalScore += 1)),
    new Choice("파랑", () => (testStatus.totalScore += 2)),
    new Choice("초록", () => (testStatus.totalScore += 3)),
  ]),
  new Question("당신은 어떤 종류의 영화를 좋아하시나요?", [
    new Choice("액션", () => (testStatus.totalScore += 1)),
    new Choice("코미디", () => (testStatus.totalScore += 2)),
    new Choice("드라마", () => (testStatus.totalScore += 3)),
  ]),
  new Question("당신은 어떤 동물을 좋아하시나요?", [
    new Choice("강아지", () => (testStatus.totalScore += 1)),
    new Choice("고양이", () => (testStatus.totalScore += 2)),
    new Choice("하늘다람쥐", () => (testStatus.totalScore += 3)),
    new Choice("맘스땃쥐", () => (testStatus.totalScore += 4)),
  ]),
  new Question("당신은 어떤 날씨를 좋아하시나요?", [
    new Choice("맑은 날", () => (testStatus.totalScore += 1)),
    new Choice("흐린 날", () => (testStatus.totalScore += 2)),
    new Choice("비오는 날", () => (testStatus.totalScore += 3)),
    new Choice("눈오는 날", () => (testStatus.totalScore += 4)),
  ]),
];
const results = [
  new Result("점수 합계", () => {
    const score = document.createElement("p");
    score.innerText = `점수 합계는 ${testStatus.totalScore}점입니다.`;
    
    const scoreEvaluate = document.createElement("p");
    if (testStatus.totalScore >= 10) {
      scoreEvaluate.innerText = `10점 이상이네요!!`;
    } else {
      scoreEvaluate.innerText = `10점 미만이군요...`;
    }
    
    return [score, scoreEvaluate]; 
  }),
  new Result("그거 아시나요?", () => {
    const p = document.createElement("p");
    p.innerText = "비대면 우울증 상담 참가자들의 42%가 온라인 상담만으로 우울증이 호전되었다는 연구 결과가 있습니다."; 
    
    return [p];
  }),
  new Result("Lorem ipsum", () => {
    const p = document.createElement("p");
    p.innerText = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Neque reiciendis, vitae voluptates optio provident, molestias inventore iste repellat nobis ad ullam facilis nemo veritatis necessitatibus. Eveniet quas cum incidunt facilis? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Neque reiciendis, vitae voluptates optio provident, molestias inventore iste repellat nobis ad ullam facilis nemo veritatis necessitatibus. Eveniet quas cum incidunt facilis? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Neque reiciendis, vitae voluptates optio provident, molestias inventore iste repellat nobis ad ullam facilis nemo veritatis necessitatibus. Eveniet quas cum incidunt facilis? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Neque reiciendis, vitae voluptates optio provident, molestias inventore iste repellat nobis ad ullam facilis nemo veritatis necessitatibus. Eveniet quas cum incidunt facilis? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Neque reiciendis, vitae voluptates optio provident, molestias inventore iste repellat nobis ad ullam facilis nemo veritatis necessitatibus. Eveniet quas cum incidunt facilis? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Neque reiciendis, vitae voluptates optio provident, molestias inventore iste repellat nobis ad ullam facilis nemo veritatis necessitatibus. Eveniet quas cum incidunt facilis?"; 
    
    return [p];
  }),
  new Result("망설이지 마세요", () => {
    const a = document.createElement("a");
    a.innerText = "1393 자살예방상담전화"; 
    a.href = "tel:1393";

    return [a];
  }),
];

const questionManager = new QuestionManager(questions, questionDiv);
const resultManager = new ResultManager(results, questionDiv);
const test = new Test(startBtn, questionManager, resultManager, testStatus);