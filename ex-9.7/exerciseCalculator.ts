type RatingsDescription = 'bad' | 'neutral' | 'ok' | 'good' | 'very good';
type Ratings = 1 | 1.5 | 2 | 2.5 | 3;

interface Schedule {
  days: number;
  trainingDays: number;
  target: number;
  avgTime: number;
  targetReached: boolean;
  rating: Ratings;
  ratingDescrp: RatingsDescription;
}

export const calculateExercises = (
  avgDailyExercise: number[],
  target: number
): Schedule => {
  const days: number = avgDailyExercise.length;
  const trainingDays: number = avgDailyExercise.reduce(
    (total: number, currDay: number): number => {
      if (currDay === 0) return total;
      return total + 1;
    },
    0
  );
  const avgTime =
    avgDailyExercise.reduce((total: number, currDay: number): number => {
      return total + currDay;
    }, 0) / avgDailyExercise.length;

  let targetReached = false;
  let rating: Ratings;
  const ratio = (avgTime / target) * 100;
  if (ratio < 100) {
    rating = 1;
  } else if (ratio === 100) {
    targetReached = true;
    rating = 1.5;
  } else if (ratio > 100 && ratio < 125) {
    targetReached = true;
    rating = 2;
  } else if (ratio >= 125 && ratio < 170) {
    targetReached = true;
    rating = 2.5;
  } else if (ratio >= 170) {
    targetReached = true;
    rating = 3;
  } else {
    throw new Error('Sorry could not retrive your rating');
  }

  let ratingDescrp: RatingsDescription = 'bad';
  switch (rating) {
    case 1:
      ratingDescrp = 'bad';
      break;
    case 1.5:
      ratingDescrp = 'neutral';
      break;
    case 2:
      ratingDescrp = 'ok';
      break;
    case 2.5:
      ratingDescrp = 'good';
      break;
    case 3:
      ratingDescrp = 'very good';
      break;
    default:
      throw new Error('Sorry could not retrive your rating');
  }
  return {
    days,
    trainingDays,
    target,
    avgTime,
    targetReached,
    rating,
    ratingDescrp,
  };
};

//const testData = [3, 0, 2, 4.5, 0, 3, 1];

const parseArrayArgs = (args: string[]): number[] => {
  if (args.length < 4) throw new Error('Not enough arguments');
  const argumnets = args.slice(2);
  const numArray: number[] = argumnets.map((arg) => {
    if (isNaN(Number(arg))) {
      throw new Error('function only accepts numbers as arguments');
    } else {
      return Number(arg);
    }
  });
  return numArray;
};

try {
  const [target, ...dailyExercise] = parseArrayArgs(process.argv);
  const result = calculateExercises(dailyExercise, target);
  console.log(result);
} catch (error: unknown) {
  let errorMessage = 'Something went wrong';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}

export const isNaNArray = (array: number[]): boolean => {
  if (!(array instanceof Array)) return false;
  let isNANArray = true;
  array.forEach((num) => {
    console.log(isNaN(Number(num)));
    if (isNaN(Number(num))) {
      if (!Number(num) && Number(num) !== 0) isNANArray = false;
    }
  });
  return isNANArray;
};
