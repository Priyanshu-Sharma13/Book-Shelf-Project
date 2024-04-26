import React, { useState } from 'react'
import '../ExtraComp/Faq.css'
function Faq() {
  // Define the questions and answers
  const faqData = [
    {
      question: 'How do I buy a book on Bookshelf?',
      answer:
        "To buy a book on Bookshelf, you can browse the listings, select a book you're interested in, and then contact the seller to arrange the purchase.",
    },
    {
      question: 'How do I sell a book on Bookshelf?',
      answer:
        'To sell a book on Bookshelf, you can create a listing by providing details about the book (such as title, author, price, condition, etc.) and upload images if desired. Once listed, interested buyers can contact you to purchase the book.',
    },
    {
      question: 'What types of books can I find on Bookshelf?',
      answer:
        'Bookshelf offers a wide range of books, including fiction, non-fiction, textbooks, rare books, and more. Users can find books in various genres and categories.',
    },
    {
      question: 'Is there a fee for listing books on Bookshelf?',
      answer:
        'There may be a nominal fee for listing books on Bookshelf, which helps maintain and improve the platform. However, this fee can vary based on the type of listing and any promotional offers available.',
    },
    {
      question: 'How do I contact a seller or buyer on Bookshelf?',
      answer:
        "You can contact a seller or buyer on Bookshelf by using the messaging feature available on the platform. Simply click on the 'Contact Seller' or 'Contact Buyer' button on the listing to send a message.",
    },
    {
      question: 'Can I negotiate the price of a book on Bookshelf?',
      answer:
        'Yes, you can negotiate the price of a book with the seller on Bookshelf. Use the messaging feature to discuss the price and finalize the deal.',
    },
    {
      question: 'Is it safe to buy books on Bookshelf?',
      answer:
        "Bookshelf takes safety and security seriously. While we strive to provide a safe platform, it's important for users to exercise caution when buying or selling items online. We recommend meeting in a public place for transactions and using secure payment methods.",
    },
    {
      question: 'How do I pay for a book on Bookshelf?',
      answer:
        "Payment methods may vary depending on the seller's preferences. Common payment methods include cash on delivery, bank transfer, or online payment platforms.",
    },
    {
      question: 'How do I report a problem with a transaction on Bookshelf?',
      answer:
        'If you encounter any problems with a transaction on Bookshelf, you can report it to our support team. We will investigate the issue and take appropriate action to resolve it.',
    },
    {
      question: 'Can I leave a review for a book or seller on Bookshelf?',
      answer:
        'Yes, you can leave a review for a book or seller on Bookshelf. Reviews help other users make informed decisions and improve the overall experience on the platform.',
    },
  ]

  const [isOpen, setIsOpen] = useState(Array(faqData.length).fill(false))

  const toggleAnswer = (index) => {
    const newIsOpen = [...isOpen]
    newIsOpen[index] = !newIsOpen[index]
    setIsOpen(newIsOpen)
  }

  return (
    <div className="bod_y">
      <div className="contai_ner">
        <h1 className="h_1">Bookshelf FAQ</h1>
        {faqData.map((faq, index) => (
          <div className="faq-item" key={index}>
            <div className="faq-question" onClick={() => toggleAnswer(index)}>
              
              {faq.question}
            </div>
            <div className={`faq-answer ${isOpen[index] ? 'open' : ''}`}>
              {faq.answer}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Faq