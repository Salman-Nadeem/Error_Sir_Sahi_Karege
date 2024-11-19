const User = require("../model/User");
const upload = require("../imageupldoa/image")

function getUser(req, res) {
    res.render('index')
}

async function createUser(req, res) {

    upload.single('image')(req, res, async (err) => {
        if (err) {
            return res.status(500).json({ error: err });
        }

        const { name, email, password } = req.body;

        const imageUrl = req.file ? req.file.path : null;

        const newUser = await new User({
            name,
            email,
            password,
            Image: imageUrl,  // Store Cloudinary image URL
        });

        try {
            // Save the user to MongoDB
            await newUser.save();
            res.json({ message: 'User created successfully!', data: newUser });
        } catch (error) {
            console.log('Error:', error);
            res.status(500).json({ error: error });
        }
    });
};






async function getalldata(req, res) {
    try {

        const read = await User.find();
        console.log(read)
        res.render('read', { read });
    } catch (err) {
        console.log('Error fetching answers:', err);
        res.status(500).send('Error fetching data');
    }
}

async function get_update_data(req, res) {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).send('User not found');
        }
        res.render('update', { user });
    } catch (err) {
        console.log('Error fetching user:', err);
        res.status(500).send('Server error');
    }
}


async function update(req, res) {
    try {
        const { name, email, password } = req.body;  // Extract data from the form
        
       console.log(req.body.name)

        // Find user by ID
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).send('User not found');
        }

        // Handle image upload if a new image is provided
        let imageUrl = user.Image;  // Use existing image URL if no new image is uploaded
        if (req.files && req.files.image) {
            const cloudinaryResult = await cloudinary.uploader.upload(req.files.image.tempFilePath);
            imageUrl = cloudinaryResult.secure_url; // Get the new image URL from Cloudinary
        }

        // If password is provided, hash it before saving
        if (password && password.trim() !== '') {
            const salt = await bcrypt.genSalt(10);  // Generate a salt
            const hashedPassword = await bcrypt.hash(password, salt);  // Hash the password
            user.password = hashedPassword;  // Update password with the hashed version
        }

        // Update user details
        user.name = name;
        user.email = email;
        user.Image = imageUrl;  // Updated image URL (if new image is uploaded)

        // Save updated user data
        await user.save();

        // Redirect to users list page (or any other page after update)
        res.redirect('/read');
    } catch (err) {
        console.log('Error updating user:', err);
        res.status(500).send('Error updating user');
    }
}
 
     

 
async function Deleted(req, res) {
    try {
        // Find and delete the user by ID
        const user = await User.findByIdAndDelete(req.params.id);
        res.render('index');
    } catch (error) {
        console.log(error);
        res.status(500).send('Error deleting user');
    }
}





module.exports = { getUser, createUser, getalldata, get_update_data, update  , Deleted}
