import { AxiosResponse } from 'axios';

import { Attributes } from './Attributes';
import { Eventing } from './Eventing';
import { Sync } from './Sync';

export interface UserProps {
	id?: number;
	name?: string;
	age?: number;
}

const rootUrl = 'http://localhost:3000/users';

export class User {
	private events: Eventing = new Eventing();
	private sync: Sync<UserProps> = new Sync<UserProps>(rootUrl);
	private attribues: Attributes<UserProps>;

	constructor(attrs: UserProps) {
		this.attribues = new Attributes<UserProps>(attrs);
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

	set(update: UserProps): void {
		this.attribues.set(update);
		this.events.trigger('change');
	}

	fetch(): void {
		const id = this.get('id');

		if (typeof id !== 'number') throw new Error('Can not fetch without an id');

		this.sync
			.fetch(id)
			.then((response: AxiosResponse): void => this.set(response.data))
			.catch((): void => this.trigger('error'));
	}

	save(): void {
		this.sync
			.save(this.attribues.getAll())
			.then((): void => this.events.trigger('save'))
			.catch((): void => this.trigger('error'));
	}
}
