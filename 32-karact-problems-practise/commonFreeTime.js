function commonFreeTime(schedules) {
  const all = schedules.flat().sort((a, b) => a[0] - b[0]);
  console.log(all);
  if (!all.length) return [];
  const merged = [all[0].slice()];
  for (let i = 1; i < all.length; i++) {
    const last = merged[merged.length - 1];
    if (all[i][0] <= last[1]) last[1] = Math.max(last[1], all[i][1]);
    else merged.push(all[i].slice());
  }
  const free = [];
  for (let i = 1; i < merged.length; i++) free.push([merged[i - 1][1], merged[i][0]]);
  return free;
}
let schedules = [
  [[1,3],[6,7]],
  [[2,4]],
  [[2,5],[9,12]],
];
console.log(commonFreeTime(schedules));
