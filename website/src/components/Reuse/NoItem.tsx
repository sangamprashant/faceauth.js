const NoItem = (props: any) => {
  return (
    <div className="text-center border rounded-2 p-3">
      <img src="./assets/images/no-item/noitem.jpg" {...props} />
      <p className="text-capitalize p-0 m-0">{props.title}</p>
    </div>
  );
};

export default NoItem;
