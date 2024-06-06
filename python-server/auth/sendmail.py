import smtplib
from app import app
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from threading import Thread

def send_mail(email, token):
    # Define email sender and receiver
    sender_email = app.config['EMAIL_SENDER']
    receiver_email = email
    password = app.config['EMAIL_PASSWORD']
    # public link 
    publicLink = app.config['PUBLIC_LINK']
    
    # Create the email subject and HTML content
    subject = "Verify Your Account"
    verify_link = f"{publicLink}/verify?token={token}"
    logo_url = "https://raw.githubusercontent.com/sangamprashant/faceauth.js/main/website/public/assets/images/tag.png"
    app_name = "faceauth.js"
    support_email = f"{publicLink}/superhero"
    
    html_content = f"""
    <html>
    <body style="font-family: Arial, sans-serif; background-color: #f7f7f7; padding: 20px; margin: 0;">
        <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px;">
            <tr>
                <td style="text-align: center; padding: 20px 20px 0;">
                    <img src="{logo_url}" alt="App Logo" style="width: 150px; margin-bottom: 20px;">
                </td>
            </tr>
            <tr>
                <td style="padding: 0 20px 20px 20px; text-align: left; color: #555555;">
                    <p>Hi,<br><br>
                       Welcome to {app_name}! We are excited to have you on board.<br><br>
                       To get started, please verify your account by clicking the button below:<br><br>
                       <a href="{verify_link}" style="background-color: #4CAF50; color: white; padding: 10px 20px; text-align: center; text-decoration: none; display: inline-block; font-size: 16px; margin: 4px 2px; cursor: pointer; border-radius: 5px;">Verify Account</a><br><br>
                       <strong>What's next?</strong><br>
                       Once your account is verified, you can log in to your profile and start creating projects. Each project will have a unique code that you can use to integrate face authentication using our library.<br><br>
                       If you did not request this email, please disregard it. Your account will not be activated without verification.<br><br>
                       For any questions or support, feel free to reach out to our support team at <a href="{support_email}">{app_name}</a>.<br><br>
                       Thank you,<br>
                       The {app_name} Team
                    </p>
                </td>
            </tr>
            <tr>
                <td style="padding: 10px; text-align: center; color: #aaaaaa; font-size: 12px;">
                    <p>&copy; {app_name}. All rights reserved.<br>
                    You received this email because you signed up for {app_name}. If you no longer wish to receive these emails, please contact support to deactivate your account.</p>
                </td>
            </tr>
        </table>
    </body>
    </html>
    """
    
    # Set up the MIME
    message = MIMEMultipart()
    message['From'] = sender_email
    message['To'] = receiver_email
    message['Subject'] = subject
    
    # Attach the HTML content to the email
    message.attach(MIMEText(html_content, 'html'))
    
    def send_email():
        # Connect to the SMTP server and send the email
        try:
            with smtplib.SMTP_SSL('smtp.gmail.com', 465) as server:
                server.login(sender_email, password)
                server.sendmail(sender_email, receiver_email, message.as_string())
            print(f"Email sent to {email}")
        except Exception as e:
            print(f"Failed to send email to {email}: {e}")

    # Start the email sending in a new thread
    email_thread = Thread(target=send_email)
    email_thread.start()
    
    return "Email sent"
