import PropTypes from "prop-types";

function Heading({ title, type }) {
  const HtmlTag = type;

  return (
    <HtmlTag className="py-4 text-3xl lg:text-4xl font-semibold leading-9 text-gray-800 dark:text-gray-50">
      {title}
    </HtmlTag>
  );
}

Heading.propTypes = {
  title: PropTypes.string,
  type: PropTypes.node.isRequired,
};

Heading.defaultProps = {
  title: "",
};

export default Heading;
