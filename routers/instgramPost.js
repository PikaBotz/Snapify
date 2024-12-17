import express from 'express';
import InstagramPost from '../InstagramPost';
const router = express.Router();

router.get('/', async (req, res) => {
    const {
        following = false,
        verified = false,
        pfp,
        username,
        watermark = false,
        saved = false,
        likes = 0,
        comments = 0,
        shares = 0,
        caption = '',
        ago = '',
        liked = false,
    } = req.query;
    if (typeof following !== 'boolean') {
        return res.status(400).json({
            status: false,
            code: 400,
            message: '"following" should be a boolean value (true/false).'
        });
    }
    if (typeof verified !== 'boolean') {
        return res.status(400).json({
            status: false,
            code: 400,
            message: '"verified" should be a boolean value (true/false).'
        });
    }
    if (typeof saved !== 'boolean') {
        return res.status(400).json({
            status: false,
            code: 400,
            message: '"saved" should be a boolean value (true/false).'
        });
    }
    if (typeof liked !== 'boolean') {
        return res.status(400).json({
            status: false,
            code: 400,
            message: '"liked" should be a boolean value (true/false).'
        });
    }
    if (isNaN(likes) || likes < 0) {
        return res.status(400).json({
            status: false,
            code: 400,
            message: '"likes" should be a valid number greater than or equal to 0.'
        });
    }
    if (isNaN(comments) || comments < 0) {
        return res.status(400).json({
            status: false,
            code: 400,
            message: '"comments" should be a valid number greater than or equal to 0.'
        });
    }
    if (isNaN(shares) || shares < 0) {
        return res.status(400).json({
            status: false,
            code: 400,
            message: '"shares" should be a valid number greater than or equal to 0.'
        });
    }
    if (!pfp || typeof pfp !== 'string') {
        return res.status(400).json({
            status: false,
            code: 400,
            message: '"pfp" (profile picture) is required and should be a valid URL or image buffer.'
        });
    }
    if (!username || typeof username !== 'string') {
        return res.status(400).json({
            status: false,
            code: 400,
            message: '"username" is required and should be a valid string.'
        });
    }
    try {
        const buffer = await new InstagramPost()
            .isFollowing(following)
            .isVerified(verified)
            .setPfp(pfp)
            .setUsername(username)
            .setWatermark(watermark)
            .isSaved(saved)
            .setLikes(likes)
            .setComments(comments)
            .setShares(shares)
            .setCaption(caption)
            .setAgo(ago)
            .isLiked(liked)
            .toAttachment();
        res.set("Content-Type", "image/png");
        return res.send(buffer);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: false,
            code: 500,
            message: error.message || 'An unexpected error occurred.'
        });
    }
});

export default router;
