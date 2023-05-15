import Test from "./test.js";

const questionDiv = document.querySelector("#psycho-question");
const startBtn = document.querySelector("#btn-start");

const defaultChoice = [
  new Test.Choice("극히 드물게", () => (testStatus.totalScore += 0)),
  new Test.Choice("가끔", () => (testStatus.totalScore += 1)),
  new Test.Choice("자주", () => (testStatus.totalScore += 2)),
  new Test.Choice("거의 대부분", () => (testStatus.totalScore += 3)),
];
const reverseChoice = [
  new Test.Choice("극히 드물게", () => (testStatus.totalScore += 3)),
  new Test.Choice("가끔", () => (testStatus.totalScore += 2)),
  new Test.Choice("자주", () => (testStatus.totalScore += 1)),
  new Test.Choice("거의 대부분", () => (testStatus.totalScore += 0)),
];


const testStatus = new Test.TestStatus();
const questions = [
  new Test.Subheading("지난 일주일동안..."),
  new Test.Question("평소에는 아무렇지도 않던 일들이 괴롭고 귀찮지 않으신가요?", defaultChoice),
  new Test.Question("요즘 입맛이 없지 않으신가요?", defaultChoice),
  new Test.Question("가족이나 친구가 도와주더라도 울적한 기분이 들지 않나요?", defaultChoice),
  new Test.Question("다른 사람들만큼 능력 있다고 느끼시나요?", reverseChoice),
  new Test.Question("사소한 일에도 정신을 집중하기가 힘들지 않았나요? ", defaultChoice),
  new Test.Question("우울하지 않으셨나요?", defaultChoice),
  new Test.Question("하는 일마다 힘들게 느끼시진 않았나요?", defaultChoice),
  new Test.Question("미래에 대하여 희망적으로 느끼셨나요?", reverseChoice),
  new Test.Question("자신의 인생은 실패작이라고 생각하진 않으셨나요?", defaultChoice),
  new Test.Question("두려움을 느끼시지는 않았나요?", defaultChoice),
  new Test.Question("잠을 설치지는 않으셨나요?", defaultChoice),
  new Test.Question("행복하셨나요?", reverseChoice),
  new Test.Question("평소보다 말을 적게 하지 않으셨나요?", defaultChoice),
  new Test.Question("외로움을 느끼지는 않으셨나요?", defaultChoice),
  new Test.Question("사람들이 불친절하진 않았나요?", defaultChoice),
  new Test.Question("인생이 즐거우셨나요?", reverseChoice),
  new Test.Question("울음을 터뜨린 적이 있으신가요?", defaultChoice),
  new Test.Question("슬프지는 않으셨나요?", defaultChoice),
  new Test.Question("사람들이 자신을 싫어한다고 느끼지는 않으셨나요?", defaultChoice),
  new Test.Question("일을 제대로 할 수 없지 않으셨나요?", defaultChoice),
];
const results = [
  new Test.Result("검사 결과", () => {
    const score = document.createElement("p");
    score.innerText = `총 ${testStatus.totalScore}점입니다.`;

    const scoreEvaluate = document.createElement("p");
    if (testStatus.totalScore <= 15) {
      scoreEvaluate.innerText = `평온한 마음을 가지고 계시군요:)`;
    } else if (testStatus.totalScore <= 20){
      scoreEvaluate.innerText = `괜찮아질 때까지 울어요. 아무리 울어도 괜찮아지지 않는다면, 혼자서 고민하지 말아요.`;
    } else if (testStatus.totalScore <= 24){
      scoreEvaluate.innerText = `지금까지 많이 힘드셨죠? 같이 이야기 나눠요. 편하게 전화주세요.`;
    } else {
      scoreEvaluate.innerText = `먼저 안아주지 못해서 미안해요. 지금이라도 같이 이야기 나누어봐요.`;
    }

    return [score, scoreEvaluate];
  }),
  new Test.Result("그거 아시나요?", () => {
    const p = document.createElement("p");
    p.innerText =
      "비대면 우울증 상담 참가자들의 42%가 온라인 상담만으로 우울증이 호전되었다는 연구 결과가 있습니다.";

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
