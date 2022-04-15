import { ISidebarSubitem } from './ISidebarSubitem';
export interface ISidebarItem {
	label: string;
	icon: string;
	isExpanded: boolean;
	subitems?: ISidebarSubitem[];
	onClick?: (...args: any) => void;
}
