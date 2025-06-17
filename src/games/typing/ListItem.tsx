type listItemType = {
  children: React.ReactNode;
  className?: string;
};

const ListItem = ({ children, className }: listItemType) => {
  return (
    <li
      className={`flex items-center justify-center p-2 ${className} box-border`}
    >
      {children}
    </li>
  );
};

export default ListItem;
