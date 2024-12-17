import { createCanvas, registerFont, loadImage } from 'canvas';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Register custom font
const fontPath = path.join(__dirname, 'Assets', 'Rokkitt-Regular.ttf');
console.log(fontPath);
registerFont(fontPath, { family: 'Rokkitt' });

const likePng = path.join(__dirname, 'Assets', 'like.png');

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
    const profileImage = await loadImage(this.pfp);
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

    // Post Image
    const postImage = await loadImage(this.imageUrl);
    ctx.drawImage(postImage, 0, headerHeight, width, 400);

    // Footer
    const footerY = headerHeight + 400;
    ctx.fillStyle = '#000';
    ctx.fillRect(0, footerY, width, height - footerY);

    // --- LIKE ICON (Heart PNG) ---
// Canvas dimensions and other setup code remains unchanged

// Inside the buildCanvas method...

// --- LIKE ICON (Heart PNG) ---
const heartImage = await loadImage(likePng); // Replace with the path to your heart PNG image
const heartX = 10; // X position of the heart image
const heartY = footerY + 10; // Y position of the heart image
const heartSize = 30; // Size of the heart image

// Draw the heart image
ctx.drawImage(heartImage, heartX, heartY, heartSize, heartSize);

// --- LIKE COUNT (Next to the heart) ---
ctx.font = '20px Rokkitt'; // Font style for like count
ctx.fillStyle = '#fff'; // Text color (white)
const likeCount = this.likes; // Replace with the actual like count
ctx.fillText(likeCount, heartX + heartSize - 3, heartY + 20); // Position the like count to the right of the heart

// Caption and Time...
    
    // --- COMMENT ICON (Speech Bubble) ---
    ctx.fillStyle = '#00ff00'; // Green color for the comment bubble
    ctx.beginPath();
    ctx.moveTo(100, footerY + 15);
    ctx.lineTo(160, footerY + 15); // Bottom line
    ctx.lineTo(160, footerY - 15); // Right side
    ctx.lineTo(100, footerY - 15); // Left side
    ctx.closePath();
    ctx.fill();

    // Triangle for the speech bubble tail
    ctx.beginPath();
    ctx.moveTo(110, footerY - 15);
    ctx.lineTo(120, footerY - 45); // Tail point
    ctx.lineTo(130, footerY - 15);
    ctx.closePath();
    ctx.fill();

    // --- SHARE ICON (Arrow) ---
    ctx.fillStyle = '#0000ff'; // Blue color for the share icon
    ctx.beginPath();
    ctx.moveTo(200, footerY + 15); // Starting point for the arrow shaft
    ctx.lineTo(250, footerY + 15); // End of the shaft
    ctx.lineTo(250, footerY - 5); // Right side of the shaft
    ctx.lineTo(280, footerY - 5); // Arrow right part
    ctx.lineTo(250, footerY - 25); // Back to shaft
    ctx.lineTo(250, footerY - 45); // Ending part of arrow
    ctx.lineTo(240, footerY - 55); // Bottom left part of the arrow
    ctx.closePath();
    ctx.fill();

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
}
