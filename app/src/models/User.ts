interface UserProps {
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
}
