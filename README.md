<h2 align=center><b>tix.js</b></h2>
<p align=center>A Node.js&reg; wrapper for interacting with the Roblox API</p>

<hr/>

### **Benefits**
- Promise based
- Object oriented
- Predictable abstractions
- 100% typed (for people using [TypeScript](https://www.typescriptlang.org/))

<hr/>

### **Prerequisites**
- [Node.js](https://nodejs.org/en/)

<hr/>

### **Installation**
With Node.js&reg; installed on your environment, run the command to install the package from npm:
```sh
npm i tix.js
```

<hr/>

### **Usage**
How to use the module.

```typescript
import { getPlayer, getPlayerIdFromName } from 'tix.js'

(async () => {
```

> You can import functions individually or `import * as tix from 'tix.js'`

```typescript
    const player = await getPlayer('Roblox') // -> Promise<RobloxPlayer | null>
    console.log(player)
```

> Fetch a player by either their name or id using the `getPlayer()` function.

```typescript
    const groups = await player.getGroups() // -> Promise<RobloxPlayerGroup[] | null>
    console.log(groups.join('\n'))
```

> Want to know what groups the fetched player is in? `.getGroups()` member function.

```typescript
    const thumbnail = await player.getThumbnailURL({
        crop: 'avatar-bust',
        size: '420x420'
    }) // -> Promise<URL | null>
    console.log(`${thumbnail}`)
```

> If you are integrating this project into your website or Discord bot and want to display a thumbnail of the fetched player's avatar--you can do so with the `.getThumbnail()` member function.

```typescript
    console.log(await player.isInGroup('Roblox')) // -> Promise<boolean>
```

> If you need to check whether the fetched player is in a group of yours.. `.isInGroup()` member function.

```typescript
    const player_id = await getPlayerIdFromName('Roblox') // -> Promise<number | null>
    console.log(player_id)
```

> Fetch a player's id from their username using the `getPlayerIdFromName()` function.

```typescript
})
```

<hr/>

### **Documentation**
You can check out the current up-to-date documentation by viewing `DOCS.md` -- deprecated methods will not be listed.
