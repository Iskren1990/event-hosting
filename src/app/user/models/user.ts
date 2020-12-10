export class IUser {
    firstName: String;
    lastName: String;
    email: String;
    id?: String;
    password?: String;
    profilePic?: String;
    position?: String;

    constructor({
        firstName,
        lastName,
        email,
        password,
        profilePic,
        position
    }) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.profilePic = profilePic;
        this.position = position;
    }
}
