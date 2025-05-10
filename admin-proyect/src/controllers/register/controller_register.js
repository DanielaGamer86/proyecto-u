import userModel from '../../models/register/model_register.js';

const registerController = {
    async register(req, res) {
        try {
            const { nombre, email, telefono, password_md5 } = req.body;

            // Basic validation
            if (!nombre?.trim() || !email?.trim() || !telefono?.trim() || !password_md5) {
                return res.status(400).json({ 
                    success: false,
                    error: 'All fields are required' 
                });
            }

            // Name length validation
            if (nombre.trim().length < 5) {
                return res.status(400).json({
                    success: false,
                    error: 'Name must be at least 5 characters long'
                });
            }

            // Get all users and validate
            const existingUsers = await userModel.getAllUsers();
            
            // Check for duplicates
            const normalizedEmail = email.toLowerCase().trim();
            const normalizedNombre = nombre.toLowerCase().trim();
            const normalizedTelefono = telefono.trim();

            const duplicateEmail = existingUsers.find(user => 
                user.email.toLowerCase() === normalizedEmail
            );
            if (duplicateEmail) {
                return res.status(409).json({
                    success: false,
                    error: 'Email already registered'
                });
            }

            const duplicatePhone = existingUsers.find(user => 
                user.telefono === normalizedTelefono
            );
            if (duplicatePhone) {
                return res.status(409).json({
                    success: false,
                    error: 'Phone number already registered'
                });
            }

            const duplicateName = existingUsers.find(user => 
                user.nombre.toLowerCase() === normalizedNombre
            );
            if (duplicateName) {
                return res.status(409).json({
                    success: false,
                    error: 'Name already registered'
                });
            }

            // If no duplicates found, create user
            const newUser = await userModel.createUser({
                nombre,
                email,
                telefono,
                password_md5
            });

            return res.status(201).json({
                success: true,
                user: newUser,
                message: 'User registered successfully'
            });
        } catch (error) {
            console.error('Registration error:', error);
            return res.status(500).json({ 
                success: false,
                error: error.message || 'Server error during registration'
            });
        }
    }
};

export default registerController;