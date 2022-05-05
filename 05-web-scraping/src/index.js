import jsdom from "jsdom";
import fetch from "isomorphic-fetch"
import puppeteer from "puppeteer"

const url = "https://fr.wikipedia.org/wiki/Canton_(Suisse)#Donn%C3%A9es_cantonales"; // Set website you want to screenshot

const Screenshot = async () => {                 // Define Screenshot function
    const browser = await puppeteer.launch();    // Launch a "browser"
    const page = await browser.newPage();        // Open a new page

    await page.goto(url);                        // Go to the website

    const tabNbrCantons = await page.$$("tbody tr");

    tabNbrCantons.forEach(canton => {
        let selecteurCanton = await canton.$$("th:first-child");
        let selecteurPopulation = await canton.$$("bdi s");
        console.log(selecteurCanton + " => " + selecteurPopulation);
        
    });

    await page.screenshot({                         // Screenshot the website using defined options
        path: "./screenshot.png",                   // Save the screenshot in current directory
        fullPage: true                              // take a fullpage screenshot
    });

    await page.close();                           // Close the website
    await browser.close();                        // Close the browser

}

Screenshot();                                   // Call the Screenshot function


/////ECOMMERCE
const urlEcomm = "https://www.webscraper.io/test-sites/e-commerce/allinone/computers/laptops";

const ScreenshotEcomm = async () => {                 // Define Screenshot function
    const browser = await puppeteer.launch();    // Launch a "browser"
    const page = await browser.newPage();        // Open a new page

    await page.goto(urlEcomm);                        // Go to the website

    const tabNbrProduits = await page.$$("tbody tr");
    const tabJsonEcomm = [];

    tabNbrProduits.forEach(canton => {
        let selecteurProduit = await canton.$$("th:first-child");
        let selecteurPrix = await canton.$$("bdi s");
        let selecteurEtoile = await canton.$$("bdi s");

        let infosProduit = {
            "produit": selecteurProduit,
            "prix": selecteurPrix,
            "etoile": selecteurEtoile
        }
        tabJsonEcomm.push(infosProduit);

        
    });

    console.log(tabJsonEcomm);

    await page.screenshot({                         // Screenshot the website using defined options
        path: "./screenshot.png",                   // Save the screenshot in current directory
        fullPage: true                              // take a fullpage screenshot
    });

    await page.close();                           // Close the website
    await browser.close();                        // Close the browser

}

ScreenshotEcomm();  