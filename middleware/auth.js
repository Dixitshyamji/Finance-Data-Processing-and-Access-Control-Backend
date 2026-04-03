// // Middleware to check if user has the required roles
// const authorize = (...allowedRoles) => {
//     return (req, res, next) => {
//         // Mock Auth: Hum header se role read kar rahe hain
//         const userRole = req.header('x-user-role');

//         if (!userRole) {
//             return res.status(401).json({ error: 'Access Denied: No role provided in headers (x-user-role)' });
//         }

//         if (!allowedRoles.includes(userRole)) {
//             return res.status(403).json({ 
//                 error: `Forbidden: As a ${userRole}, you don't have permission to perform this action.` 
//             });
//         }

//         // Agar permission hai, toh aage badho
//         next();
//     };
// };

// module.exports = { authorize };
// middleware/auth.js - Updated version
const authorize = (...allowedRoles) => {
    return (req, res, next) => {
        // Hum check kar rahe hain header, agar nahi hai toh testing ke liye 'Admin' maan lo (Optional)
        const userRole = req.header('x-user-role'); 

        if (!userRole) {
            // Agar aap assignment submit kar rahe hain, toh ye error rehne dena sahi hai.
            // Lekin test karne ke liye aap isse temporarily bypass kar sakte hain.
            return res.status(401).json({ 
                error: 'Unauthorized: Please add "x-user-role" in Headers (e.g., Admin, Viewer, Analyst)' 
            });
        }

        if (!allowedRoles.includes(userRole)) {
            return res.status(403).json({ 
                error: `Forbidden: Role '${userRole}' does not have access.` 
            });
        }

        next();
    };
};

module.exports = { authorize };