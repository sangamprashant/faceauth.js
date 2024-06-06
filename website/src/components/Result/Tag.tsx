type Data = {
  text: string;
};

const Error = (props: Data) => {
  return <p className="text-danger">{props.text}</p>;
};

const Success = (props: Data) => {
  return <p className="text-success">{props.text}</p>;
};

const Warning = (props: Data) => {
  return <p className="text-warning">{props.text}</p>;
};

export { Error, Success, Warning };
