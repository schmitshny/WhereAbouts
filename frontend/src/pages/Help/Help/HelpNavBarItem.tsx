import { useNavigate } from "react-router-dom";
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import {
  Collapse,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  List,
} from "@mui/material";
import { ListElement } from "../../../interfaces/Help";
import { v4 as uuidv4 } from "uuid";

interface HelpNavBarItemProps {
  handleClick: (id: number) => void;
  handleSelect: (id: string) => void;
  item: ListElement;
  selectedItem: string;
}

const HelpNavBarItem: React.FC<HelpNavBarItemProps> = ({
  handleClick,
  handleSelect,
  item,
  selectedItem,
}) => {
  const {
    listItemIcon,
    listItemText,
    open,
    collabseItems,
    id,
    isCollabse,
    navigateTo,
  } = item;
  const navigate = useNavigate();
  return (
    <>
      <ListItemButton
        onClick={() => {
          handleClick(id);
          if (navigateTo) navigate(navigateTo);
        }}
        selected={item.listItemText === selectedItem}
      >
        <ListItemIcon children={listItemIcon} />

        <ListItemText primary={listItemText} />
        {isCollabse ? open ? <ExpandLess /> : <ExpandMore /> : null}
      </ListItemButton>
      {collabseItems &&
        collabseItems.map((item) => {
          return (
            <Collapse in={open} timeout="auto" unmountOnExit key={uuidv4()}>
              <List component="div" disablePadding>
                <ListItemButton
                  sx={{ pl: 4 }}
                  onClick={() => {
                    handleSelect(item.collapseItemText);
                    if (item.navigateTo) navigate(item.navigateTo);
                  }}
                  selected={item.collapseItemText === selectedItem}
                >
                  <ListItemIcon children={item.collapseItemIcon} />

                  <ListItemText primary={item.collapseItemText} />
                </ListItemButton>
              </List>
            </Collapse>
          );
        })}
    </>
  );
};

export default HelpNavBarItem;
