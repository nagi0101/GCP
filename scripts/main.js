import Test from "./test.js";

const questionDiv = document.querySelector("#psycho-question");
const startBtn = document.querySelector("#btn-start");

const mythAndFacts = [
  [
      new Test.Subheading("혹시 그거 아세요?#1"),
      new Test.Question("우울증은 강한 스트레스에서 오는 것이 아니랍니다.", [
          new Test.Choice("사실 우울증은 별 이유없이 주기적으로 찾아온답니다"),
          new Test.Choice("오히려 스트레스로 인한 우울감은 치료까진 필요 없다고 해요"),
      ]),
      new Test.Subheading("지난 일주일동안..."),
  ],
  [
      new Test.Subheading("혹시 그거 아세요?#2"),
      new Test.Question("내성적인 사람이 우울증에 더 자주 걸리는 것은 아니랍니다.", [
          new Test.Choice("활발하고 외향적인 사람이라고 우울증에 더 강한 것은 아니에요"),
      ]),
      new Test.Subheading("지난 일주일동안..."),
  ],
  [
      new Test.Subheading("혹시 그거 아세요?#3"),
      new Test.Question("심리 상담은 꼭 심각한 문제가 있어서 받는 것은 아니랍니다.", [
        new Test.Choice("서구권에선 심리 상담을 일상적이고 보편적인 것으로 생각한다는거 아시나요?"),
        new Test.Choice("고민 상담과 같은 느낌으로 심리 상담을 진행하는 경우가 굉장히 많다고 합니다"),
      ]),
      new Test.Subheading("지난 일주일동안..."),
  ],
  [
      new Test.Subheading("혹시 그거 아세요?#4"),
      new Test.Question("당연히도, 상담자는 내담자 분들을 따듯하게 맞아주십니다.", [
          new Test.Choice("상담자는 많은 교육을 받은 전문가 분들이에요"),
          new Test.Choice("혹시 자신을 이상하게 바라보지 않을까 걱정할 필요 없어요"),
      ]),
      new Test.Subheading("지난 일주일동안..."),
  ],
];

const testStatus = new Test.TestStatus();

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

let positionPromiseResolve;
const positionPromise = new Promise((resolve) => {
  positionPromiseResolve = resolve;
});

const SEX_CODE = {
  MALE : 0,
  FEMALE : 1,
};
const AGE_CODE = {
  _13_19: 0,
  _20_29: 1, 
  _30_39: 2, 
  _40_49: 3, 
  _50_59: 4, 
  _60_: 5, 
};

