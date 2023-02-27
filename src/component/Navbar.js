import { menuItems } from '../Utils';
import MenuItems from './MenuItems';
import useStyles from "./appbar";
const Navbar = () => {
    const classes = useStyles();
  return (
    <nav>
      <ul className="menus" >
        {menuItems.map((menu, index) => {
          const depthLevel = 0;
          return (
            <MenuItems
              items={menu}
              key={index}
              depthLevel={depthLevel}
            />
          );
        })}
      </ul>
    </nav>
  );
};

export default Navbar;
