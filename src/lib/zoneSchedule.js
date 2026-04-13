const FIBRES_COLOR = '#c89a5b';
const CONTAINERS_COLOR = '#8fd6e1';

function toEntry(iso, label, stream) {
  return { iso, label, stream };
}

function buildAlternatingEntries(dates, firstStream) {
  let current = firstStream;
  return dates.map(({ iso, label }) => {
    const entry = toEntry(iso, label, current);
    current = current === 'fibres' ? 'containers' : 'fibres';
    return entry;
  });
}

export const RECYCLING_META = {
  fibres: {
    label: 'Fibres',
    color: FIBRES_COLOR,
    description: 'Brown week',
  },
  containers: {
    label: 'Containers',
    color: CONTAINERS_COLOR,
    description: 'Blue week',
  },
};

export const OFFICIAL_CALENDAR_IMAGES = {
  'Day 1 Garbage Collection Zone': 'https://www.cornerbrook.com/wp-content/uploads/2025/12/Day-1.png',
  'Day 2 Garbage Collection Zone': 'https://www.cornerbrook.com/wp-content/uploads/2025/12/Day-2.png',
  'Day 3 Garbage Collection Zone': 'https://www.cornerbrook.com/wp-content/uploads/2025/12/Day-3.png',
  'Day 4 Garbage Collection Zone': 'https://www.cornerbrook.com/wp-content/uploads/2025/12/Day-4.png',
  'Day 5 Garbage Collection Zone': 'https://www.cornerbrook.com/wp-content/uploads/2025/12/Day-5.png',
};

