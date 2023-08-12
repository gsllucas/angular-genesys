export interface MenuOption {
  icon: string;
  label: string;
  activated: boolean;
  mode: 'expansion' | 'static';
  expanded?: boolean;
  children?: Array<ChildExpandedMode>;
}

export type ChildExpandedMode = {
  label: string;
};
