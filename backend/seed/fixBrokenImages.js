const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Content = require('../models/Content');

dotenv.config();

const replaceBrokenImages = async () => {
    try {
        const mongoUri = process.argv[2] || process.env.MONGODB_URI;
        if (!mongoUri) {
            console.error('No MongoDB URI provided!');
            process.exit(1);
        }

        console.log('Connecting to database...');
        await mongoose.connect(mongoUri);
        console.log('Connected!');

        const fixes = [
            {
                title: 'Cybersecurity Basics',
                url: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&q=80' // Safe tech image
            },
            {
                title: 'Advanced Threat Detection',
                url: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&q=80' // Safe matrix/code image
            },
            {
                title: 'Advanced Security Quiz',
                url: 'https://images.unsplash.com/photo-1614064641913-6b7445c553b6?w=800&q=80' // Safe security image
            }
        ];

        let count = 0;
        for (const fix of fixes) {
            const content = await Content.findOne({ title: fix.title });
            if (content) {
                content.coverImage = fix.url;
                await content.save();
                console.log(`Updated ${fix.title}`);
                count++;
            }
        }

        console.log(`Successfully updated ${count} broken images!`);
        process.exit(0);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

replaceBrokenImages();
