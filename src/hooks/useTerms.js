import React, { useState, useEffect } from "react";
import { getTerm, getDates } from "src/libs/terms/config";
import { getAllList, getTerms } from "src/api/terms-api";

const useTerms = (name) => {
  const [list, setList] = useState(null);
  const [terms, setTerms] = useState(null);
  const [options, setOptions] = useState([]);
  const [date, setDate] = useState("");

  useEffect(() => {
    // const dates = getDates(name)
    // const date = dates[0].value
    // const term = getTerm(name, date)
    // const da = termsManager.getDates()
    // console.log(da)
    // setOptions(dates)
    // setTerms(term)
    // setDate(date)
    init();
  }, []);

  const init = async () => {
    try {
      // GET Json
      const res = await getAllList();
      const data = res[name].list;

      setList(data);

      // 옵션 설정
      const dates = data
        .map((v) => ({
          label: v.label,
          value: v.label,
        }))
        .reverse();
      setOptions(dates);

      // 지금 날짜 및 현재 Terms MD 설정
      const lastet = data.find((x) => x.latest);
      setDate(lastet.label);

      const md = await getTerms(lastet.url);
      setTerms(md);
    } catch (err) {
      console.log(err);
    }
  };

  const handleVersionChange = async (e) => {
    setDate(e.target.value);
    const selected = list.find((x) => x.label === e.target.value);
    const md = await getTerms(selected.url);
    setTerms(md);
  };

  return [terms, options, date, handleVersionChange];
};

export default useTerms;
