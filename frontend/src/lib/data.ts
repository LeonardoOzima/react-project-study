import {faker} from '@faker-js/faker';
import {UserType} from '@/Screens/Home/Interfaces/UserTypes';

const generateUsers: (numUsers: number) => UserType[] = (numUsers: number) => {
    const users: UserType[] = [];
    for (let i = 0; i < numUsers; i++) {
        users.push({
            name: faker.name.fullName(),
            email: faker.internet.email(),
            age: faker.number.int({ min: 18, max: 99 }),
        });
    }
    return users;
}

export const usersData = generateUsers(100);