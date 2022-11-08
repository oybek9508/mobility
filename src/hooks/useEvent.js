import EventApi from "src/api/event-api";
import { StampInfo, Stamp1, Stamp2 } from "src/atoms/event";
import { useAtom } from "jotai";

const Api = new EventApi();

const useEvent = () => {
  const [stampInfo, setStampInfo] = useAtom(StampInfo);
  const [stamp1, setStamp1] = useAtom(Stamp1);
  const [stamp2, setStamp2] = useAtom(Stamp2);

  const initStampInfo = () => {
    setStampInfo({
      isCompletedStamp1: false,
      isCompletedStamp2: false,
    });
    setStamp1({
      data: undefined,
    });
    setStamp2({
      data: undefined,
    });
  };

  const setStampInfoValue = (key, value) => {
    setStampInfo({
      ...stampInfo,
      [key]: value,
    });
  };

  const setStampInfo1 = (data) => {
    setStamp1({
      data: data,
    });
  };
  const setStampInfo2 = (data) => {
    setStamp2({
      data: data,
    });
  };

  // 신규 가입 이벤트
  const checkEventUser = async (payload) => {
    // console.log("checkEventUser payload===== ", payload);
    try {
      const res = await Api.checkEventMember(payload);
      //   console.log("checkEventUser res====", res);
      return res;
    } catch (err) {
      console.log(`err`, err);
      return err;
    }
  };

  const putEventUser = async (payload) => {
    // console.log("putEventUser payload ===== ", payload);
    try {
      const res = await Api.putEventMember(payload);
      //   console.log("putEventUser res====", res);
      return res;
    } catch (err) {
      console.log(`err`, err);
      return err;
    }
  };

  // 도장 찍기 이벤트
  const checkStamp = async (round = 1) => {
    try {
      const res = await Api.checkEventStamp(round);
      return res;
    } catch (err) {
      console.log(`err`, err);
      return err;
    }
  };

  const createStamp = async (round, moonCode = "") => {
    try {
      const res = await Api.createEventStamp(round, { moonCode: moonCode });
      return res;
    } catch (err) {
      console.log(`err`, err);
      return err;
    }
  };

  const updateStamp = async (payload) => {
    try {
      const res = await Api.updateEventStamp(payload);
      return res;
    } catch (err) {
      console.log(`err`, err);
      return err;
    }
  };

  const completeStamp = async (payload) => {
    try {
      const res = await Api.completeEventStamp(payload);
      return res;
    } catch (err) {
      console.log(`err`, err);
      return err;
    }
  };

  // 룰렛
  const checkRoulette = async () => {
    try {
      const res = await Api.checkEventRoulette();
      return res;
    } catch (err) {
      console.log(`err`, err);
      return err;
    }
  };

  const createRoulette = async (payload) => {
    try {
      const res = await Api.createEventRoulette(payload);
      return res;
    } catch (err) {
      console.log(`err`, err);
      return err;
    }
  };

  const updateRoulette = async (payload) => {
    try {
      const res = await Api.updateEventRoulette(payload);
      return res;
    } catch (err) {
      console.log(`err`, err);
      return err;
    }
  };

  return {
    stamp1,
    setStampInfo1,
    stamp2,
    setStampInfo2,
    stampInfo,
    initStampInfo,
    setStampInfoValue,
    checkEventUser,
    putEventUser,
    checkStamp,
    createStamp,
    updateStamp,
    completeStamp,
    checkRoulette,
    createRoulette,
    updateRoulette,
  };
};

export default useEvent;
