import './Footer.css'
// function Footer(){
//     return(
//         <footer>
//             <div>
//                 <p>
//                    Contact Us 
//                 </p>
                
//             </div>
//             <div>
//                 <p>Privacy policy</p>
//             </div>
//         </footer>
//     )
// }

// export default Footer

function Footer() {
  return (
    <footer>
      <div className="footer-top" style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap" }}>
        {/* Contact Info */}
        <div className="footer-section">
          <h4>Contact Us</h4>
          <p>123 Main Street, City, Country</p>
          <p>Email: info@hotelname.com</p>
          <p>Phone: +123 456 7890</p>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul style={{ listStyle: "none", padding: 0 }}>
            <li><a href="/about" style={{ color: "#fff" }}>About Us</a></li>
            <li><a href="/rooms" style={{ color: "#fff" }}>Rooms</a></li>
            <li><a href="/contact" style={{ color: "#fff" }}>Contact</a></li>
            <li><a href="/faq" style={{ color: "#fff" }}>FAQ</a></li>
          </ul>
        </div>

      </div>

      {/* Bottom */}
      <div className="footer-bottom" style={{ textAlign: "center", marginTop: "30px", borderTop: "1px solid #555", paddingTop: "20px" }}>
        <p>© {new Date().getFullYear()} Hotel Name. All Rights Reserved.</p>
        <p><a href="/privacy" style={{ color: "#fff" }}>Privacy Policy</a></p>
      </div>
    </footer>
  )
}

export default Footer
