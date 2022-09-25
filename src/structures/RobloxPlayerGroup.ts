export default class RobloxPlayerGroup {
    public id: number
    public name: string
    public role: {
        id: number,
        name: string,
        rank: number
    }
    public members: number
    public verified: boolean

    constructor (builder: { [K: string]: any }) {
        this.id = builder.group.id,
        this.name = builder.group.name,
        this.members = builder.group.memberCount,
        this.verified = builder.group.hasVerifiedBadge,
        this.role = builder.role
    }
}
