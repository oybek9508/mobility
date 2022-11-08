import ReactGA from "react-ga4";
ReactGA.initialize("G-RFK2WMYPS4");

export function GetValue(plaindata, key) {
  let arrData = plaindata.split(":");
  // console.log(`arrData`, arrData)
  let value = "";
  for (let i in arrData) {
    let item = arrData[i];
    if (item.indexOf(key) === 0) {
      var valLen = parseInt(item.replace(key, ""));
      value = arrData[++i].substr(0, valLen);
      break;
    }
  }
  return value;
}

export const TimeStamp = (targetDate, start = 0, end = 19) => {
  targetDate.setHours(targetDate.getHours() + 9);
  return targetDate.toISOString().replace("T", " ").substring(start, end);
};

export const InputPaymentAmountFormat = (paymentAmount) => {
  const option = {
    maximumFractionDigits: 4,
  };

  return paymentAmount.toLocaleString("ko-KR", option);
};

export const getCookie = (name) => {
  let cookie = document.cookie;

  if (document.cookie != "") {
    let cookie_array = cookie.split("; ");
    for (let index in cookie_array) {
      let cookie_name = cookie_array[index].split("=");

      if (cookie_name[0] == "openCYN") {
        return cookie_name[1];
      }
    }
  }
  return;
};

export const setCookie = (name, value, expiredays) => {
  let date = new Date();
  date.setDate(date.getDate() + expiredays);
  document.cookie =
    escape(name) + "=" + escape(value) + "; expires=" + date.toUTCString();
};

export const openInNewTab = (href) => {
  Object.assign(document.createElement("a"), {
    target: "_blank",
    rel: "noopener noreferrer",
    href: href,
  }).click();
};

export const isChild = (birthDate) => {
  const today = new Date();
  const year = today.getFullYear();
  const month =
    today.getMonth() < 9 ? "0" + (today.getMonth() + 1) : today.getMonth() + 1;
  const day = today.getDate() < 10 ? "0" + today.getDate() : today.getDate();

  const birth = birthDate.replace(/-/gi, "");

  return parseInt(year + month + day) - parseInt(birth) - 190000 < 0;
};

export const GAEventFunc = (category, eventName) => {
  ReactGA.event({
    category: category,
    action: eventName,
    label: eventName,
    nonInteraction: true,
  });
};
