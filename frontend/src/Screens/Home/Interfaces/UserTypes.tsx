class UserType {
  name: string;
  email: string;
  age: number;

  constructor(name: string, email: string, age: number) {
    this.name = name;
    this.email = email;
    this.age = age;
  }
}

export class UserBackendType {
  id: string;
  name: string;
  email: string;
  age: number;

  constructor(id: string, name: string, email: string, age: number) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.age = age;
  }
}

export default UserType;
