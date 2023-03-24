const { Bannerbear } = require('bannerbear');

const API_KEY = 'your_api_key';
const TEMPLATE_UID = 'template_id';

const bb = new Bannerbear(API_KEY);

module.exports.generateImage = async (screenshotUrls) => {
  const images = await bb.create_image(
    TEMPLATE_UID,
    {
      modifications: [
        {
          name: 'desktopimagecontainer',
          image_url: screenshotUrls[0],
        },
        {
          name: 'tabletimagecontainer',
          image_url: screenshotUrls[1],
        },
        {
          name: 'phoneimagecontainer',
          image_url: screenshotUrls[2],
        },
      ],
    },
    true
  );

  return images?.image_url_jpg;
};

module.exports.screenshot = async (websiteUrl) => {
  const screenshot = async (width, height) => await bb.create_screenshot(websiteUrl, { width: width, height: height }, true);

  const screenshots = await Promise.all([screenshot(1024, 768), screenshot(768, 1024), screenshot(360, 800)]);

  return screenshots.map((view) => view.screenshot_image_url);
};
