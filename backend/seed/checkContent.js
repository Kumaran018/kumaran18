const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Content = require('../models/Content');

dotenv.config();

const checkContent = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        
        const totalContent = await Content.countDocuments();
        console.log(`\n✅ Total Content in Database: ${totalContent}\n`);
        
        // Count by subject
        const subjects = ['Computer Science', 'Web Development', 'AI/ML', 'Mathematics', 'Physics', 'Cyber Security'];
        
        console.log('📚 Content by Subject:');
        for (const subject of subjects) {
            const count = await Content.countDocuments({ subject });
            console.log(`   ${subject}: ${count} resources`);
        }
        
        console.log('\n📊 Content by Type:');
        const types = ['video', 'pdf', 'quiz'];
        for (const type of types) {
            const count = await Content.countDocuments({ type });
            console.log(`   ${type}: ${count} resources`);
        }
        
        console.log('\n🎯 Content by Difficulty:');
        const difficulties = ['Beginner', 'Intermediate', 'Advanced'];
        for (const difficulty of difficulties) {
            const count = await Content.countDocuments({ difficulty });
            console.log(`   ${difficulty}: ${count} resources`);
        }
        
        console.log('\n');
        process.exit(0);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

checkContent();
