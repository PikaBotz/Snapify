import { createCanvas, loadImage } from 'canvas';

export default class InstagramPost {

  constructor() {
    this.following = false;
    this.verified = false;
    this.pfp = 'https://avatars.githubusercontent.com/u/121213527?v=4&number=69';
    this.username = 'PikaBotz';
    this.watermark = false;
    this.saved = false;
    this.likes = 0;
    this.comments = 0;
    this.shares = 0;
    this.caption = '';
    this.ago = '1 year ago';
    this.liked = false;
    this.imageUrl = 'https://avatars.githubusercontent.com/u/121213527?v=4&number=69';
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

  async toAttachment() {
    const postImage = await loadImage(this.imageUrl);
    const frameWidth = Math.min(1080, postImage.width);
    const frameHeight = Math.min(1350, postImage.height);
    const canvas = createCanvas(frameWidth, frameHeight + 200);
    const ctx = canvas.getContext('2d');
    const black = '#000';
    const white = '#fff';
    const gray = '#888';
    const blue = '#1da1f2';
    const red = '#ff0000';
    ctx.font = '14px Arial';
    ctx.fillStyle = black;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#1c1c1c';
    ctx.fillRect(0, 0, canvas.width, 60);
    const profilePic = await loadImage(this.pfp);
    ctx.beginPath();
    ctx.arc(30, 30, 22, 0, Math.PI * 2);
    ctx.fillStyle = black;
    ctx.fill();
    ctx.clip();
    ctx.drawImage(profilePic, 8, 8, 44, 44);
    ctx.restore();
    ctx.fillStyle = white;
    ctx.font = 'bold 16px Arial';
    ctx.fillText(this.username, 60, 30);
    if (this.verified) {
      const verifiedBadge = await loadImage(
        'https://upload.wikimedia.org/wikipedia/commons/e/e4/Twitter_Verified_Badge.svg'
      );
      ctx.drawImage(verifiedBadge, 60 + ctx.measureText(this.username).width + 5, 15, 16, 16);
    }
    ctx.fillStyle = gray;
    ctx.font = '12px Arial';
    const watermarkText = this.watermark ? this.watermark : 'Instagram Post';
    ctx.fillText(watermarkText, 60, 45);
    ctx.fillStyle = this.following ? white : blue;
    ctx.strokeStyle = white;
    ctx.lineWidth = 1;
    ctx.strokeRect(canvas.width - 80, 15, 65, 30);
    ctx.fillText(this.following ? 'Following' : 'Follow', canvas.width - 70, 35);
    ctx.fillStyle = white;
    ctx.font = 'bold 16px Arial';
    ctx.fillText('...', canvas.width - 20, 30);
    const aspectRatio = postImage.width / postImage.height;
    const maxAspectRatio = 16 / 9;
    const minAspectRatio = 3 / 4;
    let imgWidth = frameWidth,
      imgHeight = frameHeight;
    if (aspectRatio > maxAspectRatio) {
      imgWidth = frameHeight * maxAspectRatio;
    } else if (aspectRatio < minAspectRatio) {
      imgHeight = frameWidth / minAspectRatio;
    }
    ctx.drawImage(
      postImage,
      (frameWidth - imgWidth) / 2,
      60,
      imgWidth,
      imgHeight
    );
    const contentY = frameHeight + 70;
    const heartIcon = this.liked ? '\u2665' : '\u2661';
    const saveIcon = this.saved ? '\u{1F516}' : '\u{1F517}';
    ctx.fillStyle = this.liked ? red : white;
    ctx.fillText(`${heartIcon} ${this.likes}k`, 10, contentY);
    ctx.fillStyle = white;
    ctx.fillText(`💬 ${this.comments}`, 100, contentY);
    ctx.fillText(`✈️ ${this.shares}`, 200, contentY);
    ctx.fillStyle = this.saved ? red : white;
    ctx.fillText(`${saveIcon}`, frameWidth - 30, contentY);
    ctx.fillStyle = white;
    ctx.font = 'bold 14px Arial';
    ctx.fillText(this.username, 10, contentY + 30);
    ctx.font = '14px Arial';
    ctx.fillText(this.caption, 10, contentY + 50);
    ctx.fillStyle = gray;
    ctx.fillText(this.ago, 10, contentY + 70);
    const buffer = canvas.toBuffer('image/png');
    return buffer;
  }
  
}
