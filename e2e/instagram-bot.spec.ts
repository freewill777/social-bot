import { Page, test } from "@playwright/test";
const fs = require("fs");
import { Config } from "./tiktok-bot.spec";

const configFile = fs.readFileSync("config.json", "utf-8");
const config = JSON.parse(configFile) as Config;

var canRun = true;

test("Instagram bot", async ({ page }) => {
  await setUp(page);

  while (true) {
    await goToNextPage(page);
    canRun = true;

    await openPhotoModal(page, 0);
    await interactWithCurrentOpenPhoto(page);

    await page.waitForTimeout(getRandomNumber());

    while (canRun) {
      try {
        goToNextPhoto(page);
        await interactWithCurrentOpenPhoto(page);
      } catch (e) {
        await goToNextPage(page);
      }
    }
  }
});

async function setUp(page) {
  var url = "https://www.instagram.com";
  var username = config.instagram.username;
  var password = config.instagram.password;
  await page.goto(url);

  try {
    await page.waitForSelector('button:has-text("Decline optional cookies")');
    await page.click('button:has-text("Decline optional cookies")');
    console.log("Decline cookies");
  } catch (error) {
    console.log("");
  }
  await page.locator('input[name="username"]').fill(username);
  console.log("Fill in username");
  await page.locator('input[name="password"]').fill(password);
  console.log("Fill in password");
  await page.locator('button:has-text("Log in") >> nth=0').click();
  await clickIfPresent(page, 'button:has-text("Save Info")');
  await clickIfPresent(page, 'button:has-text("Not Now")');
  console.log("Page set up finished");
}

async function interactWithCurrentOpenPhoto(page: Page) {
  await page.locator('svg:has(title:has-text("Like"))').first().click();
  await page.locator('svg:has(title:has-text("Like"))').last().click();
  console.log("Post & comments liked");
  const element = await page.$('body:has-text("marilynmax2000")');

  try {
    await page.waitForSelector('textarea[aria-label="Add a comment…"]', {
      timeout: 4000,
    });
    await page
      .locator('textarea[aria-label="Add a comment…"]')
      .fill(getRandomCompliment());

    if (element) {
      await goToNextPhoto(page);
      console.log("Skipping interaction");
    } else {
      await page.locator('div:has-text("Post")').last().click();
      console.log("Compliment added");
    }
  } catch (error) {
    console.log("");
  }
}

async function openPhotoModal(page: Page, photoIndex: number) {
  await page.waitForSelector(
    "div:has(div:has(div:has(a:has(div:has(div:has(img))))))"
  );
  await page
    .locator("div:has(div:has(div:has(a:has(div:has(div:has(img))))))")
    .nth(photoIndex)
    .click();
}

async function goToNextPhoto(page: Page) {
  try {
    await page.waitForSelector('svg[aria-label="Next"]', {
      timeout: 4000,
    });
    await page.locator('svg[aria-label="Next"]').click();
  } catch (error) {
    canRun = false;
  }
}

async function goToNextPage(page: Page) {
  await page.goto(getRandomTagPage());
}

function getRandomNumber() {
  const min = 5000;
  const max = 8000;
  const randomNumber = Math.random() * (max - min) + min;
  return Math.floor(randomNumber);
}

