import "./BodyContainer.sass";

const BodyContainer = (props: React.PropsWithChildren): JSX.Element => {
  return (
    <div className="body">
      <div className="container">{props.children}</div>
    </div>
  );
};
export default BodyContainer;
