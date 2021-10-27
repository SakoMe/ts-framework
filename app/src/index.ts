import { User } from './models/User';

const user = new User({ id: 1 });

// user.set({ name: 'Changed', age: 999 });
// user.save();

// const userTWo = new User({ name: 'Jack', age: 100 });
// userTWo.save();

// user.on('change', () => console.log('change'));
// user.on('click', () => console.log('click'));
// user.on('save', () => console.log('saved'));

// user.trigger('change');
// user.trigger('click');
// user.trigger('save');

// import axios from 'axios';

// const URL = 'http://localhost:3000/users';

// axios.get(`${URL}/2`);
