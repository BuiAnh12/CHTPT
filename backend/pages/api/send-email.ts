// pages/api/send-email.ts
import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { toEmail, seatInfo, money, flightNumber, ticketCode } = req.body;

    // Cấu hình transporter với thông tin SMTP
    const transporter = nodemailer.createTransport({
      service: "gmail", // Sử dụng Gmail hoặc dịch vụ bạn chọn
      auth: {
        user: "n21dccn013@student.ptithcm.edu.vn", // Địa chỉ email của bạn
        pass: "mmay jfmj dgrc qxpq", // Mật khẩu email (hoặc ứng dụng mật khẩu nếu sử dụng Gmail 2FA)
      },
    });

    // Cấu hình email
    const mailOptions = {
      from: "n21dccn013@student.ptithcm.edu.vn", // Địa chỉ email của bạn
      to: toEmail, // Email người nhận
      subject: "Đặt Vé Thành Công", // Tiêu đề email
      text: `Chúc mừng! Bạn đã đặt vé thành công cho ghế ${seatInfo}.`,
      html: `<p>Chúc mừng! Bạn đã đặt vé thành công cho ghế <strong>${seatInfo}</strong></p>
             <p>Mã máy bay: <strong>${flightNumber}</strong></p>
             <p>Mã số vé: <strong>${ticketCode}</strong></p>
             <p>Số tiền: <strong>${money}</strong></p>`,
    };

    try {
      // Gửi email
      const info = await transporter.sendMail(mailOptions);
      res.status(200).json({ message: "Email đã được gửi!", info });
    } catch (error) {
      console.error("Lỗi khi gửi email:", error);
      res.status(500).json({ message: "Đã có lỗi xảy ra khi gửi email." });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
