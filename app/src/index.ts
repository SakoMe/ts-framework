import { UserList } from './views/UserList';
import { Collection } from './models/Collection';
import { UserProps, User } from './models/User';
import { UserEdit } from './views/UserEdit';

const user = User.buildUser({ name: 'Sarkis', age: 44 });

const root = document.getElementById('edit');

if (root) {
	const userEdit = new UserEdit(root, user);
	userEdit.render();

	console.log(userEdit);
} else {
	throw new Error('Root element not found');
}

const users = new Collection('http://localhost:3000/users', (json: UserProps) =>
	User.buildUser(json)
);

users.on('change', () => {
	const root = document.getElementById('users');

	if (root) new UserList(root, users).render();
});

users.fetch();
