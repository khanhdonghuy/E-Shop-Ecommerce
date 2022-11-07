function FormErrors(props: any) {
  const renderError = () => {
    const { errors } = props;
    if (Object.keys(errors).length > 0) {
      return Object.keys(errors).map((key, index) => {
        return <li key={index}>{errors[key]}</li>;
      });
    }
  };
  return <ul>{renderError()}</ul>;
}
export default FormErrors;
