import axios, { AxiosResponse } from 'axios';
import { Eventing } from './Eventing';

export class Collection<T, K> {
	private models: T[] = [];
	private readonly events: Eventing = new Eventing();

	constructor(
		private readonly rootUrl: string,
		private readonly deserialize: (json: K) => T
	) {}

	get on() {
		return this.events.on;
	}

	get trigger() {
		return this.events.trigger;
	}

	fetch(): void {
		axios.get(this.rootUrl).then((response: AxiosResponse) => {
			this.models = response.data.map((value: K) => this.deserialize(value));
		});

		this.trigger('change');
	}
}
