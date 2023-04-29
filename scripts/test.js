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
    currentQuestion.element.querySelectorAll(".choice").forEach((choice) => {
      choice.addEventListener("click", this.handleChoiceSelection);
    });

    this.questionContainer.appendChild(currentQuestion.element);
  };

  handleChoiceSelection = () => {
    console.log(this.testReference.testStatus.totalScore);
    this.currentQuestionIndex++;
    if (this.currentQuestionIndex < this.questions.length) {
      this.displayQuestion();
    } else {
      this.endCallback();
    }
  };
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
    this.callback().forEach((result) => {
      returnElement.appendChild(result);
    });

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
    this.results.forEach((result) => {
      this.resultContainer.appendChild(result.element);
    });
  };
}

class Test {
  constructor(questionManager, resultManager, testStatus) {
    this.questionManager = questionManager;
    this.resultManager = resultManager;
    this.testStatus = testStatus;

    this.questionManager.testReference = this;
    this.resultManager.testReference = this;

    this.questionManager.endCallback = this.endQuestion;
  }

  startTest = () => {
    this.questionManager.displayQuestion();
  };

  endQuestion = () => {
    this.resultManager.displayResult();
  };
}

class TestStatus {
  constructor() {
    this.totalScore = 0;
  }
}

export default {
  Choice,
  Question,
  QuestionManager,
  Result,
  ResultManager,
  Test,
  TestStatus,
};