# Formspree Setup Guide – Contact Form

Your contact form is set up to use **Formspree** so "Send Message" actually delivers submissions to your email. Follow these steps once to finish setup.

---

## 1. Create a Formspree Account (Free)

1. Go to **https://formspree.io**
2. Click **Get Started** or **Sign Up**
3. Sign up with your email (e.g. **hrteam@codebeacons.in**) or use Google/GitHub

---

## 2. Create a New Form

1. After login, click **New Form** (or **+ New Form**)
2. **Form name:** e.g. `Code Beacons Contact`
3. **Email:** Use the address where you want to receive messages (e.g. **hrteam@codebeacons.in**)
4. Click **Create Form**

---

## 3. Get Your Form ID

1. On the form’s page you’ll see an **Endpoint** URL, e.g.  
   `https://formspree.io/f/mjvnqkzw`
2. The **Form ID** is the part after `/f/` — e.g. **mjvnqkzw**

---

## 4. Add the Form ID to Your Website

1. Open **contact.html** in your project
2. Find this line:
   ```html
   <form id="contactForm" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
   ```
3. Replace **YOUR_FORM_ID** with your actual Form ID, e.g.:
   ```html
   <form id="contactForm" action="https://formspree.io/f/mjvnqkzw" method="POST">
   ```
4. Save the file, then commit and push to GitHub so the live site uses the new URL.

---

## 5. (Optional) Formspree Settings

In the Formspree dashboard you can:

- **Redirect after submit** – leave off so the built-in “Message Sent Successfully!” message is used
- **Auto-respond** – send an automatic “We received your message” email to the visitor
- **Spam filter** – keep it on to reduce junk
- **Notifications** – get email (and optionally Slack) when someone submits

---

## Free Tier Limits

- **50 submissions per month** on the free plan  
- If you need more, Formspree has paid plans  
- No credit card required for the free tier  

---

## Testing

1. Deploy the site with the updated `contact.html` (Form ID replaced).
2. Open the Contact page and fill the form with a test message.
3. Click **Send Message** — you should see the success message and receive an email at the address you set in Formspree.

---

## Summary Checklist

- [ ] Sign up at https://formspree.io  
- [ ] Create a new form and set your email (e.g. hrteam@codebeacons.in)  
- [ ] Copy the Form ID from the endpoint URL  
- [ ] In **contact.html**, replace `YOUR_FORM_ID` with that ID  
- [ ] Save, commit, and push to GitHub  
- [ ] Test the Contact form on the live site  

After this, all contact form submissions will be sent to your email via Formspree.
