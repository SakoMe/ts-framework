import { User } from './models/User';

const user = new User({ name: 'Bob', age: 20 });

user.on('change', () => console.log('change'));
user.on('click', () => console.log('click'));
user.on('save', () => console.log('saved'));

user.trigger('change');
user.trigger('click');
user.trigger('save');
