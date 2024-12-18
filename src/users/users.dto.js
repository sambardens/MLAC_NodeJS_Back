export class UsersDto {
    constructor(model) {
        this.id = model.id
        this.email = model.email
        this.firstName = model.firstName
        this.lastName = model.lastName
        this.accountStatus = model.accountStatus
        this.isEmailConfirmed = model.isEmailConfirmed
    }
}