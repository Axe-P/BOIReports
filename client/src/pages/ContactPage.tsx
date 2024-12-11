import './ContactPage.css';  // Separate CSS file for styling

const ContactPage = () => {
  return (
    <div className="contact-page">
      <h3>If you have any questions or concerns</h3>
      <h1>Contact Pax Accounting</h1>
      <p>You may reach out to us by calling or texting at the number below:</p>
      <p className="contact-info">
        <a href="tel:+18019210883" className="contact-link">801-921-0883</a>
      </p>
      <p>Alternatively, you can reach us via email:</p>
      <p className="contact-info">
        <a href="mailto:paxtaxes@gmail.com" className="contact-link">paxtaxes@gmail.com</a>
      </p>
      <p>If you're ready to file your BOI Report, please visit our <a href="/form">Filing Page</a>!</p>
    </div>
  );
};

export default ContactPage;
