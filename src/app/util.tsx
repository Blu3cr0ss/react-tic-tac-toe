export enum Step {
  X = "X",
  O = "O",
  NONE = " ",
}

export const range = (n: number) => Array.from(Array(n).keys());
export const zip = (array1: number[], array2: number[]) =>
  array1.map((_, i) => array2);
export const allEqual = (arr: Array<any>) =>
  arr.every((v) => v === arr[0]) || arr.length === 0;
export function isGameOver(steps: { [key: string]: Step }): boolean | string {
  const endPatterns = [
    ["00", "01", "02"],
    [10, 11, 12],
    [20, 21, 22],
    ["00", 10, 20],
    ["01", 11, 21],
    ["02", 12, 22],
    ["00", 11, 22],
    [20, 11, "02"],
    ["00", "01", "02", 10, 11, 12, 20, 21, 22],
  ];
  for (let i = 0; i < endPatterns.length; i++) {
    const element = endPatterns[i];
    const mapped: (Step | null | undefined)[] = element.map((el) =>
      !steps ? null : steps[el]
    );

    if (
      !mapped.includes(undefined) &&
      !mapped.includes(null) &&
      mapped.length == 9
    ) {
      return Step.NONE;
    }

    if (
      !mapped.includes(undefined) &&
      !mapped.includes(null) &&
      allEqual(mapped)
    ) {
      return mapped[0]!;
    }
  }
  return false;
}
