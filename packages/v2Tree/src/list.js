var listData = [
  {id: 100, name: 'flare', value: 123, delay: 120, pid: 0},
  {id: 101, name: 'flare', value: 0, pid: 100},
  {id: 102, name: 'flare', value: 100, pid: 100},
  {id: 103, name: 'flare', value: 123, pid: 100},
  {id: 104, name: 'flare', value: 200, pid: 100},
  {id: 105, name: 'flare', value: 123, pid: 101},
  {id: 106, name: 'flare', value: 123, pid: 102},
  {id: 107, name: 'flare', value: 123, pid: 102},
  {id: 108, name: 'flare', value: 123, pid: 102},
  {id: 109, name: 'flare', value: 123, pid: 102},
  {id: 110, name: 'flare', value: 123, pid: 102},
  {id: 111, name: 'flare', value: 123, pid: 102},
  {id: 112, name: 'flare', value: 300, pid: 103},
  {id: 113, name: 'flare', value: 123, pid: 103},
  {id: 114, name: 'flare', value: 123, pid: 108},
  {id: 116, name: 'flare', value: 123, pid: 108},
  {id: 117, name: 'flare', value: 123, pid: 108},
  {id: 118, name: 'flare', value: 400, pid: 108},
  {id: 119, name: 'flare', value: 123, pid: 108},
  {id: 120, name: 'flare', value: 123, pid: 108},
  {id: 121, name: 'flare', value: 123, pid: 107},
  {id: 122, name: 'flare', value: 400, pid: 105},
  {id: 123, name: 'flare', value: 123, pid: 103},
  {id: 124, name: 'flare', value: 123, pid: 108},
  {id: 125, name: 'flare', value: 123, pid: 108},
  {id: 126, name: 'flare', value: 300, pid: 124},
  {id: 127, name: 'flare', value: 123, delay: 201, pid: 122},
  {id: 128, name: 'flare', value: 123, pid: 122},
  {id: 129, name: 'flare', value: 100, pid: 122},
  {id: 130, name: 'flare', value: 503, pid: 122}
];
listData.forEach(function (v) {
  if (!v.delay) {
      v.delay = 200 * Math.random();
  }
});
export const list = listData