const questions = [
  new Test.Subheading("개인정보는 저장되지 않으니 안심하세요"),
  new Test.Question("여러분의 성별을 알려주시겠어요?", [
    new Test.Choice("남성", () => (testStatus.sex = SEX_CODE.MALE)),
    new Test.Choice("여성", () => (testStatus.sex = SEX_CODE.FEMALE)),
  ]),
  new Test.Question("여러분의 나이를 알려주시겠어요?", [
    new Test.Choice("13~19", () => (testStatus.age = AGE_CODE._13_19)),
    new Test.Choice("20~29", () => (testStatus.age = AGE_CODE._20_29)),
    new Test.Choice("30~39", () => (testStatus.age = AGE_CODE._30_39)),
    new Test.Choice("40~49", () => (testStatus.age = AGE_CODE._40_49)),
    new Test.Choice("50~59", () => (testStatus.age = AGE_CODE._50_59)),
    new Test.Choice("60~", () => (testStatus.age = AGE_CODE._60_)),
  ]),
  new Test.Subheading("지난 일주일동안..."),
  new Test.Question("평소에는 아무렇지도 않던 일들이 괴롭고 귀찮지 않으신가요?", defaultChoice),
  new Test.Question("요즘 입맛이 없지 않으신가요?", defaultChoice),
  new Test.Question("가족이나 친구가 도와주더라도 울적한 기분이 들지 않나요?", defaultChoice),
  new Test.Question("다른 사람들만큼 능력 있다고 느끼시나요?", reverseChoice),
  new Test.Question("사소한 일에도 정신을 집중하기가 힘들지 않았나요? ", defaultChoice),
  ...mythAndFacts[0],
  new Test.Question("우울하지 않으셨나요?", defaultChoice),
  new Test.Question("하는 일마다 힘들게 느끼시진 않았나요?", defaultChoice),
  new Test.Question("미래에 대하여 희망적으로 느끼셨나요?", reverseChoice),
  new Test.Question("자신의 인생은 실패작이라고 생각하진 않으셨나요?", defaultChoice),
  new Test.Question("두려움을 느끼시지는 않았나요?", defaultChoice),
  ...mythAndFacts[1],
  new Test.Question("잠을 설치지는 않으셨나요?", defaultChoice),
  new Test.Question("행복하셨나요?", reverseChoice),
  new Test.Question("평소보다 말을 적게 하지 않으셨나요?", defaultChoice),
  new Test.Question("외로움을 느끼지는 않으셨나요?", defaultChoice),
  new Test.Question("사람들이 불친절하진 않았나요?", defaultChoice),
  ...mythAndFacts[2],
  new Test.Question("인생이 즐거우셨나요?", reverseChoice),
  new Test.Question("울음을 터뜨린 적이 있으신가요?", defaultChoice),
  new Test.Question("슬프지는 않으셨나요?", defaultChoice),
  new Test.Question("사람들이 자신을 싫어한다고 느끼지는 않으셨나요?", defaultChoice),
  new Test.Question("일을 제대로 할 수 없지 않으셨나요?", defaultChoice),
  ...mythAndFacts[3],
  new Test.Subheading("그 누구에게도 알리지 않으니 안심하셔도 됩니다"),
  new Test.Question(
    "주변의 상담소를 알려드리고 싶은데, 제게 위치를 알려주시겠어요?",
    [
      new Test.Choice("네!", () => {
        navigator.geolocation.getCurrentPosition((position) => {
          positionPromiseResolve();
          const lat = position.coords.latitude;
          const long = position.coords.longitude;
          testStatus.position = { lat, long };
        }, (error) => {
          positionPromiseResolve();
          testStatus.position = null;
        });
      }),
      new Test.Choice("아뇨...", () => {
        positionPromiseResolve();
        testStatus.position = null;
      }),
    ]
  ),
  new Test.Loading(2000, positionPromise),
];
const results = [
  new Test.Result("검사 결과", () => {
    const score = document.createElement("p");
    score.innerText = `총 ${testStatus.totalScore}점입니다.`;
    
    const scoreEvaluate = document.createElement("p");
    if (testStatus.totalScore <= 15) {
      scoreEvaluate.innerText = `평온한 마음을 가지고 계시군요:)`;
    } else if (testStatus.totalScore <= 20) {
      scoreEvaluate.innerText = `괜찮아질 때까지 울어요. 아무리 울어도 괜찮아지지 않는다면, 혼자서 고민하지 말아요.`;
    } else if (testStatus.totalScore <= 24) {
      scoreEvaluate.innerText = `지금까지 많이 힘드셨죠? 같이 이야기 나눠요. 편하게 전화주세요.`;
    } else {
      scoreEvaluate.innerText = `먼저 안아주지 못해서 미안해요. 지금이라도 같이 이야기 나누어봐요.`;
    }

    gtag("event", "test_result", {
      "event_name": "test_result",
      "test_result": testStatus.totalScore,
    });
    
    return [score, scoreEvaluate];
  }),
  new Test.Result("결과 분석", () => {
    const resultList = [
      [
        "16점 미만",
        "건강한 심리 상태를 유지하고 있습니다. 다른 사람들에게도 당신의 행복을 전해주세요:)",
      ],
      [
        "16~20점",
        "약간 우울한 상태시군요. 무엇이 나를 힘들게 하는지 곰곰히 생각해봅시다.",
      ],
      [
        "21~24점",
        "우울한 심리 상태에 있으십니다. 주위의 사람들에게 도움을 청해보세요.",
      ],
      [
        "25~37점",
        "심각히 우울한 상태입니다. 심리 상담을 받으시길 추천드립니다.",
      ],
      [
        "38점 이상",
        "우울증은 의지로 극복할 수 없습니다. 적극적으로 정신건강 전문가의 도움을 받으세요.",
      ],
    ];

    const table = document.createElement("table");
    const thead = document.createElement("thead");
    const tbody = document.createElement("tbody");

    const th0 = document.createElement("th");
    const th1 = document.createElement("th");

    th0.innerText = "구간";
    th1.innerText = "설명";

    thead.appendChild(th0);
    thead.appendChild(th1);

    resultList.forEach((result) => {
      const tr = document.createElement("tr");

      const th0 = document.createElement("th");
      const th1 = document.createElement("th");
      th0.innerText = result[0];
      th1.innerText = result[1];
      tr.appendChild(th0);
      tr.appendChild(th1);

      tbody.appendChild(tr);
    });

    table.appendChild(thead);
    table.appendChild(tbody);

    return [table];
  }),
  new Test.Result("지역 상담소에 연락해보세요", () => {
    if(!testStatus.position) {
      return [];
    }

    const p = document.createElement("p");
    p.innerText = "이 상담소가 가장 가까워요";
    const locations = [
      {
        name: "중랑구정신건강복지센터",
        tel: "02-3422-5921",
        long: 127.084732,
        lat: 37.5737091,
      },
      {
        name: "중구정신건강복지센터",
        tel: "02-2236-6606",
        long: 126.965924,
        lat: 37.5594255,
      },
      {
        name: "종로구정신건강복지센터",
        tel: "02-745-0199",
        long: 126.997612,
        lat: 37.5900824,
      },
      {
        name: "은평구정신건강복지센터",
        tel: "02-351-8680",
        long: 126.927687,
        lat: 37.6215038,
      },
      {
        name: "용산구정신건강복지센터",
        tel: "02-2199-8340",
        long: 126.990103,
        lat: 37.5324725,
      },
      {
        name: "영등포구정신건강복지센터",
        tel: "02-2670-4793",
        long: 126.896275,
        lat: 37.5261914,
      },
      {
        name: "양천구정신건강복지센터",
        tel: "02-2061-8881",
        long: 126.865882,
        lat: 37.517619,
      },
      {
        name: "송파구정신건강복지센터",
        tel: "02-2147-5030",
        long: 127.142781,
        lat: 37.4899154,
      },
      {
        name: "성북구정신건강복지센터",
        tel: "02-2241-6314",
        long: 127.039512,
        lat: 37.6026811,
      },
      {
        name: "성동구정신건강복지센터",
        tel: "02-2298-1080",
        long: 127.021403,
        lat: 37.5544737,
      },
      {
        name: "서초구정신건강복지센터",
        tel: "02-2155-8215",
        long: 127.050721,
        lat: 37.4617702,
      },
      {
        name: "서대문구정신건강복지센터",
        tel: "02-3140-8081",
        long: 126.936364,
        lat: 37.5829197,
      },
      {
        name: "마포구정신건강복지센터",
        tel: "02-3272-4937",
        long: 126.90796,
        lat: 37.5633492,
      },
      {
        name: "동작구정신건강복지센터",
        tel: "02-820-4072",
        long: 126.975706,
        lat: 37.4836361,
      },
      {
        name: "동대문구정신건강복지센터",
        tel: "02-963-1621",
        long: 127.042731,
        lat: 37.5874443,
      },
      {
        name: "도봉구정신건강복지센터",
        tel: "02-2091-5242",
        long: 127.03877,
        lat: 37.6579655,
      },
      {
        name: "노원구정신건강복지센터",
        tel: "02-2116-4591",
        long: 127.058508,
        lat: 37.6541465,
      },
      {
        name: "금천구정신건강복지센터",
        tel: "02-3281-9314",
        long: 126.897032,
        lat: 37.4702039,
      },
      {
        name: "구로구정신건강복지센터",
        tel: "02-861-2284",
        long: 126.886638,
        lat: 37.503198,
      },
      {
        name: "광진구정신건강복지센터",
        tel: "02-450-1895",
        long: 127.087127,
        lat: 37.5593997,
      },
      {
        name: "관악구정신건강복센터",
        tel: "02-879-4911",
        long: 126.951502,
        lat: 37.4782404,
      },
      {
        name: "강서구정신건강복지센터",
        tel: "02-2600-5926",
        long: 126.868313,
        lat: 37.5496161,
      },
      {
        name: "강북구정신건강복지센터",
        tel: "02-901-7600",
        long: 126.868313,
        lat: 37.5496161,
      },
      {
        name: "강동구정신건강복지센터",
        tel: "02-471-3223",
        long: 127.125546,
        lat: 37.5292183,
      },
      {
        name: "강남구정신건강복지센터",
        tel: "02-2226-0344",
        long: 127.08465,
        lat: 37.4901148,
      },
    ];

    let closestLocation;
    let closestDist = 9999999;
    locations.forEach((location) => {
      const dLong = location.long - testStatus.position.long;
      const dLat = location.lat - testStatus.position.lat;
      const dist = dLong ** 2 + dLat ** 2;
      if (dist < closestDist) {
        closestDist = dist;
        closestLocation = location;
      }
    });

    const a = document.createElement("a");
    a.innerText = closestLocation.name;
    a.href = `tel:${closestLocation.tel}`;
    a.onclick = ()=>{
      gtag("event", "click_closest_location", {"event_name": "eventName"});
    };

    gtag("event", "view_closest_location", {"event_name": "eventName"});

    return [p, a];
  }),
  new Test.Result("그거 아시나요?", () => {
    const p = document.createElement("p");

    const ageLevel = [
      "13~19세",
      "20~29세",
      "30~39세",
      "40~49세",
      "50~59세",
      "60세 이상",
    ]

    const suicideReason = [
        [
            [
                ["성적, 진학 문제", 35.21],
                ["질환, 우울감, 장애", 22],
                ["외로움, 고독", 11.51],
            ],
            [
                ["질환, 우울감, 장애", 31.75],
                ["경제적 어려움", 22.56],
                ["직장 문제", 14.55],
            ],
            [
                ["경제적 어려움", 37.98],
                ["질환, 우울감, 장애", 23.86],
                ["직장 문제", 20.46],
            ],
            [
                ["경제적 어려움", 41.3],
                ["질환, 우울감, 장애", 21.03],
                ["직장 문제", 15.25],
            ],
            [
                ["경제적 어려움", 41.81],
                ["질환, 우울감, 장애", 21.72],
                ["가정 불화", 10.89],
            ],
            [
                ["질환, 우울감, 장애", 36.83],
                ["경제적 어려움", 36.69],
                ["외로움, 고독", 11.91],
            ],
        ],
        [
          [
            ["질환, 우울감, 장애", 40.25],
            ["성적, 진학 문제", 28.6],
            ["외로움, 고독", 11.11],
          ],
          [
            ["질환, 우울감, 장애", 39.64],
            ["직장 문제", 27.54],
            ["경제적 어려움", 9.92],
          ],
          [
            ["질환, 우울감, 장애", 34.24],
            ["경제적 어려움", 22.13],
            ["직장 문제", 16.66],
          ],
          [
            ["질환, 우울감, 장애", 35.01],
            ["경제적 어려움", 25.84],
            ["가정불화", 18.68],
          ],
          [
            ["질환, 우울감, 장애", 36.07],
            ["경제적 어려움", 31.51],
            ["가정불화", 10.77],
          ],
          [
            ["질환, 우울감, 장애", 51.16],
            ["경제적 어려움", 25.25],
            ["외로움, 고독", 9.67],
          ],
        ],
    ];

    p.innerText = `자살 충동을 느낀 ${ageLevel[testStatus.age]}의 ${
        ["남성", "여성"][testStatus.sex]
    }들은 다음과 같은 이유들로 자살 충동을 느꼈다고 합니다.`;

    const ul = document.createElement("ul");
    for (let i = 0; i < 3; ++i) {
        const li = document.createElement("li");
        li.innerText = `${
            suicideReason[testStatus.sex][testStatus.age][i][0]
        } : ${suicideReason[testStatus.sex][testStatus.age][i][1]}%`;
        ul.appendChild(li);
    }

    return [p, ul];
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
