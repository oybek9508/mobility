// 약관 임포트

// 개인정보
import privacyTerm1 from "./ver1/privacyTerm";
import privacyTerm2 from "./ver2/privacyTerm";

// 이용서비스
import serviceTerm1 from "./ver1/serviceTerm";
import serviceTerm2 from "./ver2/serviceTerm";

// 딜리버리
import deliveryTerm from "./ver1/deliveryTerm";

import operationTerm from "./ver1/operationTerm";
import marketingTerm from "./ver1/marketingTerm";
import minorTerm from "./ver1/minorTerm";

// 버전
const VERSION2 = "2022-07-29";
const VERSION1 = "2022-03-31";

// 이름
export const PRIVACY_TERM = "privacy";
export const SERVICE_TERM = "service";
export const DELIVERY_TERM = "delivery";
export const MINOR_TERM = "minor";
export const OPERATION_TERM = "operation";
export const MARKETING_TERM = "marketing";

// 폴더 버전 날짜별 관리
const VERSION_INFO = [
  {
    name: "ver2",
    date: VERSION2,
    list: [PRIVACY_TERM, SERVICE_TERM],
  },
  {
    name: "ver1",
    date: VERSION1,
    list: [
      DELIVERY_TERM,
      MARKETING_TERM,
      MINOR_TERM,
      OPERATION_TERM,
      PRIVACY_TERM,
      SERVICE_TERM,
    ],
  },
];

const TERMS_LIST = [
  // 버전2
  {
    version: VERSION2,
    name: PRIVACY_TERM,
    term: privacyTerm2,
  },
  {
    version: VERSION2,
    name: SERVICE_TERM,
    term: serviceTerm2,
  },

  // 버전1
  {
    version: VERSION1,
    name: PRIVACY_TERM,
    term: privacyTerm1,
  },
  {
    version: VERSION1,
    name: DELIVERY_TERM,
    term: deliveryTerm,
  },
  {
    version: VERSION1,
    name: SERVICE_TERM,
    term: serviceTerm1,
  },
  {
    version: VERSION1,
    name: OPERATION_TERM,
    term: operationTerm,
  },
  {
    version: VERSION1,
    name: MARKETING_TERM,
    term: marketingTerm,
  },
  {
    version: VERSION1,
    name: MINOR_TERM,
    term: minorTerm,
  },
];

const getTerms = (name) => TERMS_LIST.filter((x) => x.name === name);
export const getDates = (name) => {
  const list = VERSION_INFO.filter((x) => x.list.includes(name));

  if (list.length <= 0) return [];

  const dates = list.map((v) => ({
    label: v.date,
    value: v.date,
  }));

  console.log(dates);

  return dates;
};

export const getTerm = (name, version) => {
  const terms = getTerms(name);
  const term = terms.find((v) => v.version === version);

  return term.term;
};

// const init = () => {
// 	fetch('https://marvrus-landing-terms.s3.ap-northeast-2.amazonaws.com/list.json')
// 		.then((res) => res.json())
// 		.then((text) => console.log(text))
// }

// init()
