import { ETicketPriority } from './../enums/ETicketPriority';
import { ETicketType } from './../enums/ETicketType';
import { IFile } from './IFile';

/* eslint-disable semi */
export default interface ITicketData {
	id: number;
	title: string;
	description: string;
	priority: ETicketPriority;
	creatorId: number;
	asigneeId: number;
	productId: number;
	type: ETicketType;
	files: IFile[];
}
