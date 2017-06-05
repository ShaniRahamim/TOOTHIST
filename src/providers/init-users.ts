import {User} from "../pages/users/users";
import {Client} from "../pages/clients/clients";
export class Init {
  load() {
    console.log(localStorage.getItem('users'));
    if (localStorage.getItem('users') === null ||  localStorage.getItem('users') === 'undefiend') {
      var users = [
        new User('name', 1234, 'email', 'admin', 1234),
        new User('admin', 345, 'mail', 'name', 1111),
        ];
      localStorage.setItem('users', JSON.stringify(users));
    }
  }

  loadClient(){
    if (localStorage.getItem('clients') === null ||  localStorage.getItem('clients') === 'undefiend') {
      let date = new Date(1478708162000);
      var clients = [new Client('Liza', 'liza@gmail.com', 'Diva',312245, date, 1234)];
      localStorage.setItem('clients', JSON.stringify(clients));
    }
  }
};
