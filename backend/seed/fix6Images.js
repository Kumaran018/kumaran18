const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Content = require('../models/Content');

dotenv.config();

// 6 guaranteed working tech/math/physics images
const updates = [
    {
        title: 'Advanced Security Quiz',
        url: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&q=80' // Security/Network
    },
    {
        title: 'Quantum Physics PDF',
        url: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&q=80' // Science/Physics
    },
    {
        title: 'Calculus Assessment Quiz',
        url: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&q=80' // Math/Calculus
    },
    {
        title: 'Advanced Math Quiz',
        url: 'https://images.unsplash.com/photo-1596495578065-6e0763fa1178?w=800&q=80' // Math
    },
    {
        title: 'Calculus Complete Course',
        url: 'https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?w=800&q=80' // Math/Learning
    },
    {
        title: 'Introduction to Programming - Python Basics',
        url: 'https://images.unsplash.com/photo-1526379095098-d400fd0bfce8?w=800&q=80' // Python/Code
    }
];

const fixSpecificImages = async () => {
    try {
        const mongoUri = process.argv[2] || process.env.MONGODB_URI;
        if (!mongoUri) {
            console.error('No MongoDB URI provided!');
            process.exit(1);
        }

        console.log('Connecting to database...');
        await mongoose.connect(mongoUri);
        console.log('Connected!');

        let count = 0;
        for (const update of updates) {
            const content = await Content.findOne({ title: update.title });
            if (content) {
                content.coverImage = update.url;
                await content.save();
                console.log(`Updated image for: ${update.title}`);
                count++;
            } else {
                console.log(`Could not find course: ${update.title}`);
            }
        }

        console.log(`Successfully updated ${count} courses!`);
        process.exit(0);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

fixSpecificImages();
