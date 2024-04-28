const puppeteer = require("puppeteer");
const fs = require("fs");

//basic code to use it.
// (async () => {
//     // Launching the browser
//     const browser = await puppeteer.launch({ headless: false });

//     // Opening a new page
//     const page = await browser.newPage();
//     console.log("New page");

//     // Navigating to google.com
//     await page.goto('https://www.google.com'); // note the complete URL
//     console.log("To Google");

//     // Taking a screenshot
//     await page.screenshot({ path: "google.png" });

//     // Closing the browser
//     await browser.close();
// })();

//page.title() -> gives you the title of the page.
//page.$eval('tag',callback on every tag) -> ths checks the page for the tag and applies the callback function for each tage, which can be taken as a parameter.

const scrape = async ()=>{
  
    
    //launch the browser.
    const browser = await puppeteer.launch({headless:true});
    //get a new page.
    const page = await browser.newPage();
    //go to https://blog.ankitsanghvi.in/
    const BASE_URL = 'https://blog.ankitsanghvi.in/';
    await page.goto(`${BASE_URL}`);
    //evaluate the page for <article> tag, this is what i got after checking the page source, that all the blogs are stored in a article tag.

    const articles = await page.$$eval('article',array=>{
        return array.map(d=>{
            const data = {}; //we'll use this to store the data of each article.
            data['title'] = d.querySelector('.post-card-title').textContent || "N/A";
            data['dateUploaded'] = d.querySelector('time').textContent|| "N/A";
            data['desc'] = d.querySelector(".post-card-excerpt p").textContent|| "N/A";
            data['contentLink'] = d.querySelector(".post-card-content-link").href|| "N/A";
            
            return data;
        })
       
    })
    
    console.log(articles)
    //close the browser.
    await browser.close();
    fs.writeFileSync('articles.json',JSON.stringify(articles,null,2));

}

scrape()