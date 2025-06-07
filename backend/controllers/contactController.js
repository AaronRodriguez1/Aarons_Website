const { sendMail } = require('../utils/mailer');

exports.sendContact = async (req, res) => {
  const { name, email, message } = req.body;
  try {
    await sendMail({ name, email, message });
    res.status(200).json({ success: true, message: 'Email sent' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Failed to send email' });
  }
};