import { createCanvas, registerFont, loadImage } from 'canvas';
import path from 'path';
import { fileURLToPath } from 'url';

export default class InstagramPost {

  constructor() {
    this.following = false;
    this.verified = false;
    this.pfp = 'https://avatars.githubusercontent.com/u/121213527?v=4';
    this.username = 'PikaBotz';
    this.watermark = false;
    this.saved = false;
    this.likes = 0;
    this.comments = 0;
    this.shares = 0;
    this.caption = '';
    this.ago = '1 year ago';
    this.liked = false;
    this.imageUrl = 'https://avatars.githubusercontent.com/u/121213527?v=4';
  }

  isFollowing(value) {
    if (typeof value === 'boolean') this.following = value;
    return this;
  }

  isVerified(value) {
    if (typeof value === 'boolean') this.verified = value;
    return this;
  }

  setPfp(url) {
    this.pfp = url;
    return this;
  }

  setUsername(name) {
    this.username = name;
    return this;
  }

  setWatermark(text) {
    this.watermark = text;
    return this;
  }

  isSaved(value) {
    if (typeof value === 'boolean') this.saved = value;
    return this;
  }

  setLikes(count) {
    this.likes = count;
    return this;
  }

  setComments(count) {
    this.comments = count;
    return this;
  }

  setShares(count) {
    this.shares = count;
    return this;
  }

  setCaption(caption) {
    this.caption = caption;
    return this;
  }

  setAgo(time) {
    this.ago = time;
    return this;
  }

  isLiked(value) {
    if (typeof value === 'boolean') this.liked = value;
    return this;
  }

  setImage(value) {
    this.imageUrl = value;
    return this;
  }

  async buildCanvas() {
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
    

// Register custom font
const fontPath = '../Fonts/Rokkitt-Regular.ttf';
registerFont(fontPath, { family: 'Rokkitt' });

// Canvas dimensions
const width = 400;
const height = 540;

  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  // Background
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, width, height);

  // Header
  const headerHeight = 60;
  ctx.fillStyle = '#1c1c1c';
  ctx.fillRect(0, 0, width, headerHeight);

  // Profile Picture with gradient border
  const profilePicSize = 44;
  const profilePicX = 10;
  const profilePicY = 8;
  const gradient = ctx.createLinearGradient(0, 0, profilePicSize, profilePicSize);
  gradient.addColorStop(0, 'red');
  gradient.addColorStop(0.14, 'orange');
  gradient.addColorStop(0.28, 'yellow');
  gradient.addColorStop(0.42, 'green');
  gradient.addColorStop(0.57, 'blue');
  gradient.addColorStop(0.71, 'indigo');
  gradient.addColorStop(0.85, 'violet');
  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(profilePicX + profilePicSize / 2, profilePicY + profilePicSize / 2, profilePicSize / 2, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#1c1c1c';
  ctx.beginPath();
  ctx.arc(profilePicX + profilePicSize / 2, profilePicY + profilePicSize / 2, (profilePicSize - 4) / 2, 0, Math.PI * 2);
  ctx.fill();

  // Load Profile Picture
  const profileImage = await loadImage(
    'https://avatars.githubusercontent.com/u/121213527?v=4'
  );
  ctx.save();
  ctx.beginPath();
  ctx.arc(profilePicX + profilePicSize / 2, profilePicY + profilePicSize / 2, (profilePicSize - 8) / 2, 0, Math.PI * 2);
  ctx.closePath();
  ctx.clip();
  ctx.drawImage(profileImage, profilePicX + 4, profilePicY + 4, profilePicSize - 8, profilePicSize - 8);
  ctx.restore();

  // Username and Info
  ctx.fillStyle = '#fff';
  ctx.font = 'bold 12px Rokkitt';
  ctx.fillText('3.69_pika', profilePicX + profilePicSize + 10, profilePicY + 16);

  ctx.font = '12px Rokkitt';
  ctx.fillStyle = '#888';
  ctx.fillText('𝐐𝐮𝐞𝐞𝐧 𝐀𝐧𝐲𝐚 𝐕2 • @𝐏𝐢𝐤𝐚𝐁𝐨𝐭𝐳', profilePicX + profilePicSize + 10, profilePicY + 36);

  // Follow Button
  ctx.fillStyle = '#fff';
  ctx.font = '12px Rokkitt';
  ctx.strokeStyle = '#fff';
  ctx.lineWidth = 1;
  ctx.strokeRect(width - 70, profilePicY + 10, 60, 20);
  ctx.fillText('Follow', width - 62, profilePicY + 25);

  // Options Dots
  ctx.font = '18px Rokkitt';
  ctx.fillStyle = '#fff';
  ctx.fillText('•••', width - 25, profilePicY + 25);

  // Image
  const postImage = await loadImage(
    'https://avatars.githubusercontent.com/u/121213527?v=4'
  );
  ctx.drawImage(postImage, 0, headerHeight, width, 400);

  // Footer
  const footerY = headerHeight + 400;
  ctx.fillStyle = '#000';
  ctx.fillRect(0, footerY, width, height - footerY);

  // Icons
  ctx.fillStyle = '#fff';
  ctx.font = '18px Rokkitt';
  ctx.fillText('♡', 10, footerY + 25); // Like
  ctx.fillText('💬', 50, footerY + 25); // Comment
  ctx.fillText('✈️', 90, footerY + 25); // Share
  ctx.fillText('🔖', width - 30, footerY + 25); // Save

  // Caption
  ctx.font = 'bold 14px Rokkitt';
  ctx.fillStyle = '#fff';
  ctx.fillText('3.69_pika', 10, footerY + 50);

  ctx.font = '14px Rokkitt';
  ctx.fillStyle = '#fff';
  ctx.fillText('Thankful for this 🥰 Happy Thanksgiving nerds!', 10, footerY + 70);

  ctx.fillStyle = '#1da1f2';
  ctx.fillText('#theultimatenerd @friend', 10, footerY + 90);

  // Time
  ctx.font = '12px Rokkitt';
  ctx.fillStyle = '#888';
  ctx.fillText('1 year ago', 10, footerY + 110);

  // Save to file or return buffer
  const buffer = canvas.toBuffer();
  return buffer;
}

// Generate the Instagram Post

  
}
