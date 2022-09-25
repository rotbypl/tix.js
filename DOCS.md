### **`RobloxPlayer`**

```typescript
class RobloxPlayer {
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

    getThumbnailURL (queries?: ThumbnailURLBuilder | null): Promise<URL | null>
    // Returns a URL or null if query parameters are not validly entered (ThumbnailURLBuilder documentation further down this code block).

    getGroups (): Promise<RobloxPlayerGroup[] | null>
    // Returns an array of RobloxPlayerGroup (documentation below).

    isInGroup (query: string | number): Promise<boolean>
    // You can enter a group's id in number or name in string for query.
}

interface ThumbnailURLBuilder {
    crop?: 'avatar' | 'avatar-bust' | 'avatar-headshot'
    size?: '30x30' | '48x48' | '50x50' | '60x60' | '75x75' | '100x100' | '110x110' | '140x140' | '150x150' | '150x200' | '180x180' | '250x250' | '352x352' | '420x420' | '720x720'
    format?: 'png' | 'jpeg'
    circular?: boolean
}
```

> This object is returned by functions.

<hr/>

### **`RobloxPlayerGroup`**

```typescript
class RobloxPlayerGroup {
    public id: number
    public name: string
    public role: {
        id: number
        name: string
        rank: number
    }
    public members: number
    public verified: boolean
}    
```

> This object is returned by functions.

<hr/>

### **`getPlayer()`**

```typescript
function getPlayer (query: string | number): Promise<RobloxPlayer | null>
```

> You can enter the player's id in number or name in string for query -- if string then getPlayerIdFromName will be called from inside of the function. If a player is not found then function will return null.

<hr/>

### **`getPlayerIdFromName()`**

```typescript
function getPlayerIdFromName(query: string): Promise<number | null>
```

> Enter the player's name (**NOT** display name), and receive their id. If a player is not found then function will return null.
