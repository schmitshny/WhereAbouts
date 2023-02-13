export interface ListElement {
  id: number;
  listItemIcon: any;
  listItemText: string;
  open: boolean;
  isCollabse: boolean;
  navigateTo?: string;
  collabseItems?: {
    collapseItemText: string;
    collapseItemIcon: any;
    navigateTo?: string;
  }[];
}
