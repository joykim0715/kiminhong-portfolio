type IntroTask = () => void;

let introState: "idle" | "running" | "done" = "idle";
const queued: IntroTask[] = [];

export function getIntroState() {
  return introState;
}

export function beginIntro() {
  introState = "running";
}

export function afterIntro(task: IntroTask) {
  if (introState === "done") {
    task();
    return;
  }
  queued.push(task);
}

export function markIntroReady() {
  if (introState === "done") return;
  introState = "done";
  while (queued.length > 0) {
    queued.shift()?.();
  }
}
