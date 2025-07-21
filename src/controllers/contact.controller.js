import apiError from "../utils/api-error.js";
import catchAsync from "../utils/catch-async.js";
import sendEmail from "../utils/email-helper.js";

// Contact Form Submission Controller
export const sendContactMessage = catchAsync(async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    throw new apiError("All fields are required", 400);
  }

  const emailSubject = `New Contact Form Submission from ${name}`;
  const emailText = `
You have received a new message from your portfolio contact form.

Name: ${name}
Email: ${email}
Message:
${message}
  `;

  try {
    await sendEmail(process.env.RECIPIENT_EMAIL, emailSubject, emailText);

    res.status(200).json({
      success: true,
      message: "Your message has been sent successfully!",
    });
  } catch (err) {
    throw new apiError("Failed to send message. Please try again later.", 500);
  }
});
