import { ISidebarItem } from './ISidebarItem';

export type ISidebarSubitem = Omit<ISidebarItem, 'isExpanded' | 'subitems'>;
