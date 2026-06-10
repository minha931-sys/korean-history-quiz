const ANCIENT_QUESTIONS = [

{
    id:1,
    category:"고조선·삼국",
    difficulty:"medium",

    question:"고조선을 건국한 것으로 전해지는 인물은?",

    choices:[
        "단군",
        "주몽",
        "온조",
        "박혁거세"
    ],

    answer:0,

    explanation:
    "고조선은 단군이 건국한 것으로 전해진다."
},

{
    id:2,
    category:"고조선·삼국",
    difficulty:"medium",

    question:"다음 중 고조선의 법으로 알려진 것은?",

    choices:[
        "8조법",
        "경국대전",
        "대전회통",
        "속대전"
    ],

    answer:0,

    explanation:
    "고조선에는 8조법이 있었다고 전해진다."
},

{
    id:3,
    category:"고조선·삼국",
    difficulty:"medium",

    question:"백제를 건국한 인물은?",

    choices:[
        "주몽",
        "온조",
        "박혁거세",
        "김수로"
    ],

    answer:1,

    explanation:
    "온조는 한강 유역에 백제를 건국하였다."
},

{
    id:4,
    category:"고조선·삼국",
    difficulty:"medium",

    question:"신라를 건국한 인물은?",

    choices:[
        "주몽",
        "온조",
        "박혁거세",
        "김수로"
    ],

    answer:2,

    explanation:
    "박혁거세는 신라의 시조로 알려져 있다."
},

{
    id:5,
    category:"고조선·삼국",
    difficulty:"medium",

    question:"고구려를 건국한 인물은?",

    choices:[
        "주몽",
        "온조",
        "김수로",
        "박혁거세"
    ],

    answer:0,

    explanation:
    "주몽은 고구려를 건국하였다."
},

{
    id:6,
    category:"고조선·삼국",
    difficulty:"medium",

    question:"다음 중 백제의 문화유산으로 유명한 것은?",

    choices:[
        "금동대향로",
        "첨성대",
        "석굴암",
        "팔만대장경"
    ],

    answer:0,

    explanation:
    "백제 금동대향로는 백제 문화의 우수성을 보여준다."
},

{
    id:7,
    category:"고조선·삼국",
    difficulty:"medium",

    question:"고구려의 전성기를 이끈 왕은?",

    choices:[
        "광개토대왕",
        "법흥왕",
        "무왕",
        "진흥왕"
    ],

    answer:0,

    explanation:
    "광개토대왕은 영토를 크게 확장하였다."
},

{
    id:8,
    category:"고조선·삼국",
    difficulty:"medium",

    question:"한강 유역을 확보하여 신라의 삼국 통일 기반을 마련한 왕은?",

    choices:[
        "진흥왕",
        "무열왕",
        "문무왕",
        "성덕왕"
    ],

    answer:0,

    explanation:
    "진흥왕은 한강 유역을 확보하고 영토를 크게 확장하여 신라 발전의 기반을 마련하였다."
},

{
    id:9,
    category:"고조선·삼국",
    difficulty:"hard",

    question:"다음 중 고구려의 특징으로 옳은 것은?",

    choices:[
        "산성을 중심으로 방어 체계를 구축하였다.",
        "바다 무역이 국가 경제의 중심이었다.",
        "불교를 가장 늦게 받아들였다.",
        "한강 유역을 끝까지 유지하였다."
    ],

    answer:0,

    explanation:
    "고구려는 산성을 활용한 방어 체계가 발달하였다."
},

{
    id:10,
    category:"고조선·삼국",
    difficulty:"hard",

    question:"다음 중 신라의 화랑도에 대한 설명으로 옳은 것은?",

    choices:[
        "청소년 수련 조직이었다.",
        "왕권을 약화시키기 위해 만들어졌다.",
        "고려에서 처음 등장하였다.",
        "불교를 금지하였다."
    ],

    answer:0,

    explanation:
    "화랑도는 신라의 청소년 수련 조직이었다."
},

{
    id:11,
    category:"고조선·삼국",
    difficulty:"hard",

    question:"백제의 전성기를 이끈 왕은?",

    choices:[
        "근초고왕",
        "무령왕",
        "성왕",
        "의자왕"
    ],

    answer:0,

    explanation:
    "근초고왕 때 백제는 전성기를 맞이하였다."
},

{
    id:12,
    category:"고조선·삼국",
    difficulty:"hard",

    question:"다음 중 삼국 중 가장 먼저 불교를 공인한 나라는?",

    choices:[
        "고구려",
        "백제",
        "신라",
        "가야"
    ],

    answer:0,

    explanation:
    "고구려는 소수림왕 때 불교를 공인하였다."
},

{
    id:13,
    category:"고조선·삼국",
    difficulty:"hard",

    question:"고구려의 율령 반포와 불교 수용을 추진한 왕은?",

    choices:[
        "소수림왕",
        "광개토대왕",
        "장수왕",
        "동천왕"
    ],

    answer:0,

    explanation:
    "소수림왕은 국가 체제를 정비하였다."
},

{
    id:14,
    category:"고조선·삼국",
    difficulty:"hard",

    question:"다음 중 장수왕의 업적으로 옳은 것은?",

    choices:[
        "평양으로 천도하였다.",
        "사비로 천도하였다.",
        "한양으로 천도하였다.",
        "개경으로 천도하였다."
    ],

    answer:0,

    explanation:
    "장수왕은 국내성에서 평양으로 천도하였다."
},

{
    id:15,
    category:"고조선·삼국",
    difficulty:"hard",

    question:"다음 중 백제에 대한 설명으로 옳은 것은?",

    choices:[
        "일본에 불교와 선진 문화를 전파하는 데 영향을 주었다.",
        "태학을 설립하여 유학 교육을 실시하였다.",
        "화랑도를 통해 인재를 양성하였다.",
        "천리장성을 축조하였다."
    ],

    answer:0,

    explanation:
    "백제는 일본에 불교와 선진 기술, 문화를 전파하는 데 중요한 역할을 하였다."
},
{
    id:5001,
    category:"고조선·삼국",
    difficulty:"easy",

    question:"다음 설명에 해당하는 국가는?\n- 단군왕검이 건국한 것으로 전해진다.",

    choices:[
        "고조선",
        "고구려",
        "백제",
        "신라"
    ],

    answer:0,

    explanation:
    "고조선은 단군왕검이 건국하였다고 전해진다."
},
{
    id: 5002,
    category: "고조선·삼국",
    difficulty: "easy",

    question: "광개토대왕이 활약한 국가는?",

    choices: [
        "백제",
        "신라",
        "고구려",
        "가야"
    ],

    answer: 2,

    explanation: "광개토대왕은 고구려의 전성기를 이끈 왕이다."
},
{
    id: 5003,
    category: "고조선·삼국",
    difficulty: "medium",

    question: "다음 업적을 남긴 왕은?\n- 한강 유역 확보\n- 백제 전성기",

    choices: [
        "근초고왕",
        "무령왕",
        "성왕",
        "온조왕"
    ],

    answer: 0,

    explanation: "근초고왕은 백제의 전성기를 이끌었다."
},
{
    id: 5004,
    category: "고조선·삼국",
    difficulty: "medium",

    question: "신라의 화백회의와 가장 관련 깊은 것은?",

    choices: [
        "귀족 회의",
        "과거제",
        "음서제",
        "정방"
    ],

    answer: 0,

    explanation: "화백회의는 신라 귀족들의 합의 기구였다."
},
{
    id: 5005,
    category: "고조선·삼국",
    difficulty: "medium",

    question: "다음 설명에 해당하는 제도는?\n- 신라 사회의 신분 제도",

    choices: [
        "과거제",
        "골품제",
        "음서제",
        "대동법"
    ],

    answer: 1,

    explanation: "골품제는 신라의 대표적인 신분 제도이다."
},
{
    id: 5006,
    category: "고조선·삼국",
    difficulty: "medium",

    question: "고구려가 수나라의 침략을 물리친 전투는?",

    choices: [
        "황산벌 전투",
        "관산성 전투",
        "살수대첩",
        "기벌포 전투"
    ],

    answer: 2,

    explanation: "을지문덕이 살수대첩에서 수나라 군대를 격파하였다."
},
{
    id:5007,
    category:"고조선·삼국",
    difficulty:"medium",

    question:"다음 설명에 해당하는 왕의 업적으로 옳은 것은?\n- 광개토대왕의 뒤를 이어 고구려의 전성기를 이끌었다.",

    choices:[
        "평양 천도",
        "사비 천도",
        "한강 유역 확보",
        "화백회의 정비"
    ],

    answer:0,

    explanation:
    "장수왕은 국내성에서 평양으로 천도하고 남진 정책을 추진하였다."
},
{
    id: 5008,
    category: "고조선·삼국",
    difficulty: "medium",

    question: "백제가 일본에 전해준 문화로 가장 적절한 것은?",

    choices: [
        "불교와 한자 문화",
        "성리학",
        "천도교",
        "한글"
    ],

    answer: 0,

    explanation: "백제는 일본에 불교와 선진 문화를 전파하였다."
},
{
    id: 5009,
    category: "고조선·삼국",
    difficulty: "medium",

    question: "신라가 삼국 통일을 이룰 수 있었던 배경은?",

    choices: [
        "당과의 동맹",
        "왜와의 동맹",
        "몽골의 지원",
        "원나라의 지원"
    ],

    answer: 0,

    explanation: "신라는 당과 연합하여 백제와 고구려를 멸망시켰다."
},
{
    id:5010,
    category:"고조선·삼국",
    difficulty:"medium",

    question:"고조선의 8조법 내용을 통해 알 수 있는 사회 모습으로 가장 적절한 것은?",

    choices:[
        "사유 재산을 중시하였다.",
        "신분 차별이 없었다.",
        "불교가 널리 퍼졌다.",
        "과거제를 시행하였다."
    ],

    answer:0,

    explanation:
    "8조법에는 절도와 관련된 내용이 있어 사유 재산을 중요하게 여겼음을 알 수 있다."
},
{
    id: 5011,
    category: "고조선·삼국",
    difficulty: "hard",

    question: "다음 사건의 결과로 옳은 것은?\n- 백제 성왕 전사",

    choices: [
        "관산성 전투에서 신라 승리",
        "고구려 멸망",
        "삼국 통일",
        "대가야 멸망"
    ],

    answer: 0,

    explanation: "관산성 전투에서 성왕이 전사하며 신라가 우위를 점하였다."
},
{
    id: 5012,
    category: "고조선·삼국",
    difficulty: "hard",

    question: "광개토대왕릉비를 통해 알 수 있는 사실은?",

    choices: [
        "고구려의 영토 확장",
        "백제 멸망",
        "삼국 통일",
        "발해 건국"
    ],

    answer: 0,

    explanation: "광개토대왕릉비는 고구려의 정복 활동을 보여준다."
},
{
    id: 5013,
    category: "고조선·삼국",
    difficulty: "hard",

    question: "다음 정책의 목적은?\n- 율령 반포",

    choices: [
        "국가 체제 정비",
        "불교 억압",
        "무역 확대",
        "신분 폐지"
    ],

    answer: 0,

    explanation: "율령 반포는 중앙집권 국가 체제를 정비하기 위한 것이었다."
},
{
    id: 5014,
    category: "고조선·삼국",
    difficulty: "hard",

    question: "삼국의 불교 수용 순서로 옳은 것은?",

    choices: [
        "고구려→백제→신라",
        "신라→백제→고구려",
        "백제→고구려→신라",
        "고구려→신라→백제"
    ],

    answer: 0,

    explanation: "불교는 고구려, 백제, 신라 순으로 수용되었다."
},
{
    id:5015,
    category:"고조선·삼국",
    difficulty:"hard",

    question:"진흥왕의 업적으로 옳은 것은?",

    choices:[
        "한강 유역 확보",
        "사비 천도",
        "관산성 전투 전사",
        "태학 설립"
    ],

    answer:0,

    explanation:
    "진흥왕은 한강 유역을 확보하고 신라의 영토를 크게 확장하였다."
},
{
    id: 5016,
    category: "고조선·삼국",
    difficulty: "hard",

    question: "을지문덕의 활동과 가장 관련 깊은 전쟁은?",

    choices: [
        "나당전쟁",
        "고구려-수 전쟁",
        "임진왜란",
        "병자호란"
    ],

    answer: 1,

    explanation: "을지문덕은 고구려-수 전쟁에서 활약하였다."
},
{
    id: 5017,
    category: "고조선·삼국",
    difficulty: "hard",

    question: "다음 인물과 관련된 설명으로 옳은 것은?\n- 김춘추",

    choices: [
        "나당 동맹 추진",
        "백제 건국",
        "고구려 건국",
        "발해 건국"
    ],

    answer: 0,

    explanation: "김춘추는 나당 동맹을 추진하여 삼국 통일의 기반을 마련했다."
},
{
    id: 5018,
    category: "고조선·삼국",
    difficulty: "hard",

    question: "삼국이 불교를 수용한 공통 목적은?",

    choices: [
        "왕권 강화",
        "상업 진흥",
        "과거제 실시",
        "무역 확대"
    ],

    answer: 0,

    explanation: "불교는 왕권 강화와 중앙집권 체제 정비에 활용되었다."
},
{
    id: 5019,
    category: "고조선·삼국",
    difficulty: "hard",

    question: "다음 사건 이후 나타난 변화는?\n- 신라의 삼국 통일",

    choices: [
        "불국사·석굴암 등 통일신라 문화 발전",
        "훈민정음 창제",
        "고려 건국",
        "조선 건국"
    ],

    answer: 0,

    explanation: "삼국 통일 이후 민족 문화가 크게 발전하였다."
},
{
    id: 5020,
    category: "고조선·삼국",
    difficulty: "hard",

    question: "고구려, 백제, 신라의 공통점으로 옳은 것은?",

    choices: [
        "율령 반포와 불교 수용",
        "과거제 실시",
        "성리학 수용",
        "훈민정음 사용"
    ],

    answer: 0,

    explanation: "삼국은 모두 율령을 반포하고 불교를 수용하였다."
},{
id: 5021,
category: "고조선·삼국",
difficulty: "hard",
question: "고구려가 태학 설립, 율령 반포, 불교 공인을 추진한 공통 목적은?",
choices: [
"중앙집권 체제 정비",
"해상 무역 확대",
"귀족 세력 해체",
"신분제 폐지"
],
answer: 0,
explanation: "소수림왕은 율령 반포, 불교 공인, 태학 설립을 통해 국가 통치 체계를 정비하고 왕권을 강화하였다."
},

{
id: 5022,
category: "고조선·삼국",
difficulty: "hard",
question: "장수왕이 평양 천도를 단행한 이유로 가장 적절한 것은?",
choices: [
"남진 정책 추진에 유리했기 때문",
"왜의 침입을 피하기 위해",
"불교 세력을 억제하기 위해",
"백제와 동맹을 맺기 위해"
],
answer: 0,
explanation: "평양은 한반도 중부 진출과 대외 교류에 유리하여 장수왕의 남진 정책 기반이 되었다."
},

{
id: 5023,
category: "고조선·삼국",
difficulty: "hard",
question: "근초고왕 시기 백제의 성장 배경으로 가장 적절한 것은?",
choices: [
"한강 유역 장악과 활발한 대외 교류",
"과거제 실시",
"발해와의 연합",
"몽골과의 교역"
],
answer: 0,
explanation: "근초고왕은 마한 세력을 통합하고 한강 유역을 기반으로 대외 교류를 확대하였다."
},

{
id: 5024,
category: "고조선·삼국",
difficulty: "hard",
question: "진흥왕이 한강 유역을 확보한 결과로 가장 적절한 것은?",
choices: [
"중국과의 교류 확대 및 국력 성장",
"고려 건국",
"삼국 통일 완성",
"발해 건국"
],
answer: 0,
explanation: "한강 유역 확보는 경제력과 교통상의 이점을 제공하여 신라 성장의 중요한 기반이 되었다."
},

{
id: 5025,
category: "고조선·삼국",
difficulty: "hard",
question: "살수대첩의 역사적 의미로 가장 적절한 것은?",
choices: [
"수나라 쇠퇴를 가속화하였다.",
"당나라 건국의 직접 원인이 되었다.",
"삼국 통일을 완성하였다.",
"백제 부흥 운동을 촉진하였다."
],
answer: 0,
explanation: "살수대첩은 수나라에 막대한 피해를 입혀 국력 약화와 멸망에 영향을 주었다."
},

{
id: 5026,
category: "고조선·삼국",
difficulty: "hard",
question: "관산성 전투 이후 삼국 관계의 변화로 가장 적절한 것은?",
choices: [
"백제가 약화되고 신라가 우위를 점하였다.",
"고구려가 멸망하였다.",
"가야가 성장하였다.",
"신라가 당과 전쟁을 벌였다."
],
answer: 0,
explanation: "관산성 전투에서 성왕이 전사하면서 백제의 국력이 약화되고 신라가 우위를 확보하였다."
},

{
id: 5027,
category: "고조선·삼국",
difficulty: "hard",
question: "화랑도가 신라 사회에서 수행한 역할로 가장 적절한 것은?",
choices: [
"국가 지도층 양성",
"세금 징수",
"외교 사절 파견",
"무역 관리"
],
answer: 0,
explanation: "화랑도는 청소년 교육과 인재 양성을 담당하며 국가 지도층 배출에 기여하였다."
},

{
id: 5028,
category: "고조선·삼국",
difficulty: "hard",
question: "나당 동맹 체결의 직접적 목적은?",
choices: [
"백제와 고구려 공격",
"왜 정벌",
"발해 건국",
"가야 통합"
],
answer: 0,
explanation: "신라는 당과 협력하여 백제와 고구려를 공격하기 위해 나당 동맹을 체결하였다."
},

{
id: 5029,
category: "고조선·삼국",
difficulty: "hard",
question: "삼국이 모두 율령을 반포한 이유로 가장 적절한 것은?",
choices: [
"국가 운영 체계 정비",
"불교 억제",
"대외 무역 확대",
"왕권 약화"
],
answer: 0,
explanation: "율령은 중앙집권 국가 운영의 기준을 마련하고 왕권을 강화하기 위한 제도였다."
},

{
    id:5030,
    category:"고조선·삼국",
    difficulty:"hard",

    question:"삼국 시대에 불교가 국가적으로 수용된 이후 나타난 변화로 가장 적절한 것은?",

    choices:[
        "왕권 강화와 국가 통합에 활용되었다.",
        "신분제가 폐지되었다.",
        "과거제가 시행되었다.",
        "귀족 세력이 완전히 사라졌다."
    ],

    answer:0,

    explanation:
    "불교는 왕권 강화와 중앙집권 체제 확립을 위한 사상적 기반으로 활용되었다."
},{
id: 5031,
category: "고조선·삼국",
difficulty: "hard",
question: "고구려가 천리장성을 축조한 가장 큰 목적은?",
choices: [
"당나라의 침략에 대비하기 위해",
"왜의 침략을 막기 위해",
"몽골의 침입에 대비하기 위해",
"신라 정복을 준비하기 위해"
],
answer: 0,
explanation: "고구려는 수나라 멸망 이후 강성해진 당나라의 군사적 위협에 대응하기 위해 천리장성을 축조하였다."
},


{
id: 5033,
category: "고조선·삼국",
difficulty: "hard",
question: "신라가 대가야를 정복한 결과로 가장 적절한 것은?",
choices: [
"낙동강 유역 대부분을 장악하였다.",
"삼국 통일을 완성하였다.",
"평양으로 천도하였다.",
"당나라를 정복하였다."
],
answer: 0,
explanation: "562년 진흥왕은 대가야를 정복하였다. 이를 통해 신라는 낙동강 유역 대부분을 확보하고 국력을 강화하였다."
},

{
id: 5034,
category: "고조선·삼국",
difficulty: "hard",
question: "통일신라 문화의 특징으로 가장 적절한 것은?",
choices: [
"불교 예술의 발전",
"성리학 국가화",
"과거제 시행",
"훈민정음 창제"
],
answer: 0,
explanation: "통일신라 시기에는 불국사, 석굴암 등 뛰어난 불교 문화유산이 만들어졌다."
},

{
id: 5035,
category: "고조선·삼국",
difficulty: "hard",
question: "광개토대왕의 정복 활동이 갖는 의미로 가장 적절한 것은?",
choices: [
"고구려 전성기의 기반 마련",
"삼국 통일 완성",
"발해 건국",
"고려 건국"
],
answer: 0,
explanation: "광개토대왕은 만주와 한반도 북부까지 영토를 확장하며 고구려 전성기의 토대를 마련하였다."
},

{
id: 5036,
category: "고조선·삼국",
difficulty: "hard",
question: "나당 전쟁의 결과로 가장 적절한 것은?",
choices: [
"신라가 당 세력을 축출하였다.",
"고구려가 부흥하였다.",
"백제가 재건되었다.",
"왜가 한반도를 지배하였다."
],
answer: 0,
explanation: "신라는 나당 전쟁에서 승리하여 당 세력을 한반도에서 몰아내고 삼국 통일을 완성하였다."
},

{
id: 5037,
category: "고조선·삼국",
difficulty: "hard",
question: "고구려와 수나라가 반복적으로 충돌한 근본 원인으로 가장 적절한 것은?",
choices: [
"수나라의 대외 팽창 정책",
"불교 교리 갈등",
"무역 분쟁",
"왕위 계승 문제"
],
answer: 0,
explanation: "수나라는 동아시아를 통합하려는 팽창 정책을 추진하였고, 고구려는 이에 강하게 저항하였다."
},

{
id: 5038,
category: "고조선·삼국",
difficulty: "hard",
question: "백제 멸망 이후 전개된 움직임으로 가장 적절한 것은?",
choices: [
"백제 부흥 운동",
"고려 건국",
"발해 건국",
"훈민정음 창제"
],
answer: 0,
explanation: "복신, 도침 등을 중심으로 백제 부흥 운동이 전개되었으나 결국 실패하였다."
},

{
id: 5039,
category: "고조선·삼국",
difficulty: "hard",
question: "발해 건국의 역사적 의미로 가장 적절한 것은?",
choices: [
"고구려 계승 국가의 성립",
"삼국 통일 완성",
"고려 건국",
"조선 건국"
],
answer: 0,
explanation: "발해는 대조영이 고구려 유민과 말갈 세력을 중심으로 건국하였으며 고구려 계승 의식을 보여준다."
},

{
id: 5040,
category: "고조선·삼국",
difficulty: "hard",
question: "다음 국가 발전 과정에서 공통적으로 나타난 현상은?\n- 고구려\n- 백제\n- 신라",

choices: [
    "중앙집권 체제 발전",
    "과거제 시행",
    "성리학 수용",
    "훈민정음 창제"
],

answer: 0,

explanation: "삼국은 모두 율령 반포와 왕권 강화를 통해 중앙집권 국가 체제를 발전시켰다."

}
]