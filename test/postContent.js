/**
 * @jest-environment jsdom
 */

const fs = require("fs");
const path = require("path");
const html = fs.readFileSync(path.resolve(__dirname, "../index.html"), "utf-8");


describe("index.html Content", () => {
    describe("Post Content", () => {
          document.documentElement.innerHTML = html.toString();
  
          describe.each(Array.from(document.querySelectorAll(".post")))("Post #%#", (e) => {
              it("has title text",()=>{
              let target = e.querySelector(".postWrapper>.postTitle");
              expect(target.textContent).toBeTruthy();
            })
              it("title <= 50 chars",()=>{
               let target = e.querySelector(".postWrapper>.postTitle");
                let charLimit = 50
                expect(target.textContent.length <= charLimit).toBeTruthy();
            })
              it("has body text",()=>{
              let target = e.querySelector(".postWrapper>.preview");
              expect(target.textContent).toBeTruthy();
            })
              it("body text <= 500 chars",()=>{
               let target = e.querySelector(".postWrapper>.preview");
                let charLimit = 500
                expect(target.textContent.length <= charLimit).toBeTruthy();
            })
        });
        });

    describe("img elements", () => {
        document.documentElement.innerHTML = html.toString();
        describe.each(Array.from(document.querySelectorAll("img")))("img #%#", (e) => {
          it("has alt attribute", () => {
            expect(e.getAttribute("alt")).toBeTruthy()
            });
        });
      });
});
