import { errorColour, ErrorIcon } from "../../../constants/stylement";

const Error = ({ children }) => (
  <div className="flex flex-row align-center">
    {children} <ErrorIcon colour={errorColour} />
  </div>
);

export default Error;