function getRandomCompliment() {
  const compliments = [
    "You're super cute, seriously! 😄💖",
    "Your smile is like, amazing! 😁❤️",
    "Your eyes say a lot, in a good way! 👀😊",
    "You're so cool and everyone notices! 😎✌️",
    "You're, like, totally charming. 😘🔥",
    "You light up any place you're in. 🌟✨",
    "You've got this awesome energy. 💥👍",
    "Every time I see you, it's like a happy surprise. 🎉😉",
    "Your beauty is like, off the charts! 💖🌟",
    "You make my heart race, for real! 🏁💓",
    "Your confidence is, like, super inspiring! 💪🤩",
    "Your style is always on point, seriously! 👗👌",
    "Every moment with you is special, seriously. 💎❤️",
    "You make my heart beat faster. ❤️💓",
    "You're flawless and totally fab. 💃✨",
    "You're like a charming masterpiece. 🖼️😘",
    "You make even regular stuff extra cool. 🌟🌹",
    "You're just super captivating. 😎🔥",
    "You're a bit mysterious but that's cool. 🕵️‍♂️🌟",
    "You're the best part of my day. 🌞😄",
    "You've got this mysterious and cool vibe. 😏🌠",
    "You're sweeter than honey, no kidding! 🍯🌸",
    "Being around you is like a magical adventure. 🧚✨",
    "You've got something special, seriously. 🌟😘",
    "Everyone notices you, you're like, the star. ⭐💃",
    "You're a total work of art. 🎨👌",
    "You're like a dream come true. 💭💖",
    "You bring out the best in me, seriously. 🌞❤️",
    "You're a bit mysterious, but that's what makes you cool. 🌟🕵️‍♂️",
    "You're the best part of my day, every day. ✨🌞",
    "You've got this cool and sophisticated vibe. 😌🔥",
    "Every day with you is a good day, for sure. 🌞👌",
    "You're like a breath of fresh air. 🌬️🌺",
    "You're just radiant and amazing. 😊💋",
    "You're a heartthrob, no doubt. ❤️😍",
    "You've got this cool confidence and charm. 😎💖",
    "You're irresistibly charming and graceful. 💖🌟",
    "You've got this spark that makes you stand out. ✨🔥",
    "You're the definition of elegance. 💃💎",
    "You make my heart skip a beat, seriously. 💓❤️",
    "You're stunning inside and out, totally. 🌟💖",
    "You're like, pure magic to me. 🎩✨",
    "You're a timeless beauty, no joke. ⏳💖",
    "You always bring a smile to my face. 😃❤️",
    "You're a precious gem, seriously. 💎✨",
    "You're super impressive, honestly. 😲🌟",
    "Every day with you is just really great. 🌞👍",
    "You make life so exciting. 🌍🌄",
    "You're truly delightful to know. 😊🌸",
    "You're my favorite kind of distraction, seriously. 🙃🔥",
    "You're a true vision. 😍",
    "Absolutely stunning! 💫",
    "Your presence is enchanting. ✨",
    "You make my heart skip a beat. 💓",
    "You're captivating. 😊👀",
    "Elegance personified. 👸",
    "Radiating beauty. 😘❤️",
    "You're the definition of grace. 💖",
    "I'm mesmerized by you. 😌💕",
    "Every moment with you is a treasure. 💎",
    "You light up my life. 🌟",
    "Incomparably lovely. 😊",
    "You're the most beautiful person I know. 💞",
    "I can't take my eyes off you. 👀😍",
    "You're a heartwarming presence. 💓",
    "An absolute sweetheart. 🥰",
    "You're a work of art. 🎨",
    "You're my happy place. 😊❤️",
    "Effortlessly charming. 😘",
    "You're a true gem. 💎❤️",
    "A masterpiece of beauty. 🖼️",
    "You make life more beautiful. 🌺",
    "Irresistibly magnetic. 🧲",
    "You have a smile that melts hearts. 😊💘",
    "A vision of loveliness. 💫",
    "You bring joy to my soul. 😄❤️",
    "You're the epitome of grace. 🕊️",
    "Absolutely lovely. 💗",
    "You're a dream come true. 💭",
    "My heart belongs to you. ❤️",
    "You're a shining star. ⭐",
    "You're the sunshine in my life. 🌞",
    "An enchanting spirit. 💫❤️",
    "You have a heart of gold. 💛",
    "Absolutely radiant. 🌟",
    "You're a true inspiration. 🌠",
    "You make the world a better place. 🌎❤️",
    "A true beauty, inside and out. 💖",
    "You're a rare and precious find. 💎",
    "You have a way of making hearts sing. 🎶❤️",
    "My world is better with you in it. 🌍",
    "A true treasure. 🌟💎",
    "You're the light of my life. 💡",
    "Unbelievably charming. 😊💖",
    "You're the missing piece to my puzzle. 🧩❤️",
    "You're a masterpiece of grace and beauty. 🎨💫",
    "A heartwarming presence in my life. 💓",
    "You're the apple of my eye. 🍎❤️",
    "You're a breath of fresh air. 🌬️",
    "You make my heart dance with joy. 💃❤️",
    "A true romantic at heart. ❤️🌹",
    "🌟",
    "😊",
    "💖",
    "😍🌺",
    "💓😊",
    "💎💖",
    "😄❤️",
    "😊🌟",
    "☀️🌥️",
    "😘✨",
    "🌸😊",
    "🌟💫",
    "😊❤️",
    "👀😍",
    "🍯🌹",
    "😊❤️",
    "😘❤️",
    "🎶❤️",
    "😊❤️",
    "😍💖",
    "👑🌸",
    "😘❤️",
    "💎❤️",
    "😊🌼",
    "💛",
    "🌠",
    "😄💓",
    "🌟",
    "🌞",
    "🍯🌹",
    "😊✨",
    "🌺",
    "👀😍",
    "🌈❤️",
    "🌞❤️",
    "😊❤️",
    "🥰",
    "🌸💫",
    "😘❤️",
    "🌟💛",
    "🎶❤️",
    "🌟🌞",
    "😊✨",
    "😄😄💖❤️",
    "😍🌟",
    "💛❤️",
    "😊🌞",
    "😄💖",
    "😊🌟",
    "💎💖",
    "😊❤️",
    "🌸💖",
  ];

  const randomIndex = Math.floor(Math.random() * compliments.length);
  console.log("Compliment added: ", compliments[randomIndex]);
  return compliments[randomIndex];
}

