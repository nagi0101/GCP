import Test from "./test.js";

const questionDiv = document.querySelector("#psycho-question");
const startBtn = document.querySelector("#btn-start");

const testStatus = new Test.TestStatus();
const questions = [
  new Test.Question("당신은 어떤 색을 좋아하나요?", [
    new Test.Choice("빨강", () => (testStatus.totalScore += 1)),
    new Test.Choice("파랑", () => (testStatus.totalScore += 2)),
    new Test.Choice("초록", () => (testStatus.totalScore += 3)),
  ]),
  new Test.Question("당신은 어떤 종류의 영화를 좋아하시나요?", [
    new Test.Choice("액션", () => (testStatus.totalScore += 1)),
    new Test.Choice("코미디", () => (testStatus.totalScore += 2)),
    new Test.Choice("드라마", () => (testStatus.totalScore += 3)),
  ]),
  new Test.Question("당신은 어떤 동물을 좋아하시나요?", [
    new Test.Choice("강아지", () => (testStatus.totalScore += 1)),
    new Test.Choice("고양이", () => (testStatus.totalScore += 2)),
    new Test.Choice("하늘다람쥐", () => (testStatus.totalScore += 3)),
    new Test.Choice("맘스땃쥐", () => (testStatus.totalScore += 4)),
  ]),
  new Test.Question("당신은 어떤 날씨를 좋아하시나요?", [
    new Test.Choice("맑은 날", () => (testStatus.totalScore += 1)),
    new Test.Choice("흐린 날", () => (testStatus.totalScore += 2)),
    new Test.Choice("비오는 날", () => (testStatus.totalScore += 3)),
    new Test.Choice("눈오는 날", () => (testStatus.totalScore += 4)),
  ]),
];
const results = [
  new Test.Result("점수 합계", () => {
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
  new Test.Result("그거 아시나요?", () => {
    const p = document.createElement("p");
    p.innerText =
      "비대면 우울증 상담 참가자들의 42%가 온라인 상담만으로 우울증이 호전되었다는 연구 결과가 있습니다.";

    return [p];
  }),
  new Test.Result("Lorem ipsum", () => {
    const p = document.createElement("p");
    p.innerText =
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Neque reiciendis, vitae voluptates optio provident, molestias inventore iste repellat nobis ad ullam facilis nemo veritatis necessitatibus. Eveniet quas cum incidunt facilis? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Neque reiciendis, vitae voluptates optio provident, molestias inventore iste repellat nobis ad ullam facilis nemo veritatis necessitatibus. Eveniet quas cum incidunt facilis? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Neque reiciendis, vitae voluptates optio provident, molestias inventore iste repellat nobis ad ullam facilis nemo veritatis necessitatibus. Eveniet quas cum incidunt facilis? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Neque reiciendis, vitae voluptates optio provident, molestias inventore iste repellat nobis ad ullam facilis nemo veritatis necessitatibus. Eveniet quas cum incidunt facilis? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Neque reiciendis, vitae voluptates optio provident, molestias inventore iste repellat nobis ad ullam facilis nemo veritatis necessitatibus. Eveniet quas cum incidunt facilis? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Neque reiciendis, vitae voluptates optio provident, molestias inventore iste repellat nobis ad ullam facilis nemo veritatis necessitatibus. Eveniet quas cum incidunt facilis?";

    return [p];
  }),
  new Test.Result("망설이지 마세요", () => {
    const a = document.createElement("a");
    a.innerText = "1393 자살예방상담전화";
    a.href = "tel:1393";

    return [a];
  }),
];

const questionManager = new Test.QuestionManager(questions, questionDiv);
const resultManager = new Test.ResultManager(results, questionDiv);
const test = new Test.Test(questionManager, resultManager, testStatus);

startBtn.addEventListener("click", () => {
  startBtn.classList.add("complete");
  test.startTest();
});
