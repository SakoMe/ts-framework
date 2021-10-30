export class UserForm {
	constructor(private parent: Element) {}

	template(): string {
		return `
      <div>
        <h1>User Form</h1>
        <input />
      </div>
    `;
	}

	render(): void {
		const termplateElement = document.createElement('template');
		termplateElement.innerHTML = this.template();

		this.parent.append(termplateElement.content);
	}
}
