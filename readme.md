# onestopmtb backend

## Middleware

- [x] `authMiddleware` (verify JWT or session)
- [x] `adminMiddleware` (authorize admin-only routes)
- [x] `errorMiddleware` (not found and global error handler)
- [x] `validateMiddleware` (validate req.body)

## User API Development Checklist

### User model and schema

- [x] Create User model and schema

### Controllers and Endpoints Checklist

- [x] `registerUser` – `POST /api/users/register`
- [x] `verifyEmail` – `POST /api/users/verify-email`
- [x] `resendOtp` – `POST /api/users/resend-otp`
- [x] `loginUser` – `POST /api/users/login`
- [x] `logoutUser` – `POST /api/users/logout`
- [x] `forgotPassword` – `POST /api/users/forgot-password`
- [x] `verifyOtp` – `POST /api/users/verify-otp`
- [x] `resetPassword` – `POST /api/users/reset-password`
- [x] `changePassword` – `PUT /api/users/change-password`
- [x] `getUserProfile` – `GET /api/users/profile`
- [x] `updateUserProfile` – `PUT /api/users/profile`
- [x] `updateAvatar` – `POST /api/users/avatar`
- [ ] `getAllUsers` – `GET /api/users`
- [ ] `getUserById` – `GET /api/users/:id`
- [ ] `deleteUser` – `DELETE /api/users/:id`


