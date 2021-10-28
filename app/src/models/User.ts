import { Attributes } from './Attributes';
import { Eventing } from './Eventing';
import { Sync } from './Sync';

export interface UserProps {
	id: number;
	name: string;
	age: number;
}

const rootUrl = 'http://localhost:3000/users';

export class User {
	public events: Eventing = new Eventing();
	public sync: Sync<UserProps> = new Sync<UserProps>(rootUrl);
	public attribues: Attributes<Partial<UserProps>>;

	constructor(attrs: Partial<UserProps>) {
		this.attribues = new Attributes<Partial<UserProps>>(attrs);
	}

	get on() {
		return this.events.on;
	}

	get trigger() {
		return this.events.trigger;
	}

	get get() {
		return this.attribues.get;
	}

	set(update: Partial<UserProps>): void {
		this.attribues.set(update);
		this.trigger('change');
	}
}
