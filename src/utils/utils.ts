// @ts-nocheck
/**
 * @name throttle
 * @description custom throttle function to run the function at specified interval if triggered multiple times during a specified time
// we use the variable isTimerPaused, on first click it enters the if condition as it is false, then it will skip for the
// specified time because the setTimeout will be in the callback queue and will not be able to update the isTimerPaused to false until the specified time
 * @param {*} func 
 * @param {*} delay 
 * @returns function with the correct arguments
 */
export const throttle = (func, delay = 1000) => {
  let isTimerPaused = false;
  return (...args) => {
    if (!isTimerPaused) {
      func.apply(this, args);
      isTimerPaused = true;
      setTimeout(() => {
        isTimerPaused = false;
      }, delay);
    }
  };
};

/**
 * @name debounce
 * @description custom debounce to run the function after specified interval if triggered multiple times during a specified time
 * it will aggreate the number of method calls to one
 * @param {*} func
 * @param {*} delay
 * @returns function with the correct arguments
 */
export const debounce = (func, delay = 1000) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
};

/**
 * @name loadState
 * @description method that fetches the state from local storage to maintain persistence
 * @param {*} keyName
 * @returns pre loaded state from local storage if present
 */
export const loadState = (keyName = "anchor-flow-item") => {
  try {
    const state = localStorage.getItem(keyName);
    if (state === null) {
      return undefined;
    }
    // state is in string format, parsing it to json
    return JSON.parse(state);
  } catch (err) {
    // state will undefined if nothing is found in local storage
    return undefined;
  }
};

/**
 * @name saveState
 * @description method that updates the state to local storage for persistence
 * @param {*} state
 * @param {*} keyName
 * @returns none
 */
export const saveState = (state, keyName = "anchor-flow-item") => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(keyName, serializedState);
  } catch (err) {
    console.log("localstorage write error", err);
  }
};

/**
 * @name saveXml
 * @description creates an xml file and downloads with the passed data
 * @param {*} data
 * @param {*} filename
 * @returns none
 */
export const saveXml = (data, name = "file.xml") => {
  let xmltext = data;
  let filename = name;
  let pom = document.createElement("a");
  let bb = new Blob([xmltext], { type: "text/plain" });
  pom.setAttribute("href", window.URL.createObjectURL(bb));
  pom.setAttribute("download", filename);
  pom.dataset.downloadurl = ["text/plain", pom.download, pom.href].join(":");
  pom.draggable = true;
  pom.classList.add("dragout");
  pom.click();
};

/**
 * @name decodeJwt
 * @description creates an xml file and downloads with the passed data
 * @returns decoded Jwt token
 */
export const decodeJwt = (token) => {
  const base64Url = token?.split(".")[1];
  const base64 = base64Url?.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    window
      .atob(base64 ?? "")
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );
  return JSON.parse(jsonPayload);
};

/**
 * @name isValidEmail
 * @description check value is valid email or not
 * @returns true or false
 */
export const isValidEmail = (value: string) => {
  let emailRegex = new RegExp("^[^\\s@]+@[^\\s@]+.[^\\s@]+$");
  return emailRegex.test(value);
};

/**
 * @name getRandomInt
 * @description returns a random integer between the specified values. The value is no lower than min (or the next integer greater than min if min isn't an integer), and is less than (but not equal to) max.
 * @param min
 * @param max
 * @returns random integer
 */
export const getRandomInt = (min: number = 0, max: number = 999) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
};
