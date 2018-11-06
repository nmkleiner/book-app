

export const storageService = {
  storeToArray,
  store,
  load
};


function storeToArray(key, value) {
  var values = [value];
  if (localStorage[key]) {
    var storage = load(key);
    storage.forEach(item => {
      values.push(item);
    });
  }
  localStorage[key] = JSON.stringify(values);
}

function store(key, any) {
  localStorage[key] = JSON.stringify(any);
}

function load(key) {
  var str = localStorage[key] || "null";
  return JSON.parse(str);
}

