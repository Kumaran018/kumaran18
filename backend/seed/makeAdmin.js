const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');

dotenv.config();

const makeAdmin = async () => {
    try {
        const mongoUri = process.argv[2] || process.env.MONGODB_URI;
        if (!mongoUri) {
            console.error('No MongoDB URI provided!');
            process.exit(1);
        }

        console.log('Connecting to database...');
        await mongoose.connect(mongoUri);
        console.log('Connected!');

        const email = 'kit28.24bad082@gmail.com';
        const password = 'kums@1807';

        let user = await User.findOne({ email });

        if (user) {
            console.log('User found! Updating role and password...');
            user.role = 'admin';
            user.password = password; // The pre('save') hook in User model will hash it
            await user.save();
            console.log('Successfully updated existing user to Admin!');
        } else {
            console.log('User not found. Creating new Admin user...');
            user = await User.create({
                name: 'Kumaran Admin',
                email: email,
                password: password,
                role: 'admin',
                interests: ['Computer Science'],
                skillLevel: 'Advanced'
            });
            console.log('Successfully created new Admin user!');
        }

        process.exit(0);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

makeAdmin();
