class Choice {
  constructor(text, callback) {
    this.text = text;
    this.callback = callback;
  }

  createElement() {
    const element = document.createElement("button");
    element.classList.add("choice");
    element.innerText = this.text;
    element.addEventListener("click", this.callback);

    return element;
  }
}

class Subheading {
  constructor(subheading, elementType="h3") {
    this.subheading = subheading;
    this.elementType = elementType;
  }
   
  createElement() {
    const element = document.createElement(this.elementType);
    element.classList.add("subheading");
    element.innerText = this.subheading;
    
    return element;
  }
}

class Loading {
  constructor(time, promise = new Promise((resolve)=>{resolve();})) {
    this.time = time;
    this.promise = promise;
  }

  createElement() {
    const element = document.createElement("div");
    element.classList.add("loading");
    
    const spinner = document.createElement("div");
    spinner.classList.add("spinner");

    element.appendChild(spinner);

    return element;
  }
}

class Question {
  constructor(question, choices) {
    this.question = question;
    this.choices = choices;

    this.element = this.createElement();
  }

  createElement() {
    const element = document.createElement("div");
    element.classList.add("question");

    const titleElement = document.createElement("h2");
    titleElement.innerText = this.question;
    element.appendChild(titleElement);

    const choiceContainer = document.createElement("div");
    choiceContainer.classList.add("choice-container");
    this.choices.forEach((choice) => {
      const choiceElement = choice.createElement();
      choiceElement.addEventListener("click", () => {
        element.classList.add("complete");
      });
      choiceContainer.appendChild(choiceElement);
    });
    element.appendChild(choiceContainer);

    return element;
  }
}

class QuestionManager {
  constructor(questions, questionContainer) {
    this.testReference = null;
    this.endCallback = null;
    this.questionContainer = questionContainer;
    this.questions = questions;
    this.currentQuestionIndex = 0;
    this.lastSubheading = null;
  }

  displayQuestion = () => {
    const currentQuestion = this.questions[this.currentQuestionIndex];
    const currentElement = currentQuestion.createElement();

    if (currentQuestion instanceof Subheading) {
      this.lastSubheading = currentQuestion;
      this.endCurrentQuestion();
      return;
    }

    if (currentQuestion instanceof Question) {
      currentElement.querySelectorAll(".choice").forEach((choice) => {
        choice.addEventListener("click", this.endCurrentQuestion);
      });
      if (this.lastSubheading) {
        const subheadingElement = this.lastSubheading.createElement();
        currentElement.insertBefore(
          subheadingElement,
          currentElement.firstChild
        );
      }
    } else if (currentQuestion instanceof Loading) {
      setTimeout(()=>{
        currentQuestion.promise.then(()=>{
          this.endCurrentQuestion();
          currentElement.classList.add("complete");
        })
      }, currentQuestion.time);
    }

    this.questionContainer.appendChild(currentElement);
  };

  endCurrentQuestion = () => {
    this.currentQuestionIndex++;
    if (this.currentQuestionIndex >= this.questions.length) {
      this.endCallback();
      return;
    }

    const nextStep = this.questions[this.currentQuestionIndex];
    if (nextStep instanceof Subheading) {
      this.lastSubheading = nextStep;
    }
    this.displayQuestion();
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
  Subheading,
  Loading,
  QuestionManager,
  Result,
  ResultManager,
  Test,
  TestStatus,
};
