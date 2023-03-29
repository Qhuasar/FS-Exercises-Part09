interface BmiValues {
  height: number;
  weight: number;
}

const  parseArgs = (args: string[]): BmiValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');
  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3]),
    };
  }
  throw new Error('only accepts numbers');
};

const bmiCalculator = (height: number, weight: number): string => {
  if (!isNaN(height) && !isNaN(weight)) {
    if (height === 0) {
      throw new Error("Can't divide by zero ");
    }
    const result = Number(weight) / (Number(height) * Number(height));
    if (result < 18.5) return 'Underweight (low weight)';
    if (result >= 18.5 && result < 24.9) return 'Normal(healthy weight) ';
    if (result > 25) return 'Overweight(high weight)';
  }
  throw new Error('only accepts numbers');
};

try {
  const { height, weight } = parseArgs(process.argv);
  const result = bmiCalculator(height, weight);
  console.log(result);
} catch (error: unknown) {
  let errorMessage = 'Something went wrong';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}
