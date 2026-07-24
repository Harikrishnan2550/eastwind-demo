import nodemailer from "nodemailer";
export class EnquiryController {
    /**
     * Processes solutions request submissions and emails details to harik2021a@gmail.com.
     */
    static async submitEnquiry(req, res, next) {
        try {
            const { name, email, phone, purpose, message, solutionTitle } = req.body;
            if (!name || !email || !phone || !purpose || !message) {
                res.status(400).json({ error: "Missing required contact details (name, email, phone, purpose, message)" });
                return;
            }
            // Setup transporter using the configured credentials
            const transporter = nodemailer.createTransport({
                host: process.env.EMAIL_HOST || "smtp.gmail.com",
                port: Number(process.env.EMAIL_PORT) || 587,
                secure: process.env.EMAIL_SECURE === "true",
                auth: {
                    user: process.env.EMAIL_USER || "",
                    pass: process.env.EMAIL_PASS || "",
                },
            });
            const formattedSolution = solutionTitle ? solutionTitle : "General Solution Portfolio";
            const mailOptions = {
                from: `"Eastwind Enquiry" <${process.env.EMAIL_USER || "no-reply@eastwindsafety.com"}>`,
                to: "harik2021a@gmail.com",
                subject: `Eastwind Solutions - New Enquiry: ${formattedSolution}`,
                html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 25px; border: 1px solid #e2e8f0; border-radius: 16px; background-color: #ffffff;">
            <h2 style="color: #ea580c; text-align: center; text-transform: uppercase; margin-bottom: 20px;">Eastwind Solutions Enquiry</h2>
            <p style="font-size: 14px; color: #475569; line-height: 1.6;">You have received a new technical solution proposal request from the website client portal.</p>
            
            <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px; margin: 25px 0;">
              <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #64748b; width: 140px;">Customer Name:</td>
                  <td style="padding: 8px 0; color: #0f172a; font-weight: 600;">${name}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #64748b;">Email Address:</td>
                  <td style="padding: 8px 0; color: #0f172a; font-weight: 600;"><a href="mailto:${email}" style="color: #ea580c; text-decoration: none;">${email}</a></td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #64748b;">Phone Number:</td>
                  <td style="padding: 8px 0; color: #0f172a; font-weight: 600;">${phone}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #64748b;">Application Purpose:</td>
                  <td style="padding: 8px 0; color: #0f172a; font-weight: 600; text-transform: capitalize;">${purpose}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #64748b;">Target Solution:</td>
                  <td style="padding: 8px 0; color: #ea580c; font-weight: bold;">${formattedSolution}</td>
                </tr>
              </table>
            </div>
            
            <div style="border-top: 1px solid #f1f5f9; padding-top: 20px;">
              <h3 style="font-size: 13px; font-weight: bold; color: #475569; margin-bottom: 8px;">Message / Technical Scope:</h3>
              <p style="background-color: #f8fafc; border-left: 4px solid #ea580c; padding: 15px; margin: 0; font-size: 13px; color: #334155; line-height: 1.6; border-radius: 0 8px 8px 0; white-space: pre-wrap;">${message}</p>
            </div>
            
            <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 30px 0 20px 0;" />
            <p style="color: #94a3b8; font-size: 11px; text-align: center;">This message was generated dynamically by the Eastwind Administrative Security Gateway.</p>
          </div>
        `,
            };
            // Dispatch mail asynchronously in the background
            transporter.sendMail(mailOptions)
                .then((info) => {
                console.log(`[SMTP Mail] Solution enquiry email successfully forwarded to harik2021a@gmail.com. Message ID: ${info.messageId}`);
            })
                .catch((err) => {
                console.error("[SMTP Mail Error] Failed to forward solution enquiry email:", err);
            });
            // Always print details to console for fallback/testing verification
            console.log(`\n==================================================`);
            console.log(`[DEMO ENQUIRY RECEIVED]`);
            console.log(`Customer: ${name}`);
            console.log(`Email: ${email}`);
            console.log(`Phone: ${phone}`);
            console.log(`Purpose: ${purpose}`);
            console.log(`Solution: ${formattedSolution}`);
            console.log(`Message: ${message}`);
            console.log(`==================================================\n`);
            res.json({ success: true, message: "Enquiry submitted successfully. Our engineering team has been notified." });
        }
        catch (error) {
            next(error);
        }
    }
}
