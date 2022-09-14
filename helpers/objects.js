export const getPath = (c, name, v, currentPath, t) => {
  var currentPath = currentPath || "root";

  for (var i in c) {
    if (i == name && c[i] == v) {
      t = currentPath;
    } else if (typeof c[i] == "object") {
      return path(c[i], name, v, currentPath + "." + i);
    }
  }

  return t;
};

export const findPath = (ob, key, value) => {
  const path = [];
  const keyExists = (obj) => {
    if (!obj || (typeof obj !== "object" && !Array.isArray(obj))) {
      return false;
    } else if (obj.hasOwnProperty(key) && obj[key] === value) {
      return true;
    } else if (Array.isArray(obj)) {
      let parentKey = path.length ? path.pop() : "";

      for (let i = 0; i < obj.length; i++) {
        path.push(`${parentKey}[${i}]`);
        const result = keyExists(obj[i], key);
        if (result) {
          return result;
        }
        path.pop();
      }
    } else {
      for (const k in obj) {
        path.push(k);
        const result = keyExists(obj[k], key);
        if (result) {
          return result;
        }
        path.pop();
      }
    }

    return false;
  };

  keyExists(ob);

  return path.join(".");
};
