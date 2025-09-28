import React, { useState } from 'react';
import './FAQ.css';

const FAQ = () => {
  const [openItem, setOpenItem] = useState(-1);

  const faqs = [
    {
      question: "What's included in a package?",
      answer: "Typically flights, hotel, and select activities. Each package lists its inclusions clearly above the price."
    },
    {
      question: "Can I change dates after booking?",
      answer: "Yes, many packages support flexible changes. Policies vary by hotel/airline and are shown before checkout."
    },
    {
      question: "Do you offer payment plans?",
      answer: "Split payments are available on select itineraries at checkout."
    }
  ];

  const toggleItem = (index) => {
    setOpenItem(openItem === index ? -1 : index);
  };

  return (
    <section id="faq" className="faq-section">
      <div className="faq-container">
        <h2>FAQs</h2>
        <div className="faq-list">
          {faqs.map((faq, index) => (
            <div key={index} className={`faq-item ${openItem === index ? 'open' : ''}`}>
              <button 
                className="faq-question"
                onClick={() => toggleItem(index)}
              >
                <span>{faq.question}</span>
                <svg 
                  width="20" 
                  height="20" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="1.5"
                  className={`faq-icon ${openItem === index ? 'rotated' : ''}`}
                >
                  <polyline points="6,9 12,15 18,9"/>
                </svg>
              </button>
              <div className="faq-answer">
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
