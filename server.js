require("dotenv").config();

const express = require("express");
const path = require("path");
const { Resend } = require("resend");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.post("/send-email", async (req, res) => {
  const { name, email, subject, message } = req.body;

  try {
    if (!process.env.RESEND_API_KEY) {
      return res.status(500).json({
        success: false,
        message: "Missing RESEND_API_KEY in .env file",
      });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    const { data, error } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: ["kentoyrosales123@gmail.com"],
      subject: `Portfolio Contact: ${subject || "No Subject"}`,
      replyTo: email,
      html: `
        <h3>New Message from Portfolio</h3>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Subject:</b> ${subject}</p>
        <p><b>Message:</b></p>
        <p>${message}</p>
      `,
    });

    if (error) {
      return res.status(500).json({
        success: false,
        message: error.message || "Failed to send email",
      });
    }

    res.json({
      success: true,
      message: "Message sent successfully!",
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

// ✅ THIS MUST BE OUTSIDE
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
