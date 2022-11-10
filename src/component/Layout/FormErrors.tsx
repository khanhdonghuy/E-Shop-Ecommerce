interface Props {
  [key: string]: any;
}
function FormErrors({ errors }: Props) {
  const renderError = () => {
    if (Object.keys(errors).length > 0) {
      return Object.keys(errors).map((key, index) => {
        return <li key={index}>{errors[key]}</li>;
      });
    }
  };
  return <ul>{renderError()}</ul>;
}
export default FormErrors;
