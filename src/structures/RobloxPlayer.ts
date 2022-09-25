import request from '../utils/request'
import { API_ENDPOINT, GROUPS_ENDPOINT, THUMBNAIL_ENDPOINT } from '../utils/constants'
import RobloxPlayerGroup from './RobloxPlayerGroup'
import InvalidThumbnailError from '../errors/InvalidThumbnailError'

interface ThumbnailURLBuilder {
    crop?: 'avatar' | 'avatar-bust' | 'avatar-headshot',
    size?: '30x30' | '48x48' | '50x50' | '60x60' | '75x75' | '100x100' | '110x110' | '140x140' | '150x150' | '150x200' | '180x180' | '250x250' | '352x352' | '420x420' | '720x720',
    format?: 'png' | 'jpeg',
    circular?: boolean
}

export default class RobloxPlayer {
    public id: number
    public name: string
    public display_name: string
    public old_names: string[] | null
    public description: string | null
    public friends: number
    public followers: number
    public following: number
    public created: Date
    public verified: boolean
    public banned: boolean

    constructor (builder: any[]) {
        this.id = builder[0].id
        this.name = builder[0].name
        this.display_name = builder[0].displayName
        this.old_names = !builder[2].length ? null : builder[2]
        this.description = builder[0].description == '' ? null : builder[0].description
        this.friends = builder[1][0]
        this.followers = builder[1][1]
        this.following = builder[1][2]
        this.created = new Date(builder[0].created)
        this.verified = builder[0].hasVerifiedBadge
        this.banned = builder[0].isBanned
    }

    public async getThumbnailURL (queries?: ThumbnailURLBuilder | null) {
        const sizes = {
            'avatar': [ '30x30', '48x48', '60x60', '75x75', '100x100', '110x110', '140x140', '150x150', '150x200', '180x180', '250x250', '352x352', '420x420', '720x720' ],
            'avatar-bust': [ '48x48', '50x50', '60x60', '75x75', '100x100', '150x150', '180x180', '352x352', '420x420' ],
            'avatar-headshot': [ '48x48', '50x50', '60x60', '75x75', '100x100', '110x110', '150x150', '180x180', '352x352', '420x420', '720x720' ]
        }

        queries = queries || {}
        queries.crop = queries.crop || 'avatar-headshot'
        queries.size = queries.size || '420x420'

        if (!(sizes[queries.crop].includes(queries.size))) {
            Promise.reject(new InvalidThumbnailError(queries.size, queries.crop, sizes))
            return null
        }

        return new URL(await request(`${THUMBNAIL_ENDPOINT}/users/${queries?.crop || 'avatar-headshot'}`, {
            userIds: [
                this.id
            ],
            size: queries?.size || '420x420',
            format: queries?.format || 'png',
            isCircular: queries?.circular || false
        }).then(response => response.data.data[0].imageUrl))
    }

    public async getGroups (): Promise<RobloxPlayerGroup[] | null> {
        let groups = await request(`${GROUPS_ENDPOINT}/users/${this.id}/groups/roles`).then(response => response.data.data)
        groups = groups.map(builder => {
            return new RobloxPlayerGroup(builder)
        })
        return !groups.length ? null : groups
    }

    public async isInGroup (query: string | number): Promise<boolean> {
        let groups = await request(`${GROUPS_ENDPOINT}/users/${this.id}/groups/roles`).then(response => response.data.data)
        if (typeof query === 'string') {
            groups = groups.map(data => data.group.name)
        } else {
            groups = groups.map(data => data.group.id)
        }

        return groups.includes(query)
    }
}
