const assertNever = (prop: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(prop)}`
  );
};

interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartDescription extends CoursePartBase {
  description: string;
}

interface CoursePartBasic extends CoursePartDescription {
  kind: 'basic';
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: 'group';
}

interface CoursePartBackground extends CoursePartDescription {
  backgroundMaterial: string;
  kind: 'background';
}

interface CoursePartSpecial {
  name: string;
  exerciseCount: number;
  description: string;
  requirments: string[];
  kind: 'special';
}

type CoursePart =
  | CoursePartBasic
  | CoursePartGroup
  | CoursePartBackground
  | CoursePartSpecial;

interface HeaderProps {
  courseName: string;
}

interface PartProps {
  part: CoursePart;
}

interface ContentProps {
  parts: CoursePart[];
}
interface TotalProps {
  parts: CoursePart[];
}

const Header = (props: HeaderProps) => {
  return <h1>{props.courseName}</h1>;
};

const Part = (props: PartProps) => {
  switch (props.part.kind) {
    case 'basic':
      return (
        <div>
          <p>
            <b>{props.part.name}</b> {props.part.exerciseCount}
          </p>
          <i>{props.part.description}</i>
        </div>
      );
      break;
    case 'group':
      return (
        <div>
          <p>
            <b>{props.part.name}</b> {props.part.exerciseCount}
          </p>
          <i>Group Projects: {props.part.groupProjectCount}</i>
        </div>
      );
      break;
    case 'background':
      return (
        <div>
          <p>
            <b>{props.part.name}</b> {props.part.exerciseCount}
          </p>
          <i>{props.part.description}</i>
        </div>
      );
      break;
    case 'special':
      return (
        <div>
          <p>
            <b>{props.part.name}</b> {props.part.exerciseCount}
          </p>
          {props.part.requirments.map((req) => (
            <p key={req}>{req}</p>
          ))}
          <i>{props.part.description}</i>
        </div>
      );
      break;

    default:
      assertNever(props.part);
      return null;
  }
};

const Content = (props: ContentProps) => {
  return (
    <div>
      {props.parts.map((part) => {
        return <Part key={part.name} part={part} />;
      })}
    </div>
  );
};

const Total = (props: TotalProps) => {
  return (
    <div>
      <p>
        Number of exercises{' '}
        {props.parts.reduce((carry, part) => carry + part.exerciseCount, 0)}
      </p>
    </div>
  );
};

const App = () => {
  const courseName = 'Half Stack application development';
  const courseParts: CoursePart[] = [
    {
      name: 'Fundamentals',
      exerciseCount: 10,
      description: 'This is an awesome course part',
      kind: 'basic',
    },
    {
      name: 'Using props to pass data',
      exerciseCount: 7,
      groupProjectCount: 3,
      kind: 'group',
    },
    {
      name: 'Basics of type Narrowing',
      exerciseCount: 7,
      description: 'How to go from unknown to string',
      kind: 'basic',
    },
    {
      name: 'Deeper type usage',
      exerciseCount: 14,
      description: 'Confusing description',
      backgroundMaterial:
        'https://type-level-typescript.com/template-literal-types',
      kind: 'background',
    },
    {
      name: 'TypeScript in frontend',
      exerciseCount: 10,
      description: 'a hard part',
      kind: 'basic',
    },
  ];

  return (
    <div>
      <Header courseName={courseName} />
      <Content parts={courseParts} />
      <Total parts={courseParts} />
    </div>
  );
};

export default App;
