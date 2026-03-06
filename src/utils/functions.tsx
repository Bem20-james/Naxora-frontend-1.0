function removeKeys(obj: Record<string, unknown>, keys: string[]) {
  let newObj = { ...obj };
  keys.forEach((key) => {
    delete newObj[key];
  });
  return newObj;
}

const isValidEmail = (email: string) => {
  const emailRegex = /\S+@\S+\.\S+/;
  return emailRegex.test(email);
};

export { removeKeys, isValidEmail };
