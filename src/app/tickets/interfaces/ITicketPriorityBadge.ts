/* eslint-disable semi */
import { ETicketPriority } from './../enums/ETicketPriority';

export default interface ITicketPriorityBadge {
	label: ETicketPriority;
	value: string;
}
