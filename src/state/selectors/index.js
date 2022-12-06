import { getDayShort } from '@utils/Globals';

export const calculateSchedule = items => {
  const { defaultTimes, extract, currentDay, newTime, gridArray } = items;

  const day = getDayShort(currentDay);

  let newDefaultTimes = { ...defaultTimes };
  let newDefaultDayTimes = newDefaultTimes[day];

  if (extract) {
    newDefaultDayTimes = newDefaultDayTimes.filter(function(value, index) {
      return extract.indexOf(index) == -1;
    });

    if (!newTime) {
      newDefaultTimes[day] = newDefaultDayTimes;
    }
  }

  if (newTime) {
    let newTimeBlock = [...newDefaultDayTimes, newTime];
    newTimeBlock = newTimeBlock.filter((thing, index, self) => self.findIndex(t => t.start === thing.start && t.end === thing.end) === index);
    newTimeBlock.sort((a, b) => (a.start < b.start) ? -1 : ((a.start > b.start) ? 1 : 0));
    
    newDefaultTimes[day] = newTimeBlock;

    gridArray.forEach(function (hasTimes, index) {
      if (hasTimes && index !== currentDay) {
        const day2 = getDayShort(index);
        const newDefaultDayTimesOther = newDefaultTimes[day2];
        let newTimeBlockOther = [...newDefaultDayTimesOther, newTime];

        newTimeBlockOther = newTimeBlockOther.filter((thing, index, self) => self.findIndex(t => t.start === thing.start && t.end === thing.end) === index);

        newTimeBlockOther.sort((a, b) => (a.start < b.start) ? -1 : ((a.start > b.start) ? 1 : 0));
        newDefaultTimes[day2] = newTimeBlockOther;
      }
    });
  }

  return newDefaultTimes;
}
