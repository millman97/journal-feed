/**
* @jest-environment jsdom
*/

const fs = require('fs');
const path = require('path');
global.fetch = require('jest-fetch-mock');
const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf-8')
let js;
const app = require('../static/js/app');
jest.mock('../static/js/app');

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

describe('index.html', () => {
    let title;
    let script;
    let image;

    beforeEach(() => {
        document.documentElement.innerHTML = html.toString();
        title = document.querySelector('title');
        js = require('../static/js/index');
        // app = require('../static/js/app');
        fetch.resetMocks();
    })

    describe('Tests title', () => {
        test('it exists', () => {
            expect(title).toBeTruthy();
        })

        test('it contains the title "Journal Project"', () => {
            expect(title.textContent).toContain('Journal Project');
        })
    })

    describe('Tests script tag', () => {
        it('it is deferred', () => {
            script = document.querySelector('script');
            expect(script.getAttribute('defer')).toEqual('');
        })
    })

    describe('Tests img', () => {
        it("they have alt text", () => {
            image = document.querySelectorAll('img');
            let containAlt = 0;
            image.forEach((img) => {
                if (img.getAttribute('alt') && img.getAttribute('alt') != '') {
                    containAlt++;
                }
            })
            expect(containAlt).toEqual(image.length);
        })
    })

    //test form is correct
});

describe('index.js',()=>{
    beforeEach(() => {
        document.documentElement.innerHTML = html.toString();
        title = document.querySelector('title');
        js = require('../static/js/index');
        // app = require('../static/js/app');
        fetch.resetMocks();
    })

    test('init calls getAllPosts', ()=>{
        js.init();
        expect(app.getAllPosts).toHaveBeenCalled();
    })

    test('newPostBtn addEventListener works', ()=>{
        js.init();

        const newPostBtn = document.querySelector(".newPostBtn"); 
        
        // dispatch click event to listener
        const addEvt = new Event('click');
        newPostBtn.dispatchEvent(addEvt);
                
        expect(document.getElementById("createPost").style.display).toEqual('flex')
    })

    test('cancelPostBtn addEventListener works', ()=>{
        js.init();

        const newPostBtn = document.querySelector(".newPostBtn"); 
        
        // dispatch click event to listener
        const addEvt1 = new Event('click');
        newPostBtn.dispatchEvent(addEvt1);

        const cancelPostBtn = document.querySelector("#cancelBtn");
        
        // dispatch click event to listener
        const addEvt2 = new Event('click');
        cancelPostBtn.dispatchEvent(addEvt2);
                
        expect(app.closeCreatePost).toHaveBeenCalled();
    })

    test('postForm submit calls closeCreatePost', ()=>{
        js.init();

        const newPostBtn = document.querySelector(".newPostBtn"); 
        
        // dispatch click event to listener
        const addEvt1 = new Event('click');
        newPostBtn.dispatchEvent(addEvt1);

        const postForm = document.querySelector("#createPost > #postForm > form")
        
        // dispatch click event to listener
        const addEvt = new Event('submit');
        postForm.dispatchEvent(addEvt);
                
        expect(app.closeCreatePost).toHaveBeenCalled();
    })

    test('postForm submit calls createPost', ()=>{
        js.init();

        const newPostBtn = document.querySelector(".newPostBtn"); 
        
        // dispatch click event to listener
        const addEvt1 = new Event('click');
        newPostBtn.dispatchEvent(addEvt1);

        const postForm = document.querySelector("#createPost > #postForm > form")
        
        // dispatch click event to listener
        const addEvt = new Event('submit');
        postForm.dispatchEvent(addEvt);
                
        expect(app.createPost).toHaveBeenCalled();
    })

    test('addGifBtn eventlistener works', ()=>{
        js.init();

        const newPostBtn = document.querySelector(".newPostBtn"); 
        
        // dispatch click event to listener
        const addEvt1 = new Event('click');
        newPostBtn.dispatchEvent(addEvt1);

        const addGifBtn = document.querySelector("#addGifBtn");
        
        // dispatch click event to listener
        const addEvt = new Event('click');
        addGifBtn.dispatchEvent(addEvt);
                
        expect(document.getElementById("gifForm").style.display).toEqual('block')
    })

    test('searchBtn eventlistener works', ()=>{
        js.init();

        const newPostBtn = document.querySelector(".newPostBtn"); 
        
        // dispatch click event to listener
        const addEvt1 = new Event('click');
        newPostBtn.dispatchEvent(addEvt1);

        const searchBtn = document.getElementById("btnSearch");
        
        // dispatch click event to listener
        const addEvt = new Event('click');
        searchBtn.dispatchEvent(addEvt);
                
        expect(app.giphySearch).toHaveBeenCalled();
    })
})
