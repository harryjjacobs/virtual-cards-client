export const traverse = (obj, cb) => {
  for (var key in obj) {
    cb.apply(this, [key, obj[key], obj]);  
    if (obj[key] !== null && typeof(obj[key]) == "object") {
      traverse(obj[key], cb);
    }
  }
};