export const ZONE_SCHEDULES = {
  'Day 1 Garbage Collection Zone': {
    dates: buildAlternatingEntries([
      { iso: '2026-04-13', label: 'Mon. Apr. 13, 2026' },
      { iso: '2026-04-20', label: 'Mon. Apr. 20, 2026' },
      { iso: '2026-04-27', label: 'Mon. Apr. 27, 2026' },
      { iso: '2026-05-04', label: 'Mon. May. 4, 2026' },
      { iso: '2026-05-11', label: 'Mon. May. 11, 2026' },
      { iso: '2026-05-19', label: 'Tue. May. 19, 2026' },
      { iso: '2026-05-26', label: 'Tue. May. 26, 2026' },
      { iso: '2026-06-02', label: 'Tue. Jun. 2, 2026' },
      { iso: '2026-06-09', label: 'Tue. Jun. 9, 2026' },
      { iso: '2026-06-16', label: 'Tue. Jun. 16, 2026' },
      { iso: '2026-06-23', label: 'Tue. Jun. 23, 2026' },
      { iso: '2026-06-30', label: 'Tue. Jun. 30, 2026' },
      { iso: '2026-07-08', label: 'Wed. Jul. 8, 2026' },
      { iso: '2026-07-15', label: 'Wed. Jul. 15, 2026' },
      { iso: '2026-07-22', label: 'Wed. Jul. 22, 2026' },
      { iso: '2026-07-29', label: 'Wed. Jul. 29, 2026' },
      { iso: '2026-08-05', label: 'Wed. Aug. 5, 2026' },
      { iso: '2026-08-12', label: 'Wed. Aug. 12, 2026' },
      { iso: '2026-08-19', label: 'Wed. Aug. 19, 2026' },
      { iso: '2026-08-26', label: 'Wed. Aug. 26, 2026' },
      { iso: '2026-09-02', label: 'Wed. Sep. 2, 2026' },
      { iso: '2026-09-10', label: 'Thu. Sep. 10, 2026' },
      { iso: '2026-09-17', label: 'Thu. Sep. 17, 2026' },
      { iso: '2026-09-24', label: 'Thu. Sep. 24, 2026' },
      { iso: '2026-10-02', label: 'Fri. Oct. 2, 2026' },
      { iso: '2026-10-09', label: 'Fri. Oct. 9, 2026' },
      { iso: '2026-10-19', label: 'Mon. Oct. 19, 2026' },
      { iso: '2026-10-26', label: 'Mon. Oct. 26, 2026' },
      { iso: '2026-11-02', label: 'Mon. Nov. 2, 2026' },
      { iso: '2026-11-09', label: 'Mon. Nov. 9, 2026' },
      { iso: '2026-11-17', label: 'Tue. Nov. 17, 2026' },
      { iso: '2026-11-24', label: 'Tue. Nov. 24, 2026' },
      { iso: '2026-12-01', label: 'Tue. Dec. 1, 2026' },
      { iso: '2026-12-08', label: 'Tue. Dec. 8, 2026' },
      { iso: '2026-12-15', label: 'Tue. Dec. 15, 2026' },
      { iso: '2026-12-22', label: 'Tue. Dec. 22, 2026' },
      { iso: '2026-12-31', label: 'Thu. Dec. 31, 2026' },
    ], 'containers'),
  },
  'Day 2 Garbage Collection Zone': {
    dates: buildAlternatingEntries([
      { iso: '2026-04-14', label: 'Tue. Apr. 14, 2026' },
      { iso: '2026-04-21', label: 'Tue. Apr. 21, 2026' },
      { iso: '2026-04-28', label: 'Tue. Apr. 28, 2026' },
      { iso: '2026-05-05', label: 'Tue. May. 5, 2026' },
      { iso: '2026-05-12', label: 'Tue. May. 12, 2026' },
      { iso: '2026-05-20', label: 'Wed. May. 20, 2026' },
      { iso: '2026-05-27', label: 'Wed. May. 27, 2026' },
      { iso: '2026-06-03', label: 'Wed. Jun. 3, 2026' },
      { iso: '2026-06-10', label: 'Wed. Jun. 10, 2026' },
      { iso: '2026-06-17', label: 'Wed. Jun. 17, 2026' },
      { iso: '2026-06-24', label: 'Wed. Jun. 24, 2026' },
      { iso: '2026-07-02', label: 'Thu. Jul. 2, 2026' },
      { iso: '2026-07-09', label: 'Thu. Jul. 9, 2026' },
      { iso: '2026-07-16', label: 'Thu. Jul. 16, 2026' },
      { iso: '2026-07-23', label: 'Thu. Jul. 23, 2026' },
      { iso: '2026-07-30', label: 'Thu. Jul. 30, 2026' },
      { iso: '2026-08-06', label: 'Thu. Aug. 6, 2026' },
      { iso: '2026-08-13', label: 'Thu. Aug. 13, 2026' },
      { iso: '2026-08-20', label: 'Thu. Aug. 20, 2026' },
      { iso: '2026-08-27', label: 'Thu. Aug. 27, 2026' },
      { iso: '2026-09-03', label: 'Thu. Sep. 3, 2026' },
      { iso: '2026-09-11', label: 'Fri. Sep. 11, 2026' },
      { iso: '2026-09-18', label: 'Fri. Sep. 18, 2026' },
      { iso: '2026-09-25', label: 'Fri. Sep. 25, 2026' },
      { iso: '2026-10-05', label: 'Mon. Oct. 5, 2026' },
      { iso: '2026-10-13', label: 'Tue. Oct. 13, 2026' },
      { iso: '2026-10-20', label: 'Tue. Oct. 20, 2026' },
      { iso: '2026-10-27', label: 'Tue. Oct. 27, 2026' },
      { iso: '2026-11-03', label: 'Tue. Nov. 3, 2026' },
      { iso: '2026-11-10', label: 'Tue. Nov. 10, 2026' },
      { iso: '2026-11-18', label: 'Wed. Nov. 18, 2026' },
      { iso: '2026-11-25', label: 'Wed. Nov. 25, 2026' },
      { iso: '2026-12-02', label: 'Wed. Dec. 2, 2026' },
      { iso: '2026-12-09', label: 'Wed. Dec. 9, 2026' },
      { iso: '2026-12-16', label: 'Wed. Dec. 16, 2026' },
      { iso: '2026-12-23', label: 'Wed. Dec. 23, 2026' },
    ], 'containers'),
  },
  'Day 3 Garbage Collection Zone': {
    dates: buildAlternatingEntries([
      { iso: '2026-04-15', label: 'Wed. Apr. 15, 2026' },
      { iso: '2026-04-22', label: 'Wed. Apr. 22, 2026' },
      { iso: '2026-04-29', label: 'Wed. Apr. 29, 2026' },
      { iso: '2026-05-06', label: 'Wed. May. 6, 2026' },
      { iso: '2026-05-13', label: 'Wed. May. 13, 2026' },
      { iso: '2026-05-21', label: 'Thu. May. 21, 2026' },
      { iso: '2026-05-28', label: 'Thu. May. 28, 2026' },
      { iso: '2026-06-04', label: 'Thu. Jun. 4, 2026' },
      { iso: '2026-06-11', label: 'Thu. Jun. 11, 2026' },
      { iso: '2026-06-18', label: 'Thu. Jun. 18, 2026' },
      { iso: '2026-06-25', label: 'Thu. Jun. 25, 2026' },
      { iso: '2026-07-03', label: 'Fri. Jul. 3, 2026' },
      { iso: '2026-07-10', label: 'Fri. Jul. 10, 2026' },
      { iso: '2026-07-17', label: 'Fri. Jul. 17, 2026' },
      { iso: '2026-07-24', label: 'Fri. Jul. 24, 2026' },
      { iso: '2026-07-31', label: 'Fri. Jul. 31, 2026' },
      { iso: '2026-08-07', label: 'Fri. Aug. 7, 2026' },
      { iso: '2026-08-14', label: 'Fri. Aug. 14, 2026' },
      { iso: '2026-08-21', label: 'Fri. Aug. 21, 2026' },
      { iso: '2026-08-28', label: 'Fri. Aug. 28, 2026' },
      { iso: '2026-09-04', label: 'Fri. Sep. 4, 2026' },
      { iso: '2026-09-14', label: 'Mon. Sep. 14, 2026' },
      { iso: '2026-09-21', label: 'Mon. Sep. 21, 2026' },
      { iso: '2026-09-28', label: 'Mon. Sep. 28, 2026' },
      { iso: '2026-10-06', label: 'Tue. Oct. 6, 2026' },
      { iso: '2026-10-14', label: 'Wed. Oct. 14, 2026' },
      { iso: '2026-10-21', label: 'Wed. Oct. 21, 2026' },
      { iso: '2026-10-28', label: 'Wed. Oct. 28, 2026' },
      { iso: '2026-11-04', label: 'Wed. Nov. 4, 2026' },
      { iso: '2026-11-12', label: 'Thu. Nov. 12, 2026' },
      { iso: '2026-11-19', label: 'Thu. Nov. 19, 2026' },
      { iso: '2026-11-26', label: 'Thu. Nov. 26, 2026' },
      { iso: '2026-12-03', label: 'Thu. Dec. 3, 2026' },
      { iso: '2026-12-10', label: 'Thu. Dec. 10, 2026' },
      { iso: '2026-12-17', label: 'Thu. Dec. 17, 2026' },
      { iso: '2026-12-24', label: 'Thu. Dec. 24, 2026' },
    ], 'containers'),
  },
  'Day 4 Garbage Collection Zone': {
    dates: buildAlternatingEntries([
      { iso: '2026-04-16', label: 'Thu. Apr. 16, 2026' },
      { iso: '2026-04-23', label: 'Thu. Apr. 23, 2026' },
      { iso: '2026-04-30', label: 'Thu. Apr. 30, 2026' },
      { iso: '2026-05-07', label: 'Thu. May. 7, 2026' },
      { iso: '2026-05-14', label: 'Thu. May. 14, 2026' },
      { iso: '2026-05-22', label: 'Fri. May. 22, 2026' },
      { iso: '2026-05-29', label: 'Fri. May. 29, 2026' },
      { iso: '2026-06-05', label: 'Fri. Jun. 5, 2026' },
      { iso: '2026-06-12', label: 'Fri. Jun. 12, 2026' },
      { iso: '2026-06-19', label: 'Fri. Jun. 19, 2026' },
      { iso: '2026-06-26', label: 'Fri. Jun. 26, 2026' },
      { iso: '2026-07-06', label: 'Mon. Jul. 6, 2026' },
      { iso: '2026-07-13', label: 'Mon. Jul. 13, 2026' },
      { iso: '2026-07-20', label: 'Mon. Jul. 20, 2026' },
      { iso: '2026-07-27', label: 'Mon. Jul. 27, 2026' },
      { iso: '2026-08-03', label: 'Mon. Aug. 3, 2026' },
      { iso: '2026-08-10', label: 'Mon. Aug. 10, 2026' },
      { iso: '2026-08-17', label: 'Mon. Aug. 17, 2026' },
      { iso: '2026-08-24', label: 'Mon. Aug. 24, 2026' },
      { iso: '2026-08-31', label: 'Mon. Aug. 31, 2026' },
      { iso: '2026-09-08', label: 'Tue. Sep. 8, 2026' },
      { iso: '2026-09-15', label: 'Tue. Sep. 15, 2026' },
      { iso: '2026-09-22', label: 'Tue. Sep. 22, 2026' },
      { iso: '2026-09-29', label: 'Tue. Sep. 29, 2026' },
      { iso: '2026-10-07', label: 'Wed. Oct. 7, 2026' },
      { iso: '2026-10-15', label: 'Thu. Oct. 15, 2026' },
      { iso: '2026-10-22', label: 'Thu. Oct. 22, 2026' },
      { iso: '2026-10-29', label: 'Thu. Oct. 29, 2026' },
      { iso: '2026-11-05', label: 'Thu. Nov. 5, 2026' },
      { iso: '2026-11-13', label: 'Fri. Nov. 13, 2026' },
      { iso: '2026-11-20', label: 'Fri. Nov. 20, 2026' },
      { iso: '2026-11-27', label: 'Fri. Nov. 27, 2026' },
      { iso: '2026-12-04', label: 'Fri. Dec. 4, 2026' },
      { iso: '2026-12-11', label: 'Fri. Dec. 11, 2026' },
      { iso: '2026-12-18', label: 'Fri. Dec. 18, 2026' },
      { iso: '2026-12-29', label: 'Tue. Dec. 29, 2026' },
    ], 'containers'),
  },
  'Day 5 Garbage Collection Zone': {
    dates: buildAlternatingEntries([
      { iso: '2026-04-17', label: 'Fri. Apr. 17, 2026' },
      { iso: '2026-04-24', label: 'Fri. Apr. 24, 2026' },
      { iso: '2026-05-01', label: 'Fri. May. 1, 2026' },
      { iso: '2026-05-08', label: 'Fri. May. 8, 2026' },
      { iso: '2026-05-15', label: 'Fri. May. 15, 2026' },
      { iso: '2026-05-25', label: 'Mon. May. 25, 2026' },
      { iso: '2026-06-01', label: 'Mon. Jun. 1, 2026' },
      { iso: '2026-06-08', label: 'Mon. Jun. 8, 2026' },
      { iso: '2026-06-15', label: 'Mon. Jun. 15, 2026' },
      { iso: '2026-06-22', label: 'Mon. Jun. 22, 2026' },
      { iso: '2026-06-29', label: 'Mon. Jun. 29, 2026' },
      { iso: '2026-07-07', label: 'Tue. Jul. 7, 2026' },
      { iso: '2026-07-14', label: 'Tue. Jul. 14, 2026' },
      { iso: '2026-07-21', label: 'Tue. Jul. 21, 2026' },
      { iso: '2026-07-28', label: 'Tue. Jul. 28, 2026' },
      { iso: '2026-08-04', label: 'Tue. Aug. 4, 2026' },
      { iso: '2026-08-11', label: 'Tue. Aug. 11, 2026' },
      { iso: '2026-08-18', label: 'Tue. Aug. 18, 2026' },
      { iso: '2026-08-25', label: 'Tue. Aug. 25, 2026' },
      { iso: '2026-09-01', label: 'Tue. Sep. 1, 2026' },
      { iso: '2026-09-09', label: 'Wed. Sep. 9, 2026' },
      { iso: '2026-09-16', label: 'Wed. Sep. 16, 2026' },
      { iso: '2026-09-23', label: 'Wed. Sep. 23, 2026' },
      { iso: '2026-10-01', label: 'Thu. Oct. 1, 2026' },
      { iso: '2026-10-08', label: 'Thu. Oct. 8, 2026' },
      { iso: '2026-10-16', label: 'Fri. Oct. 16, 2026' },
      { iso: '2026-10-23', label: 'Fri. Oct. 23, 2026' },
      { iso: '2026-10-30', label: 'Fri. Oct. 30, 2026' },
      { iso: '2026-11-06', label: 'Fri. Nov. 6, 2026' },
      { iso: '2026-11-16', label: 'Mon. Nov. 16, 2026' },
      { iso: '2026-11-23', label: 'Mon. Nov. 23, 2026' },
      { iso: '2026-11-30', label: 'Mon. Nov. 30, 2026' },
      { iso: '2026-12-07', label: 'Mon. Dec. 7, 2026' },
      { iso: '2026-12-14', label: 'Mon. Dec. 14, 2026' },
      { iso: '2026-12-21', label: 'Mon. Dec. 21, 2026' },
      { iso: '2026-12-30', label: 'Wed. Dec. 30, 2026' },
    ], 'containers'),
  },
};

function compareIsoDate(left, right) {
  return new Date(`${left}T12:00:00`).getTime() - new Date(`${right}T12:00:00`).getTime();
}

export function getNextCollection(zoneName, now = new Date()) {
  const zone = ZONE_SCHEDULES[zoneName];
  if (!zone) return null;

  const todayIso = new Date(now.getTime() - now.getTimezoneOffset() * 60000)
    .toISOString()
    .slice(0, 10);

  return zone.dates.find((entry) => compareIsoDate(entry.iso, todayIso) >= 0) || zone.dates.at(-1) || null;
}
