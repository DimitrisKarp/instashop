const sharp = require('sharp');

Parse.Cloud.define('hello', req => {
  req.log.info(req);
  return 'Hi';
});

Parse.Cloud.define('asyncFunction', async req => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  req.log.info(req);
  return 'Hi async';
});

Parse.Cloud.beforeSave('Test', () => {
  throw new Parse.Error(9001, 'Saving test objects is not available.');
});

Parse.Cloud.beforeSaveFile(request => {
  let { fileSize } = request;
  // Convert Bytes to MB
  fileSize = fileSize / (1024 * 1024);
  if (fileSize > parseInt(process.env.MAX_FILE_SIZE)) {
    throw new Parse.Error(
      400,
      `File is too large. Max file size: ${process.env.MAX_FILE_SIZE} MB.`
    );
  }
});

Parse.Cloud.beforeSave('Landmark', async request => {
  const currentLandmark = request.original;
  const newLandmark = request.object;

  const currentPhoto = currentLandmark.get('photo');
  const newPhoto = newLandmark.get('photo');

  if (currentPhoto?.name() !== newPhoto?.name()) {
    const newPhotoBase64 = await newPhoto.getData();

    const buffer = Buffer.from(newPhotoBase64, 'base64');

    const photoThumbFileData = await sharp(buffer)
      .rotate()
      .resize(parseInt(process.env.PHOTO_WIDTH), parseInt(process.env.PHOTO_HEIGHT))
      .jpeg()
      .toBuffer();

    const photoThumbBase64Data = photoThumbFileData.toString('base64');

    const photoThumb = new Parse.File(`thumb_${newPhoto.name()}`, { base64: photoThumbBase64Data });
    await photoThumb.save();
    newLandmark.set('photo_thumb', photoThumb);
  }
});
