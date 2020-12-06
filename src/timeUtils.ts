type CustomTime = {
    hour: number
    minute: number
}

const MINUTE = 1000 * 60

function getRandomTime(start: CustomTime, end: CustomTime, durationInMinutes = 30): CustomTime {
    const minutesAvailable = (end.hour - start.hour) * 60 - start.minute + end.minute - durationInMinutes;
    const startDelay = Math.floor(Math.random() * minutesAvailable);
    const hourDelay = Math.floor(startDelay / 60)
    const minutedelay = startDelay % 60;
    let hour = start.hour + hourDelay;
    let minute = start.minute + minutedelay;
    if (minute > 60) {
        minute = minute % 60;
        hour += 1
    }
    console.log("Generating random time", { hour, minute })
    return { hour, minute }
}

function customTimeCanBeToday(time: CustomTime) {
    const date = new Date();
    if (date.getHours() > time.hour) return false
    if (date.getHours() === time.hour && date.getMinutes() >= time.minute) return false;
    return true
}

function createDateTimeFromCustomTime(time: CustomTime, incrementDay = false) {
    const date = new Date();
    date.setHours(time.hour);
    date.setMinutes(time.minute);
    if (incrementDay) {
        date.setDate(date.getDate() + 1)
    }
    return date;
}

export function generateRandomTime(start: CustomTime, end: CustomTime, forceIncrement = false) {
    let randomTime = getRandomTime(start, end)
    const nextDay = forceIncrement || !customTimeCanBeToday(end)
    let iter = 0
    while (!customTimeCanBeToday(randomTime) && !nextDay && iter++ < 50) {
        randomTime = getRandomTime(start, end);
    }

    return createDateTimeFromCustomTime(randomTime, nextDay || iter >= 50)
}

export function waitUntilTime(time: Date): Promise<null> {
    console.log("setting timer for ", { time })
    return new Promise<null>((res, rej) => {
        setTimeout(() => {
            res(null);
        }, time.getTime() - new Date().getTime())
    })
}

//"use strict";
// Object.defineProperty(exports, "__esModule", { value: true });
// exports.waitUntilTime = exports.generateRandomTime = void 0;
// const MINUTE = 1000 * 60;
// function getRandomTime(start, end, durationInMinutes = 30) {
//     const minutesAvailable = (end.hour - start.hour) * 60 - start.minute + end.minute - durationInMinutes;
//     const startDelay = Math.floor(Math.random() * minutesAvailable);
//     const hourDelay = Math.floor(startDelay / 60);
//     const minutedelay = startDelay % 60;
//     let hour = start.hour + hourDelay;
//     let minute = start.minute + minutedelay;
//     if (minute > 60) {
//         minute = minute % 60;
//         hour += 1;
//     }
//     console.log("Generating random time", { hour, minute });
//     return { hour, minute };
// }
// function customTimeCanBeToday(time) {
//     const date = new Date();
//     if (date.getHours() > time.hour)
//         return false;
//     if (date.getHours() === time.hour && date.getMinutes() >= time.minute)
//         return false;
//     return true;
// }
// function createDateTimeFromCustomTime(time, incrementDay = false) {
//     const date = new Date();
//     date.setHours(time.hour);
//     date.setMinutes(time.minute);
//     if (incrementDay) {
//         date.setDate(date.getDate() + 1);
//     }
//     return date;
// }
// function generateRandomTime(start, end, forceIncrement = false) {
//     let randomTime = getRandomTime(start, end);
//     const nextDay = forceIncrement || !customTimeCanBeToday(end);
//     while (!customTimeCanBeToday(randomTime) && !nextDay) {
//         randomTime = getRandomTime(start, end);
//     }
//     return createDateTimeFromCustomTime(randomTime, nextDay);
// }
// exports.generateRandomTime = generateRandomTime;
// function waitUntilTime(time) {
//     console.log("setting timer for ", { time });
//     return new Promise((res, rej) => {
//         setTimeout(() => {
//             res(null);
//         }, time.getTime() - new Date().getTime());
//     });
// }
// exports.waitUntilTime = waitUntilTime;


