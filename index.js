import puppeteer from "puppeteer";
//Scrape movie search result page for movie photo/picture
const getMoviePhoto = async (page) => {
    const moviePhoto = await page.evaluate(() => {
        const moviePhotoLink = document.getElementsByClassName("css-18pmxw3")[0].src;
        return { moviePhotoLink };
    });
    console.log(moviePhoto);
    return moviePhoto;
};

const getQuotes = async () => {
    // Start a Puppeteer session with:
    // - a visible browser (`headless: false` - easier to debug because you'll see the browser in action)
    // - no default viewport (`defaultViewport: null` - website page will in full width and height)
    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
    });

    // Open a new page
    const page = await browser.newPage();

    // On this new page:
    // - open the "https://reelgood.com/" website
    // - wait until the dom content is loaded (HTML is ready)
    await page.goto("https://reelgood.com/show/godfather-of-harlem", {
        waitUntil: "domcontentloaded",
    });
    await getMoviePhoto(page);

    // await page.goto(link, {
    //     waitUntil: "domcontentloaded",
    // });

    //   // Close the browser
    //   await browser.close();
};

// Start the scraping
getQuotes();