async function clickIfPresent(page: Page, selector: string) {
  try {
    await page.waitForSelector(selector);
    await page.click(selector);
    console.log("Clicked: ", selector);
  } catch (error) {
    console.log("clickIfPresent error ");
  }
}

function getRandomTagPage() {
  const tagsPage = [
    "https://www.instagram.com/explore/tags/onlyfanscreator",
    "https://www.instagram.com/explore/tags/onlyfansdotcom",
    "https://www.instagram.com/explore/tags/mustangonlyfans",
    "https://www.instagram.com/explore/tags/onlyfanselite",
    "https://www.instagram.com/explore/tags/onlyfanschile",
    "https://www.instagram.com/explore/tags/onlyfansphotographer",
    "https://www.instagram.com/explore/tags/onlyfansrecruiter",
    "https://www.instagram.com/explore/tags/onlyfansgirlstwerking",
    "https://www.instagram.com/explore/tags/onlyfansmilf",
    "https://www.instagram.com/explore/tags/followmeononlyfans",
    "https://www.instagram.com/explore/tags/uncensoredonlyfans",
    "https://www.instagram.com/explore/tags/onlyfanscreators",
    "https://www.instagram.com/explore/tags/checkoutmyonlyfans",
    "https://www.instagram.com/explore/tags/onlyfansinbio",
    "https://www.instagram.com/explore/tags/guysofonlyfans",
    "https://www.instagram.com/explore/tags/uncensoredononlyfans",
    "https://www.instagram.com/explore/tags/seemoreononlyfans",
    "https://www.instagram.com/explore/tags/onlyfansretreats",
    "https://www.instagram.com/explore/tags/onlyfansstoner",
    "https://www.instagram.com/explore/tags/onlyfansparty",
    "https://www.instagram.com/explore/tags/onlyfanswinner",
    "https://www.instagram.com/explore/tags/onlyfansreal",
    "https://www.instagram.com/explore/tags/onlyfansnsfw",
    "https://www.instagram.com/explore/tags/onlyfansshoutouts",
    "https://www.instagram.com/explore/tags/onlyfanscanappreciate",
    "https://www.instagram.com/explore/tags/onlyfansgetthis",
    "https://www.instagram.com/explore/tags/mosqitoesaremyonlyfans",
    "https://www.instagram.com/explore/tags/theonlyfansheallows",
    "https://www.instagram.com/explore/tags/coldplaysonlyfans",
    "https://www.instagram.com/explore/tags/whenwearetheonlyfans",
    "https://www.instagram.com/explore/tags/onlyfansforthefam",
    "https://www.instagram.com/explore/tags/theonlyfansforus",
    "https://www.instagram.com/explore/tags/number1andonlyfans",
    "https://www.instagram.com/explore/tags/onlyfanssamantharay",
    "https://www.instagram.com/explore/tags/areyouanonlyfans",
    "https://www.instagram.com/explore/tags/hottwinsononlyfans",
    "https://www.instagram.com/explore/tags/onlyfanscomingsoon",
    "https://www.instagram.com/explore/tags/onlyfansspotlight",
    "https://www.instagram.com/explore/tags/onlyfansmodels",
    "https://www.instagram.com/explore/tags/altgirlsofonlyfans",
  ];

  const randomIndex = Math.floor(Math.random() * tagsPage.length);
  console.log("Operating on: ", tagsPage[randomIndex]);
  return tagsPage[randomIndex];
}
