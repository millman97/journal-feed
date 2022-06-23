/**
* @jest-environment jsdom
*/

const fs = require('fs');
const path = require('path');
global.fetch = require('jest-fetch-mock');
const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf-8')
let js;
let app;
const siteBackendUrl = `https://journal-project-backend.herokuapp.com`;


const testPost = {
    id: "ajdj-sds2-sdsd",
    title: "Yep sds ",
    body: "updated post sadsadsaasdsadasdasdsadasdasdasdas asdasdasdasdsadasdas asdsadasdasdasdsadasdaskdmklasdjkasldmalskdmasldmlasdmlasdaksdkjdas djadkajdh dasd",
    link: "https://media1.giphy.com/media/gw3IWyGkC0rsazTi/giphy.gif?cid=ab6c4d53zdzp1pvjpi7apbhj100lzl1tc6w4n7240ngxt60a&rid=giphy.gif&ct=g",
    date: "Fri May 6 2022 19:30:00",
    comments: [
        {
            id: 0,
            body: "comment in here blah blah blah",
            link: "link to a giphy should go here",
            date: "Tue May 17 2022 13:45:30",
            postRef: "ajdj-sds2-sdsd"
        }
    ],
    reactions: {
        laugh: 22,
        thumbUp: 19,
        poo: 2
    }
};

describe('app.js', () => {
    beforeEach(() => {
        document.documentElement.innerHTML = html.toString();
        title = document.querySelector('title');
        js = require('../static/js/index');
        app = require('../static/js/app');
        fetch.resetMocks();
    })

    test('getAllPosts makes a fetch', async () => {
        await app.getAllPosts();
        expect(fetch).toHaveBeenCalled()
    })

    test('createPost fetches',  () => {
        const np = document.querySelector('#postForm');
        np.querySelector('#postTitle').value = testPost.title;
        np.querySelector('#postContent').value = testPost.body;
        app.createPost();
        expect(fetch).toHaveBeenCalled();
    })

    test('createPost fetches',  () => {
        const newPostBtn = document.querySelector(".newPostBtn");

        // dispatch click event to listener
        const addEvt = new Event('click');
        newPostBtn.dispatchEvent(addEvt);

        const np = document.querySelector('#postForm');
        np.querySelector('#postTitle').value = testPost.title;
        np.querySelector('#postContent').value = testPost.body;
        app.createPost();
        expect(fetch).toHaveBeenCalled();
    })

    test('createComment fetches',  () => {
        app.createComment('09dfe905-422a-4515-ad3a-971b314868c1', 'Testing comment');
        expect(fetch).toHaveBeenCalled();
    })

    test('sendReact fetches',  () => {
        app.sendReact('09dfe905-422a-4515-ad3a-971b314868c1', 0);
        expect(fetch).toHaveBeenCalled();
    })

    test('append post', () => {
        let initialPosts = document.querySelectorAll('.post').length;
        app.appendPost(testPost);
        expect(document.querySelectorAll('.post').length).toEqual(initialPosts + 1);
    })

    test('giphySearch makes a fetch', async () => {
        await app.giphySearch();
        expect(fetch).toHaveBeenCalled()
    })

    test('giphySearch makes a fetch call with search term', async () => {
        document.getElementById("gifSearch").value = "test";
        await app.giphySearch();
        expect(fetch).toHaveBeenCalledWith('https://api.giphy.com/v1/gifs/search?api_key=T20UHWhHXbf47QtXnYSnHXJrYkeOXam3&limit=1&q=test')
    })

    test('closeBtn removes newPostFormImg', () => {
        const newPostBtn = document.querySelector(".newPostBtn");

        // dispatch click event to listener
        const addEvt = new Event('click');
        newPostBtn.dispatchEvent(addEvt);

        document.getElementById("gifSearch").value = "test";
        app.giphySearch();

        app.closeCreatePost();

        expect(document.getElementById("newPostFormImg")).not.toBeTruthy();
    })
})
