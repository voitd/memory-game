import * as R from "rambda";

export const allEquals = (xs) => {
  if (xs.length < 2) {
    return true;
  }
  const [head, ...tail] = xs;
  return R.all(R.equals(head), tail);
};
