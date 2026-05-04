const nodemailer = require("nodemailer");
const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Homepage route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

// Contact form route
app.post("/contact", (req, res) => {
  const { name, email, subject, message } = req.body;

  console.log("New Contact Message:");
  console.log({ name, email, subject, message });

  res.json({
    success: true,
    message: "Thank you! Your message has been sent successfully.",
  });
});

app.post("/send-email", async (req, res) => {
  const { name, email, subject, message } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "egijoefranmorales123@gmail.com", // your email
        pass: "gwpuhdreotnpkmas", // not your real password
      },
    });

    const mailOptions = {
      from: email,
      to: "egijoefranmorales123@gmail.com",
      subject: `Portfolio Contact: ${subject}`,
      html: `
        <h3>New Message from Portfolio</h3>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Message:</b></p>
        <p>${message}</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.json({ success: true, message: "Message sent successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to send message" });
  }
});

app.listen(PORT, () => {
  console.log(`Portfolio website running at http://localhost:${PORT}`);
});
