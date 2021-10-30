export class UserForm {
	constructor(private parent: Element) {}

	eventsMap: { [key: string]: () => void } = {
		'click:button': this.onButtonClick,
		'mouseenter:h1': this.onHeaderHover
	};

	onButtonClick(): void {
		console.log('button clicked');
	}

	onHeaderHover(): void {
		console.log('header hovered');
	}

	template(): string {
		return `
      <div>
        <h1>User Form</h1>
        <input />
        <button>Click Me</button>
      </div>
    `;
	}

	bindEvents(fragment: DocumentFragment): void {
		const { eventsMap } = this;
		for (const eventKey in eventsMap) {
			const [eventName, selector] = eventKey.split(':'); // eventName -> 'click', selector -> 'button'
			fragment.querySelectorAll(selector).forEach((el) => {
				el.addEventListener(eventName, eventsMap[eventKey]);
			});
		}
	}

	render(): void {
		const templateElement = document.createElement('template');
		templateElement.innerHTML = this.template();
		this.bindEvents(templateElement.content);
		this.parent.append(templateElement.content);
	}
}
