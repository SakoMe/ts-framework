import axios from 'axios';

interface UserProps {
	id?: number;
	name?: string;
	age?: number;
}

type Callback = () => void;

export class User {
	private events: { [key: string]: Callback[] } = {};

	constructor(private data: UserProps) {}

	get(propName: keyof UserProps): string | number | undefined {
		return this.data[propName];
	}

	set(update: UserProps): void {
		this.data = { ...this.data, ...update };
	}

	on(event: string, callback: Callback): void {
		const handlers = this.events[event] || [];
		handlers.push(callback);
		this.events[event] = handlers;
	}

	trigger(event: string): void {
		const handlers = this.events[event];

		if (!handlers || handlers.length === 0) return;

		handlers.forEach((callback) => callback());
	}

	async fetch(): Promise<void> {
		const response = await axios.get(
			`http://localhost:3000/users/${this.get('id')}`
		);
		this.set(response.data);
	}

	save(): void {
		const id = this.get('id');
		if (id) {
			axios.put(`http://localhost:3000/users/${id}`, this.data);
		} else {
			axios.post('http://localhost:3000/users/', this.data);
		}
	}
}
