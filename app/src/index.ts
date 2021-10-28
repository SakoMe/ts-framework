import { User } from './models/User';

const user = new User({ name: 'Super Duper Name', age: 999 });

user.on('save', () => console.log(user));

user.save();
