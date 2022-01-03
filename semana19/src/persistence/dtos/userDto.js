export default class UserDto {
    constructor({ id, displayName, firstName, lastName, email }) {
        this.id = id
        this.displayName = displayName
        this.firstName = firstName
        this.lastName = lastName
        this.email = email
    }
}

export function asDto(users) {
    if (Array.isArray(users))
        return users.map(u => new UserDto(u))
    else
        return new UserDto(users)
}