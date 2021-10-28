import axios from 'axios';
import { Eventing } from './Eventing';

interface UserProps {
	id?: number;
	name?: string;
	age?: number;
}

export class User {
	public events: Eventing = new Eventing();

	constructor(private data: UserProps) {}

	get(propName: keyof UserProps): string | number | undefined {
		return this.data[propName];
	}

	set(update: UserProps): void {
		this.data = { ...this.data, ...update };
	}
}
