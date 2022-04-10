interface PostsCon {
    id: number
    bloggerId?: Bloggers['id'],
    title: string | null
    shortDescription: string | null
    content: string | null
    bloggerName: Bloggers['name']

}

interface Bloggers {
    id: number,
    name: string | null
    youtubeUrl: string | null
}

export let bloggers: Bloggers[] = [
    {id: 1, name: 'Alex', youtubeUrl: 'https://www.google.com'},
    {id: 2, name: 'goTry', youtubeUrl: 'https://www.freecodecamp.com'},
    {id: 3, name: 'hard', youtubeUrl: 'https://www.it-incubator.eu'},
    {id: 4, name: 'dontLookBack', youtubeUrl: 'https://www.github.com'}
]


export let posts: PostsCon[] = [
    {
        id: 1,
        title: "Let try",
        shortDescription: "Search",
        content: "super decision",
        bloggerId: 1,
        bloggerName: 'Alex'
    },
    {
        id: 2,
        title: "write",
        shortDescription: "reason",
        content: "group therapy",
        bloggerId: 2,
        bloggerName: 'goTry'
    },
    {
        id: 3,
        title: "a good",
        shortDescription: "watch",
        content: "new version",
        bloggerId: 3,
        bloggerName: 'hard'
    },
    {
        id: 4,
        title: "code",
        shortDescription: "more",
        content: "clockwork",
        bloggerId: 4,
        bloggerName: 'dontLookBack'
    }]